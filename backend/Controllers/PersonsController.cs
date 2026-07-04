using ControleGastos.API.DTOs;
using ControleGastos.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    private readonly IPersonService _service;

    public PersonsController(IPersonService service)
    {
        _service = service;
    }

    /// <summary>
    /// Retorna todas as pessoas cadastradas.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonResponseDto>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    /// <summary>
    /// Cria uma nova pessoa.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<PersonResponseDto>> Create([FromBody] PersonCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }

    /// <summary>
    /// Remove uma pessoa e todas as suas transações.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted)
            return NotFound("Pessoa não encontrada.");

        return NoContent();
    }
}