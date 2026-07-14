using ControleGastos.Api.DTOs;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase {

    private readonly IPessoaService _service;

    public PessoasController(IPessoaService service) {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<PessoaDto>> Criar(CriarPessoaDto dto) {
        var pessoa = await _service.CriarAsync(dto);
        return CreatedAtAction(nameof(Listar), new { id = pessoa.Id }, pessoa);
    }

    [HttpGet]
    public async Task<ActionResult<List<PessoaDto>>> Listar()
    {
        var pessoas = await _service.ListarAsync();
        return Ok(pessoas);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletar(int id)
    {
        var removido = await _service.DeletarAsync(id);
        if(!removido){
            return NotFound();
        }
        return NoContent();
    }
}