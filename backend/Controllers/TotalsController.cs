using ControleGastos.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotalsController : ControllerBase
{
    private readonly ITotalsService _service;

    public TotalsController(ITotalsService service)
    {
        _service = service;
    }

    /// <summary>
    /// Retorna o resumo financeiro por pessoa e o total geral.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetTotals()
    {
        var totals = await _service.GetTotalsAsync();
        return Ok(totals);
    }
}