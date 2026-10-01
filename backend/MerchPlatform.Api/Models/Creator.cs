using System.ComponentModel.DataAnnotations;

namespace MerchPlatform.Api.Models;

public class Creator
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string DisplayName { get; set; } = string.Empty;

    public string? Bio { get; set; }

    public string? ProfilePicUrl { get; set; }

    public string? InstagramUserId { get; set; }

    public int FollowerCount { get; set; }

    public bool IsVerified { get; set; }

    public string? AuthToken { get; set; }

    public DateTime? TokenExpiresAt { get; set; }

    public bool RightsGrantSigned { get; set; }

    public DateTime? RightsGrantSignedAt { get; set; }

    public double RevenueSplitPercentage { get; set; } = 70.0; // Creator gets 70% of profit

    public string? PayoutUpiId { get; set; }

    public string? PayoutStripeAccountId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public List<InstagramMedia> MediaItems { get; set; } = new();
    public List<MerchProduct> Products { get; set; } = new();
    public List<FanSubmission> FanSubmissions { get; set; } = new();
}
