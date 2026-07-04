using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Services;

public class TransactionService : ITransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TransactionResponseDto>> GetAllAsync()
    {
        return await _context.Transactions
            .Select(t => new TransactionResponseDto(
                t.Id,
                t.Description,
                t.Value,
                t.Type.ToString(),
                t.PersonId
            ))
            .ToListAsync();
    }

    public async Task<TransactionResponseDto> CreateAsync(TransactionCreateDto dto)
    {
        // 1. Verifica se a pessoa existe
        var person = await _context.People.FindAsync(dto.PersonId);
        if (person == null)
            throw new InvalidOperationException("Pessoa não encontrada.");

        // 2. Regra de negócio: menor de 18 anos só pode cadastrar despesas
        if (person.Age < 18 && dto.Type.Equals("Receita", StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("Menores de 18 anos só podem cadastrar despesas.");

        // 3. Cria a transação
        var transaction = new Transaction
        {
            Description = dto.Description,
            Value = dto.Value,
            Type = Enum.Parse<TransactionType>(dto.Type, ignoreCase: true),
            PersonId = dto.PersonId
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return new TransactionResponseDto(
            transaction.Id,
            transaction.Description,
            transaction.Value,
            transaction.Type.ToString(),
            transaction.PersonId
        );
    }
}