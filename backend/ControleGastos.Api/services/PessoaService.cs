using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

public class PessoaService : IPessoaService {

    private readonly AppDbContext _context;

    public PessoaService(AppDbContext context) {
        _context = context;
    }

    public async Task<PessoaDto> CriarAsync(CriarPessoaDto dto) {
        var pessoa = new Pessoa { Nome = dto.Nome, Idade = dto.Idade };

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return new PessoaDto(pessoa.Id, pessoa.Nome, pessoa.Idade);
    }

    public async Task<List<PessoaDto>> ListarAsync() {
        return await _context.Pessoas
            .Select(p => new PessoaDto(p.Id, p.Nome, p.Idade))
            .ToListAsync();
    }

    public async Task<bool> DeletarAsync(int id) {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa is null) {
            return false;
        }

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return true;
    }
}