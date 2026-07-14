using ControleGastos.Api.DTOs;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase {

    private readonly ITotalService _service;

    public TotaisController(ITotalService service) {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<TotaisDto>> Obter() {
        var totais = await _service.ObterTotaisAsync();
        return Ok(totais);
    }
}