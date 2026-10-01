using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MerchPlatform.Api.Models;

public enum OrderStatus
{
    PENDING_PAYMENT,
    PAID,
    SENT_TO_PRINT,
    PRINTED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}

public class Order
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [MaxLength(50)]
    public string OrderNumber { get; set; } = "WG-" + DateTime.UtcNow.ToString("yyyyMMdd") + "-" + Random.Shared.Next(1000, 9999);

    [Required]
    public string CreatorId { get; set; } = string.Empty;

    [ForeignKey(nameof(CreatorId))]
    public Creator? Creator { get; set; }

    [Required]
    public string ProductId { get; set; } = string.Empty;

    [ForeignKey(nameof(ProductId))]
    public MerchProduct? Product { get; set; }

    public string? DesignArtworkId { get; set; }

    [ForeignKey(nameof(DesignArtworkId))]
    public DesignArtwork? DesignArtwork { get; set; }

    [Required]
    [MaxLength(150)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string CustomerEmail { get; set; } = string.Empty;

    public string CustomerPhone { get; set; } = string.Empty;

    [Required]
    public string ShippingAddress { get; set; } = string.Empty;

    public string SelectedColor { get; set; } = "#121214";

    public string SelectedSize { get; set; } = "L";

    public int Quantity { get; set; } = 1;

    public decimal UnitPrice { get; set; } = 799.00m;

    public decimal TotalAmount { get; set; } = 799.00m;

    public string Currency { get; set; } = "INR";

    public OrderStatus Status { get; set; } = OrderStatus.PAID;

    public string? PodFulfillmentOrderId { get; set; }

    public string? TrackingNumber { get; set; }

    public string? TrackingUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public RevenueSplit? RevenueSplit { get; set; }
}

public class RevenueSplit
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string OrderId { get; set; } = string.Empty;

    [ForeignKey(nameof(OrderId))]
    public Order? Order { get; set; }

    public decimal RetailPrice { get; set; }

    public decimal ProductionCost { get; set; } // e.g. ₹350 standard 240 GSM + DTG

    public decimal PaymentFee { get; set; } // e.g. 2%

    public decimal PlatformFee { get; set; } // e.g. 10%

    public decimal CreatorNetEarnings { get; set; } // Remainder of net profit

    public decimal FanCoCreatorShare { get; set; } = 0.0m;

    public bool PayoutDispatched { get; set; } = false;

    public DateTime? PayoutDispatchedAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
