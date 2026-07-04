using Microsoft.EntityFrameworkCore;
using ControleGastos.API.Models;

namespace ControleGastos.API.Data;

/// <summary>
/// Contexto do banco de dados. Configura o mapeamento das entidades.
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Person> People => Set<Person>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configura a exclusão em cascata: ao remover uma pessoa,
        // todas as suas transações também são removidas.
        modelBuilder.Entity<Person>()
            .HasMany(p => p.Transactions)
            .WithOne(t => t.Person)
            .HasForeignKey(t => t.PersonId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}