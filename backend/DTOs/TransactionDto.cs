namespace ControleGastos.API.DTOs;

// DTO para receber dados na criação de uma transação
public record TransactionCreateDto(
    string Description,
    decimal Value,
    string Type,        // "Despesa" ou "Receita"
    int PersonId
);

// DTO para retornar dados de uma transação
public record TransactionResponseDto(
    int Id,
    string Description,
    decimal Value,
    string Type,
    int PersonId
);