using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Exceptions;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

public class TransacaoService : ITransacaoService {

    private readonly AppDbContext _context;

    public TransacaoService(AppDbContext context) {
        _context = context;
    }

    public async Task<TransacaoDto> CriarAsync(CriarTransacaoDto dto) {

        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);

        //Regra do desafio: Só é possível criar uma Transação para um usuário se ele existir.
        //Se existir, é criada, se não retorna um erro 400.
        if (pessoa is null)
        {
            throw new RegraDeNegocioException($"Pessoa com Id {dto.PessoaId} não existe.");
        }

        // Regra do desafio: Menores de idade podem apenas registrar transações do tipo despesa
        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita) {
            throw new RegraDeNegocioException("Menores de idade só podem registrar transações do tipo Despesa.");
        }

        var transacao = new Transacao {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return new TransacaoDto(transacao.Id, transacao.Descricao, transacao.Valor, transacao.Tipo, transacao.PessoaId);
    }

    public async Task<List<TransacaoDto>> ListarAsync() {
        return await _context.Transacoes
            .Select(t => new TransacaoDto(t.Id, t.Descricao, t.Valor, t.Tipo, t.PessoaId))
            .ToListAsync();
    }
}