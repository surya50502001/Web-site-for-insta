using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MerchPlatform.Api.Data;
using MerchPlatform.Api.Models;

namespace MerchPlatform.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CreatorsController : ControllerBase
{
    private readonly MerchDbContext _context;

    public CreatorsController(MerchDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCreators()
    {
        var creators = await _context.Creators
            .Include(c => c.Products)
            .Select(c => new
            {
                c.Id,
                c.Username,
                c.DisplayName,
                c.Bio,
                c.ProfilePicUrl,
                c.FollowerCount,
                c.IsVerified,
                c.RevenueSplitPercentage,
                ProductCount = c.Products.Count(p => p.Status == ProductStatus.ACTIVE),
                FeaturedProduct = c.Products.FirstOrDefault(p => p.IsFeatured)
            })
            .ToListAsync();

        return Ok(creators);
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetCreatorByUsername(string username)
    {
        var creator = await _context.Creators
            .Include(c => c.Products.Where(p => p.Status == ProductStatus.ACTIVE))
                .ThenInclude(p => p.Designs)
            .FirstOrDefaultAsync(c => c.Username.ToLower() == username.ToLower());

        if (creator == null)
        {
            return NotFound(new { message = $"Creator @{username} not found" });
        }

        return Ok(creator);
    }

    [HttpGet("{id}/dashboard")]
    public async Task<IActionResult> GetCreatorDashboard(string id)
    {
        var creator = await _context.Creators
            .Include(c => c.Products)
                .ThenInclude(p => p.Designs)
            .Include(c => c.FanSubmissions)
            .Include(c => c.MediaItems)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (creator == null)
        {
            return NotFound(new { message = "Creator not found" });
        }

        var orders = await _context.Orders
            .Include(o => o.RevenueSplit)
            .Where(o => o.CreatorId == id)
            .ToListAsync();

        var totalRevenue = orders.Sum(o => o.RevenueSplit?.CreatorNetEarnings ?? 0);
        var totalUnitsSold = orders.Sum(o => o.Quantity);

        return Ok(new
        {
            Creator = creator,
            Metrics = new
            {
                TotalCreatorEarningsInr = totalRevenue,
                TotalUnitsSold = totalUnitsSold,
                ActiveDropsCount = creator.Products.Count(p => p.Status == ProductStatus.ACTIVE),
                ImportedMediaCount = creator.MediaItems.Count,
                PendingFanSubmissions = creator.FanSubmissions.Count(f => f.Status == FanSubmissionStatus.PENDING)
            },
            RecentOrders = orders.OrderByDescending(o => o.CreatedAt).Take(10),
            FanSubmissions = creator.FanSubmissions.OrderByDescending(f => f.SubmittedAt).Take(10)
        });
    }

    [HttpPost("sign-rights")]
    public async Task<IActionResult> SignRightsGrant([FromBody] SignRightsRequest request)
    {
        var creator = await _context.Creators.FindAsync(request.CreatorId);
        if (creator == null) return NotFound();

        creator.RightsGrantSigned = true;
        creator.RightsGrantSignedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(new { success = true, signedAt = creator.RightsGrantSignedAt });
    }
}

public record SignRightsRequest(string CreatorId, string Signature);
