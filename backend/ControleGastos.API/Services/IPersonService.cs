using ControleGastos.API.DTOs;

public interface IPersonService
{
    Task<IEnumerable<PersonResponseDto>> GetAllAsync();
    Task<PersonResponseDto> CreateAsync(PersonCreateDto dto);
    Task<bool> DeleteAsync(int id);
}