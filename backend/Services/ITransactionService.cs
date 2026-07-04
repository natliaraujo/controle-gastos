using ControleGastos.API.DTOs;

public interface ITransactionService
{
    Task<IEnumerable<TransactionResponseDto>> GetAllAsync();
    Task<TransactionResponseDto> CreateAsync(TransactionCreateDto dto);
}