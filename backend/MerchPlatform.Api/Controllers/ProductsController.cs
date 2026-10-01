using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MerchPlatform.Api.Data;
using MerchPlatform.Api.Models;

namespace MerchPlatform.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly MerchDbContext _context;

    public ProductsController(MerchDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetActiveProducts([FromQuery] string? creatorId)
    {
        var query = _context.Products
            .Include(p => p.Creator)
            .Include(p => p.Designs)
            .Where(p => p.Status == ProductStatus.ACTIVE);

        if (!string.IsNullOrEmpty(creatorId))
        {
            query = query.Where(p => p.CreatorId == creatorId);
        }

        var products = await query.OrderByDescending(p => p.CreatedAt).ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(string id)
    {
        var product = await _context.Products
            .Include(p => p.Creator)
            .Include(p => p.Designs)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto dto)
    {
        var creator = await _context.Creators.FindAsync(dto.CreatorId);
        if (creator == null)
        {
            return BadRequest(new { message = "Invalid Creator ID" });
        }

        var product = new MerchProduct
        {
            CreatorId = dto.CreatorId,
            Title = dto.Title,
            Description = dto.Description,
            BasePrice = dto.BasePrice,
            DefaultArtworkUrl = dto.DefaultArtworkUrl,
            FabricSpec = dto.FabricSpec ?? "240 GSM Combed Cotton Heavyweight Boxy Cut",
            AvailableColorsJson = dto.AvailableColorsJson ?? "[\"#121214\",\"#F4F4F0\",\"#2B3530\",\"#1E3A8A\"]",
            AvailableSizesJson = dto.AvailableSizesJson ?? "[\"S\",\"M\",\"L\",\"XL\",\"2XL\"]",
            Status = ProductStatus.ACTIVE
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        if (dto.Designs != null && dto.Designs.Any())
        {
            int seq = 1;
            foreach (var d in dto.Designs)
            {
                var design = new DesignArtwork
                {
                    ProductId = product.Id,
                    InstagramMediaId = d.InstagramMediaId,
                    Title = d.Title,
                    Subtitle = d.Subtitle,
                    GraphicUrl = d.GraphicUrl,
                    Filter = d.Filter,
                    CreatorApproved = true,
                    CreatorApprovedAt = DateTime.UtcNow,
                    OrderSequence = seq++
                };
                _context.DesignArtworks.Add(design);
            }
            await _context.SaveChangesAsync();
        }

        return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
    }
}

public class CreateProductDto
{
    public string CreatorId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal BasePrice { get; set; } = 799.00m;
    public string DefaultArtworkUrl { get; set; } = string.Empty;
    public string? FabricSpec { get; set; }
    public string? AvailableColorsJson { get; set; }
    public string? AvailableSizesJson { get; set; }
    public List<CreateDesignDto>? Designs { get; set; }
}

public class CreateDesignDto
{
    public string? InstagramMediaId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Subtitle { get; set; }
    public string GraphicUrl { get; set; } = string.Empty;
    public ArtworkFilter Filter { get; set; } = ArtworkFilter.ORIGINAL;
}
