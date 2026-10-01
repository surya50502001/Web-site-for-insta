using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MerchPlatform.Api.Data;
using MerchPlatform.Api.Models;
using MerchPlatform.Api.Services;

namespace MerchPlatform.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly MerchDbContext _context;
    private readonly IRevenueCalculatorService _revenueCalculator;
    private readonly IPrintOnDemandService _podService;

    public OrdersController(MerchDbContext context, IRevenueCalculatorService revenueCalculator, IPrintOnDemandService podService)
    {
        _context = context;
        _revenueCalculator = revenueCalculator;
        _podService = podService;
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout([FromBody] CheckoutRequestDto dto)
    {
        var product = await _context.Products.Include(p => p.Creator).FirstOrDefaultAsync(p => p.Id == dto.ProductId);
        if (product == null)
        {
            return BadRequest(new { message = "Product not found" });
        }

        var totalAmount = product.BasePrice * dto.Quantity;
        var breakdown = _revenueCalculator.CalculateBreakdown(totalAmount, product.Creator?.RevenueSplitPercentage ?? 70.0);

        var order = new Order
        {
            CreatorId = product.CreatorId,
            ProductId = product.Id,
            DesignArtworkId = dto.DesignArtworkId,
            CustomerName = dto.CustomerName,
            CustomerEmail = dto.CustomerEmail,
            CustomerPhone = dto.CustomerPhone ?? "",
            ShippingAddress = dto.ShippingAddress,
            SelectedColor = dto.SelectedColor,
            SelectedSize = dto.SelectedSize,
            Quantity = dto.Quantity,
            UnitPrice = product.BasePrice,
            TotalAmount = totalAmount,
            Currency = product.Currency,
            Status = OrderStatus.PAID
        };

        var revenueSplit = new RevenueSplit
        {
            OrderId = order.Id,
            RetailPrice = totalAmount,
            ProductionCost = breakdown.BaseProductionCost,
            PaymentFee = breakdown.PaymentGatewayFee,
            PlatformFee = breakdown.PlatformFee,
            CreatorNetEarnings = breakdown.CreatorProfit,
            FanCoCreatorShare = breakdown.FanCoCreatorShare
        };

        order.RevenueSplit = revenueSplit;
        _context.Orders.Add(order);

        product.SalesCount += dto.Quantity;

        await _context.SaveChangesAsync();

        // Dispatch POD print job
        var podResult = await _podService.SubmitPrintJobAsync(new PodOrderRequest(
            OrderId: order.Id,
            ItemSku: "TEE_HEAVYWEIGHT_BOX_240GSM",
            Color: dto.SelectedColor,
            Size: dto.SelectedSize,
            Quantity: dto.Quantity,
            PrintFileUrl: dto.ArtworkGraphicUrl ?? product.DefaultArtworkUrl,
            ShippingRecipient: dto.CustomerName,
            ShippingAddress: dto.ShippingAddress
        ));

        order.PodFulfillmentOrderId = podResult.PodJobId;
        order.TrackingNumber = "BD-" + Random.Shared.Next(10000000, 99999999);
        order.TrackingUrl = $"https://tracking.weargram.dev/{order.OrderNumber}";
        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            orderNumber = order.OrderNumber,
            totalAmount = order.TotalAmount,
            currency = order.Currency,
            podJobId = podResult.PodJobId,
            trackingNumber = order.TrackingNumber,
            trackingUrl = order.TrackingUrl,
            revenueBreakdown = breakdown
        });
    }

    [HttpGet("{orderNumber}")]
    public async Task<IActionResult> GetOrderByNumber(string orderNumber)
    {
        var order = await _context.Orders
            .Include(o => o.Product)
            .Include(o => o.Creator)
            .Include(o => o.RevenueSplit)
            .FirstOrDefaultAsync(o => o.OrderNumber == orderNumber);

        if (order == null) return NotFound(new { message = "Order not found" });

        return Ok(order);
    }
}

public class CheckoutRequestDto
{
    public string ProductId { get; set; } = string.Empty;
    public string? DesignArtworkId { get; set; }
    public string? ArtworkGraphicUrl { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string? CustomerPhone { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public string SelectedColor { get; set; } = "#121214";
    public string SelectedSize { get; set; } = "L";
    public int Quantity { get; set; } = 1;
}
