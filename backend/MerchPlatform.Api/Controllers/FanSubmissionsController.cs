using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MerchPlatform.Api.Data;
using MerchPlatform.Api.Models;

namespace MerchPlatform.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FanSubmissionsController : ControllerBase
{
    private readonly MerchDbContext _context;

    public FanSubmissionsController(MerchDbContext context)
    {
        _context = context;
    }

    [HttpGet("creator/{creatorId}")]
    public async Task<IActionResult> GetSubmissionsForCreator(string creatorId)
    {
        var submissions = await _context.FanSubmissions
            .Where(f => f.CreatorId == creatorId)
            .OrderByDescending(f => f.SubmittedAt)
            .ToListAsync();

        return Ok(submissions);
    }

    [HttpPost]
    public async Task<IActionResult> SubmitFanDesign([FromBody] CreateFanSubmissionDto dto)
    {
        var creator = await _context.Creators.FindAsync(dto.CreatorId);
        if (creator == null)
        {
            return NotFound(new { message = "Creator not found" });
        }

        var submission = new FanSubmission
        {
            CreatorId = dto.CreatorId,
            SubmitterName = dto.SubmitterName,
            SubmitterEmail = dto.SubmitterEmail,
            SubmitterInstagram = dto.SubmitterInstagram,
            Title = dto.Title,
            Description = dto.Description,
            DesignFileUrl = dto.DesignFileUrl,
            SourceInstagramMediaId = dto.SourceInstagramMediaId,
            ProposedRoyaltyShare = 15.0,
            Status = FanSubmissionStatus.PENDING,
            TermsAccepted = true
        };

        _context.FanSubmissions.Add(submission);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, submissionId = submission.Id, message = "Design submitted for creator review" });
    }

    [HttpPost("{id}/approve")]
    public async Task<IActionResult> ApproveSubmission(string id)
    {
        var sub = await _context.FanSubmissions.Include(s => s.Creator).FirstOrDefaultAsync(s => s.Id == id);
        if (sub == null) return NotFound();

        sub.Status = FanSubmissionStatus.APPROVED;
        sub.ReviewedAt = DateTime.UtcNow;

        // Automatically convert approved fan design to a merch product under this creator!
        var product = new MerchProduct
        {
            CreatorId = sub.CreatorId,
            Title = $"{sub.Title} (Fan Edition)",
            Description = $"Officially licensed fan-created design by {sub.SubmitterName} ({sub.SubmitterInstagram}). Authorized by @{sub.Creator?.Username}. Co-creator royalty shared on every tee.",
            BasePrice = 849.00m,
            Currency = "INR",
            DefaultArtworkUrl = sub.DesignFileUrl,
            Status = ProductStatus.ACTIVE
        };
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        var artwork = new DesignArtwork
        {
            ProductId = product.Id,
            Title = sub.Title,
            Subtitle = $"Fan Art by {sub.SubmitterName}",
            GraphicUrl = sub.DesignFileUrl,
            CreatorApproved = true,
            CreatorApprovedAt = DateTime.UtcNow,
            Filter = ArtworkFilter.ORIGINAL
        };
        _context.DesignArtworks.Add(artwork);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            message = "Fan submission approved and published to storefront!",
            productId = product.Id
        });
    }

    [HttpPost("{id}/reject")]
    public async Task<IActionResult> RejectSubmission(string id, [FromBody] RejectDto dto)
    {
        var sub = await _context.FanSubmissions.FindAsync(id);
        if (sub == null) return NotFound();

        sub.Status = FanSubmissionStatus.REJECTED;
        sub.ReviewNote = dto.Reason;
        sub.ReviewedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Submission rejected" });
    }
}

public class CreateFanSubmissionDto
{
    public string CreatorId { get; set; } = string.Empty;
    public string SubmitterName { get; set; } = string.Empty;
    public string SubmitterEmail { get; set; } = string.Empty;
    public string? SubmitterInstagram { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string DesignFileUrl { get; set; } = string.Empty;
    public string? SourceInstagramMediaId { get; set; }
}

public class RejectDto
{
    public string? Reason { get; set; }
}
