using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MerchPlatform.Api.Models;

public enum ArtworkFilter
{
    ORIGINAL,
    HALFTONE_SCREENPRINT,
    VINTAGE_STREETWEAR,
    STICKER_CUTOUT,
    ACID_WASH,
    MONOCHROME_PUNK
}

public class DesignArtwork
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string ProductId { get; set; } = string.Empty;

    [ForeignKey(nameof(ProductId))]
    public MerchProduct? Product { get; set; }

    public string? InstagramMediaId { get; set; }

    [ForeignKey(nameof(InstagramMediaId))]
    public InstagramMedia? InstagramMedia { get; set; }

    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    public string? Subtitle { get; set; }

    [Required]
    public string GraphicUrl { get; set; } = string.Empty;

    public string? HighResPrintFileUrl { get; set; }

    public ArtworkFilter Filter { get; set; } = ArtworkFilter.ORIGINAL;

    public double PrintPositionX { get; set; } = 0.5; // normalized 0..1 center
    public double PrintPositionY { get; set; } = 0.42; // normalized chest placement
    public double PrintScale { get; set; } = 0.65; // scale relative to chest area

    public bool CreatorApproved { get; set; } = true;

    public DateTime? CreatorApprovedAt { get; set; }

    public int OrderSequence { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
