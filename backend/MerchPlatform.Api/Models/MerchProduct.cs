using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MerchPlatform.Api.Models;

public enum ProductStatus
{
    DRAFT,
    IN_REVIEW,
    APPROVED,
    ACTIVE,
    ARCHIVED
}

public class MerchProduct
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string CreatorId { get; set; } = string.Empty;

    [ForeignKey(nameof(CreatorId))]
    public Creator? Creator { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public decimal BasePrice { get; set; } = 799.00m; // Default ₹799

    public string Currency { get; set; } = "INR";

    public string FabricSpec { get; set; } = "240 GSM French Terry 100% Combed Cotton, Boxy Streetwear Cut, Pre-shrunk";

    // JSON encoded colors e.g. ["#121214", "#F4F4F0", "#3E493E", "#2563EB", "#D4FF00"]
    public string AvailableColorsJson { get; set; } = "[\"#121214\",\"#F4F4F0\",\"#353B3C\",\"#2563EB\",\"#FF4E00\"]";

    // JSON encoded sizes e.g. ["S", "M", "L", "XL", "2XL"]
    public string AvailableSizesJson { get; set; } = "[\"S\",\"M\",\"L\",\"XL\",\"2XL\"]";

    public string DefaultArtworkUrl { get; set; } = string.Empty;

    public string? BackArtworkUrl { get; set; }

    public ProductStatus Status { get; set; } = ProductStatus.ACTIVE;

    public bool IsFeatured { get; set; } = false;

    public int SalesCount { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<DesignArtwork> Designs { get; set; } = new();
}
