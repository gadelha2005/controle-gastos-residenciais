using ControleGastos.Api.DTOs;

namespace ControleGastos.Api.Services;

public interface ITotalService {
    Task<TotaisDto> ObterTotaisAsync();
}