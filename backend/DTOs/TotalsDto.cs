namespace ControleGastos.API.DTOs;

// Totais de uma pessoa específica
public record PersonTotalsDto(
    int PersonId,
    string Name,
    decimal TotalReceitas,
    decimal TotalDespesas,
    decimal Saldo
);

// Totais gerais do sistema
public record GeneralTotalsDto(
    IEnumerable<PersonTotalsDto> Pessoas,
    decimal TotalGeralReceitas,
    decimal TotalGeralDespesas,
    decimal SaldoLiquidoGeral
);