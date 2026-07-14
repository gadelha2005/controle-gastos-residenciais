namespace ControleGastos.Api.DTOs;

public record PessoaTotalDto(int Id, string Nome, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo);

public record ResumoGeralDto(decimal TotalReceitas, decimal TotalDespesas, decimal SaldoGeral);

public record TotaisDto(List<PessoaTotalDto> Pessoas, ResumoGeralDto ResumoGeral);