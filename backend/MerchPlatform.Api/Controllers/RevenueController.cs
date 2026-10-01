using Microsoft.AspNetCore.Mvc;
using MerchPlatform.Api.Services;

namespace MerchPlatform.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RevenueController : ControllerBase
{
    private readonly IRevenueCalculatorService _revenueCalculator;

    public RevenueController(IRevenueCalculatorService revenueCalculator)
    {
        _revenueCalculator = revenueCalculator;
    }

    [HttpGet("preview")]
    public IActionResult PreviewRevenueBreakdown([FromQuery] decimal price = 799.00m, [FromQuery] double creatorSplit = 70.0, [FromQuery] bool isFanSubmission = false)
    {
        var result = _revenueCalculator.CalculateBreakdown(price, creatorSplit, isFanSubmission);
        return Ok(result);
    }
}
