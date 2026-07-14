using ControleGastos.Api.Models;

namespace ControleGastos.Api.DTOs;

public record CriarTransacaoDto(string Descricao, decimal Valor, TipoTransacao Tipo, int PessoaId);

public record TransacaoDto(int Id, string Descricao, decimal Valor, TipoTransacao Tipo, int PessoaId);