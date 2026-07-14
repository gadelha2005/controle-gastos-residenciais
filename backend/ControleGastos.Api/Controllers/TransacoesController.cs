using ControleGastos.Api.DTOs;
using ControleGastos.Api.Exceptions;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase {

    private readonly ITransacaoService _service;

    public TransacoesController(ITransacaoService service) {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<TransacaoDto>> Criar(CriarTransacaoDto dto) {

        try {
            var transacao = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(Listar), new { id = transacao.Id }, transacao);
        }
        catch (RegraDeNegocioException ex) {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<TransacaoDto>>> Listar() {
        var transacoes = await _service.ListarAsync();
        return Ok(transacoes);
    }
}