using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Services;

public class TotalsService : ITotalsService
{
    private readonly AppDbContext _context;

    public TotalsService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<GeneralTotalsDto> GetTotalsAsync()
    {
        // Carrega todas as pessoas com suas transações
        var people = await _context.People
            .Include(p => p.Transactions)
            .ToListAsync();

        // Calcula os totais por pessoa
        var personTotals = people.Select(person =>
        {
            var receitas = person.Transactions
                .Where(t => t.Type == TransactionType.Receita)
                .Sum(t => t.Value);

            var despesas = person.Transactions
                .Where(t => t.Type == TransactionType.Despesa)
                .Sum(t => t.Value);

            return new PersonTotalsDto(
                person.Id,
                person.Name,
                receitas,
                despesas,
                receitas - despesas
            );
        }).ToList();

        // Totais gerais
        var totalReceitasGeral = personTotals.Sum(p => p.TotalReceitas);
        var totalDespesasGeral = personTotals.Sum(p => p.TotalDespesas);
        var saldoLiquidoGeral = totalReceitasGeral - totalDespesasGeral;

        return new GeneralTotalsDto(
            personTotals,
            totalReceitasGeral,
            totalDespesasGeral,
            saldoLiquidoGeral
        );
    }
}