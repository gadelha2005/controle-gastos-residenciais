using ControleGastos.Api.DTOs;

namespace ControleGastos.Api.Services;

public interface ITransacaoService {
    Task<TransacaoDto> CriarAsync(CriarTransacaoDto dto);
    Task<List<TransacaoDto>> ListarAsync();
}