using ControleGastos.API.DTOs;
using ControleGastos.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionService _service;

    public TransactionsController(ITransactionService service)
    {
        _service = service;
    }

    /// <summary>
    /// Lista todas as transações cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransactionResponseDto>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    /// <summary>
    /// Cria uma nova transação, validando as regras de negócio.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<TransactionResponseDto>> Create([FromBody] TransactionCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
        }
        catch (InvalidOperationException ex)
        {
            // Captura erros de validação do serviço
            return BadRequest(ex.Message);
        }
    }
}