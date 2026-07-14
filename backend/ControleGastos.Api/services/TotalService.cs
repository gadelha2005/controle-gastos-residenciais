using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

public class TotalService : ITotalService {

    private readonly AppDbContext _context;

    public TotalService(AppDbContext context) {
        _context = context;
    }

    public async Task<TotaisDto> ObterTotaisAsync()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        var pessoasComTotais = pessoas.Select(p => {
            var totalReceitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);

            var totalDespesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new PessoaTotalDto(p.Id, p.Nome, totalReceitas, totalDespesas, totalReceitas - totalDespesas);
        }).ToList();

        var resumoGeral = new ResumoGeralDto(
            TotalReceitas: pessoasComTotais.Sum(p => p.TotalReceitas),
            TotalDespesas: pessoasComTotais.Sum(p => p.TotalDespesas),
            SaldoGeral: pessoasComTotais.Sum(p => p.Saldo)
        );

        return new TotaisDto(pessoasComTotais, resumoGeral);
    }
}