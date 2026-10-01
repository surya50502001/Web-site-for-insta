using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MerchPlatform.Api.Models;

public enum InstagramMediaType
{
    IMAGE,
    VIDEO,
    CAROUSEL_ALBUM,
    REEL
}

public class InstagramMedia
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string CreatorId { get; set; } = string.Empty;

    [ForeignKey(nameof(CreatorId))]
    public Creator? Creator { get; set; }

    [Required]
    public string InstagramMediaId { get; set; } = string.Empty;

    public InstagramMediaType MediaType { get; set; } = InstagramMediaType.IMAGE;

    [Required]
    public string MediaUrl { get; set; } = string.Empty;

    public string? ThumbnailUrl { get; set; }

    public string? Permalink { get; set; }

    public string? Caption { get; set; }

    public int LikeCount { get; set; }

    public int CommentsCount { get; set; }

    public DateTime MediaTimestamp { get; set; } = DateTime.UtcNow;

    public bool IsEligibleForMerch { get; set; } = true;

    public bool RightsAuthorized { get; set; } = false;

    public DateTime? RightsAuthorizedAt { get; set; }

    public string? ExtractedKeyframeUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
