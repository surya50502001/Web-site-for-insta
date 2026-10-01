using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MerchPlatform.Api.Models;

public enum FanSubmissionStatus
{
    PENDING,
    APPROVED,
    REJECTED
}

public class FanSubmission
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string CreatorId { get; set; } = string.Empty;

    [ForeignKey(nameof(CreatorId))]
    public Creator? Creator { get; set; }

    [Required]
    [MaxLength(100)]
    public string SubmitterName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string SubmitterEmail { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? SubmitterInstagram { get; set; }

    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required]
    public string DesignFileUrl { get; set; } = string.Empty;

    public string? SourceInstagramMediaId { get; set; }

    public double ProposedRoyaltyShare { get; set; } = 15.0; // 15% co-creator share

    public FanSubmissionStatus Status { get; set; } = FanSubmissionStatus.PENDING;

    public string? ReviewNote { get; set; }

    public DateTime? ReviewedAt { get; set; }

    public bool TermsAccepted { get; set; } = true;

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}
