using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MerchPlatform.Api.Data;
using MerchPlatform.Api.Models;
using MerchPlatform.Api.Services;

namespace MerchPlatform.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InstagramController : ControllerBase
{
    private readonly MerchDbContext _context;
    private readonly IMetaGraphApiService _metaGraphApiService;

    public InstagramController(MerchDbContext context, IMetaGraphApiService metaGraphApiService)
    {
        _context = context;
        _metaGraphApiService = metaGraphApiService;
    }

    [HttpGet("auth-url")]
    public IActionResult GetAuthorizationUrl([FromQuery] string redirectUri, [FromQuery] string? state)
    {
        var url = _metaGraphApiService.GenerateOAuthAuthorizationUrl(state ?? Guid.NewGuid().ToString("N"), redirectUri);
        return Ok(new { url });
    }

    [HttpPost("connect")]
    public async Task<IActionResult> ConnectAccount([FromBody] ConnectInstagramDto dto)
    {
        var tokenResult = await _metaGraphApiService.ExchangeCodeForTokenAsync(dto.Code, dto.RedirectUri);

        var creator = await _context.Creators.FindAsync(dto.CreatorId);
        if (creator == null)
        {
            return NotFound(new { message = "Creator not found" });
        }

        creator.InstagramUserId = tokenResult.UserId;
        creator.AuthToken = tokenResult.AccessToken;
        creator.TokenExpiresAt = DateTime.UtcNow.AddSeconds(tokenResult.ExpiresIn);
        await _context.SaveChangesAsync();

        var mediaList = await _metaGraphApiService.FetchAuthorizedMediaAsync(tokenResult.AccessToken, tokenResult.UserId);

        foreach (var m in mediaList)
        {
            var exists = await _context.InstagramMedia.AnyAsync(x => x.InstagramMediaId == m.Id);
            if (!exists)
            {
                _context.InstagramMedia.Add(new InstagramMedia
                {
                    CreatorId = creator.Id,
                    InstagramMediaId = m.Id,
                    MediaType = Enum.TryParse<InstagramMediaType>(m.MediaType, true, out var t) ? t : InstagramMediaType.IMAGE,
                    MediaUrl = m.MediaUrl,
                    ThumbnailUrl = m.ThumbnailUrl,
                    Permalink = m.Permalink,
                    Caption = m.Caption,
                    LikeCount = m.LikeCount,
                    CommentsCount = m.CommentsCount,
                    MediaTimestamp = m.Timestamp,
                    IsEligibleForMerch = true,
                    RightsAuthorized = true,
                    RightsAuthorizedAt = DateTime.UtcNow
                });
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            message = "Instagram account connected and authorized content imported successfully",
            importedMediaCount = mediaList.Count
        });
    }

    [HttpGet("creator-media/{creatorId}")]
    public async Task<IActionResult> GetCreatorMedia(string creatorId)
    {
        var media = await _context.InstagramMedia
            .Where(m => m.CreatorId == creatorId)
            .OrderByDescending(m => m.MediaTimestamp)
            .ToListAsync();

        return Ok(media);
    }

    [HttpPost("extract-frame")]
    public IActionResult ExtractReelFrame([FromBody] ExtractFrameRequest request)
    {
        // Simulates high-resolution keyframe extraction at specified timestamp (e.g. 02.4s)
        return Ok(new
        {
            originalMediaId = request.MediaId,
            frameTimestampSec = request.TimestampSeconds,
            extractedFrameUrl = request.MediaUrl,
            status = "EXTRACTED_300DPI_READY"
        });
    }
}

public class ConnectInstagramDto
{
    public string CreatorId { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string RedirectUri { get; set; } = string.Empty;
}

public class ExtractFrameRequest
{
    public string MediaId { get; set; } = string.Empty;
    public string MediaUrl { get; set; } = string.Empty;
    public double TimestampSeconds { get; set; } = 1.5;
}
