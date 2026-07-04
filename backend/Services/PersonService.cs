using ControleGastos.API.Data;
using ControleGastos.API.DTOs;
using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Services;

public class PersonService : IPersonService
{
    private readonly AppDbContext _context;

    public PersonService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PersonResponseDto>> GetAllAsync()
    {
        return await _context.People
            .Select(p => new PersonResponseDto(p.Id, p.Name, p.Age))
            .ToListAsync();
    }

    public async Task<PersonResponseDto> CreateAsync(PersonCreateDto dto)
    {
        var person = new Person
        {
            Name = dto.Name,
            Age = dto.Age
        };

        _context.People.Add(person);
        await _context.SaveChangesAsync();

        return new PersonResponseDto(person.Id, person.Name, person.Age);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var person = await _context.People.FindAsync(id);
        if (person == null) return false;

        _context.People.Remove(person); // Cascade remove as transações
        await _context.SaveChangesAsync();
        return true;
    }
}