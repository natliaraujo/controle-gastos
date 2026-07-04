namespace ControleGastos.API.DTOs;

// DTO para receber dados na criação de uma pessoa
public record PersonCreateDto(string Name, int Age);

// DTO para retornar dados de uma pessoa ao frontend
public record PersonResponseDto(int Id, string Name, int Age);