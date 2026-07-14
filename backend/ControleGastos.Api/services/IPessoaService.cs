using ControleGastos.Api.DTOs;

namespace ControleGastos.Api.Services;

public interface IPessoaService
{
    Task<PessoaDto> CriarAsync(CriarPessoaDto dto);
    Task<List<PessoaDto>> ListarAsync();
    Task<bool> DeletarAsync(int id);
}