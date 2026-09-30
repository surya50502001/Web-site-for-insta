using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Postfolio.Api.Data;
using Postfolio.Api.Models;
using Postfolio.Api.Services;

namespace Postfolio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IInstagramService _instagramService;
        private readonly PostfolioDbContext _db;

        public AuthController(IInstagramService instagramService, PostfolioDbContext db)
        {
            _instagramService = instagramService;
            _db = db;
        }

        [HttpGet("instagram")]
        public IActionResult GetInstagramAuthUrl([FromQuery] string clientId, [FromQuery] string redirectUri)
        {
            var url = _instagramService.GetAuthorizationUrl(
                string.IsNullOrEmpty(clientId) ? "meta_postfolio_client" : clientId,
                string.IsNullOrEmpty(redirectUri) ? "https://postfolio.site/api/auth/callback" : redirectUri
            );
            return Ok(new { authUrl = url });
        }

        [HttpPost("callback")]
        public async Task<IActionResult> Callback([FromBody] CallbackRequest request)
        {
            var result = await _instagramService.ExchangeCodeAsync(
                request.Code, request.ClientId, request.ClientSecret, request.RedirectUri);

            if (!result.Success)
            {
                return BadRequest(new { error = result.Error });
            }

            return Ok(new { success = true, accessToken = result.AccessToken, userId = result.UserId });
        }
    }

    public record CallbackRequest(string Code, string ClientId, string ClientSecret, string RedirectUri);

    [ApiController]
    [Route("api/[controller]")]
    public class PortfoliosController : ControllerBase
    {
        private readonly PostfolioDbContext _db;

        public PortfoliosController(PostfolioDbContext db)
        {
            _db = db;
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var site = await _db.Sites
                .Include(s => s.Photographer)
                    .ThenInclude(p => p!.Posts)
                .FirstOrDefaultAsync(s => s.Slug == slug);

            if (site == null)
            {
                return NotFound(new { message = $"Portfolio with slug '{slug}' was not found." });
            }

            return Ok(site);
        }

        [HttpPost("publish/{id}")]
        public async Task<IActionResult> TogglePublish(string id, [FromQuery] bool publish = true)
        {
            var site = await _db.Sites.FindAsync(id);
            if (site == null) return NotFound();

            site.IsPublished = publish;
            site.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { success = true, isPublished = site.IsPublished });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class SyncController : ControllerBase
    {
        private readonly PostfolioDbContext _db;
        private readonly IContentCategorizerService _categorizer;

        public SyncController(PostfolioDbContext db, IContentCategorizerService categorizer)
        {
            _db = db;
            _categorizer = categorizer;
        }

        [HttpPost("simulate-post")]
        public async Task<IActionResult> SimulateIncomingPost([FromBody] SimulatePostRequest request)
        {
            var category = _categorizer.CategorizePost(request.Caption, "IMAGE");

            var newPost = new InstagramPost
            {
                PhotographerId = request.PhotographerId ?? "elena_rostova",
                ExternalId = "sim_" + Guid.NewGuid().ToString("N")[..8],
                Caption = request.Caption,
                MediaUrl = request.MediaUrl ?? "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600",
                ThumbnailUrl = request.MediaUrl ?? "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600",
                Category = category,
                Timestamp = DateTime.UtcNow,
                IsFeatured = true,
                IsVisible = true,
                Camera = "Leica M11",
                Lens = "Summilux 50mm f/1.4"
            };

            var log = new SyncHistoryLog
            {
                PhotographerId = newPost.PhotographerId,
                Timestamp = DateTime.UtcNow,
                TriggerType = "webhook",
                PostsFound = 1,
                NewPostsAdded = 1,
                Status = "success",
                Details = $"New Instagram post automatically imported: '{request.Caption[..Math.Min(40, request.Caption.Length)]}...' into category '{category}'"
            };

            _db.Posts.Add(newPost);
            _db.SyncLogs.Add(log);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, post = newPost, log });
        }

        [HttpGet("logs/{photographerId}")]
        public async Task<IActionResult> GetLogs(string photographerId)
        {
            var logs = await _db.SyncLogs
                .Where(l => l.PhotographerId == photographerId)
                .OrderByDescending(l => l.Timestamp)
                .Take(20)
                .ToListAsync();

            return Ok(logs);
        }
    }

    public record SimulatePostRequest(string? PhotographerId, string Caption, string? MediaUrl);

    [ApiController]
    [Route("api/[controller]")]
    public class WebhooksController : ControllerBase
    {
        private const string ExpectedVerifyToken = "postfolio_meta_verify_secret_token";

        [HttpGet("instagram")]
        public IActionResult VerifyChallenge(
            [FromQuery(Name = "hub.mode")] string? mode,
            [FromQuery(Name = "hub.verify_token")] string? token,
            [FromQuery(Name = "hub.challenge")] string? challenge)
        {
            if (mode == "subscribe" && token == ExpectedVerifyToken)
            {
                return Content(challenge ?? string.Empty);
            }
            return Forbid();
        }

        [HttpPost("instagram")]
        public IActionResult ReceiveEvent([FromBody] object payload)
        {
            // Meta Graph API webhook event received
            return Ok(new { status = "EVENT_RECEIVED" });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class InquiriesController : ControllerBase
    {
        private readonly PostfolioDbContext _db;

        public InquiriesController(PostfolioDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInquiry([FromBody] BookingInquiry inquiry)
        {
            inquiry.CreatedAt = DateTime.UtcNow;
            inquiry.Status = "new";
            _db.Inquiries.Add(inquiry);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, inquiryId = inquiry.Id });
        }
    }
}
