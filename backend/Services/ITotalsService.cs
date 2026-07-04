using ControleGastos.API.DTOs;

public interface ITotalsService
{
    Task<GeneralTotalsDto> GetTotalsAsync();
}