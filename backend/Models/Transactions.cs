using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.API.Models;

public enum TransactionType
{
    Despesa,
    Receita
}

/// <summary>
/// Representa uma transação financeira de uma pessoa.
/// </summary>
public class Transaction
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Descrição é obrigatória.")]
    [StringLength(200)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Valor deve ser positivo.")]
    public decimal Value { get; set; }

    [Required]
    public TransactionType Type { get; set; }

    // Chave estrangeira
    [Required]
    public int PersonId { get; set; }

    [ForeignKey(nameof(PersonId))]
    public Person Person { get; set; } = null!;
}