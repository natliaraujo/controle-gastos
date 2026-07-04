using System.ComponentModel.DataAnnotations;

namespace ControleGastos.API.Models;

/// <summary>
/// Representa uma pessoa cadastrada no sistema.
/// </summary>
public class Person
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Nome é obrigatório.")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Idade é obrigatória.")]
    [Range(0, 150, ErrorMessage = "Idade deve estar entre 0 e 150.")]
    public int Age { get; set; }

    // Uma pessoa pode ter várias transações
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}