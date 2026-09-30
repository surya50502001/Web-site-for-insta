using System;
using System.Collections.Generic;

namespace Postfolio.Api.Models
{
    public class PhotographerProfile
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Tagline { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public string CoverUrl { get; set; } = string.Empty;
        public string InstagramAccessToken { get; set; } = string.Empty;
        public DateTime? TokenExpiresAt { get; set; }
        public int PostsCount { get; set; }
        public int FollowersCount { get; set; }
        public DateTime LastSyncedAt { get; set; } = DateTime.UtcNow;
        public bool IsSyncActive { get; set; } = true;
        public string GearSummary { get; set; } = string.Empty;

        public ICollection<InstagramPost> Posts { get; set; } = new List<InstagramPost>();
        public ICollection<PortfolioSite> Sites { get; set; } = new List<PortfolioSite>();
        public ICollection<SyncHistoryLog> SyncLogs { get; set; } = new List<SyncHistoryLog>();
    }

    public class InstagramPost
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string PhotographerId { get; set; } = string.Empty;
        public string ExternalId { get; set; } = string.Empty;
        public string MediaUrl { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Permalink { get; set; } = string.Empty;
        public int LikeCount { get; set; }
        public int CommentsCount { get; set; }
        public string MediaType { get; set; } = "IMAGE";
        public string AspectRatio { get; set; } = "portrait";
        public string Category { get; set; } = "Weddings";
        public bool IsFeatured { get; set; }
        public bool IsVisible { get; set; } = true;

        // Technical EXIF Metadata
        public string Camera { get; set; } = string.Empty;
        public string Lens { get; set; } = string.Empty;
        public string Aperture { get; set; } = string.Empty;
        public string Iso { get; set; } = string.Empty;
        public string PhotoLocation { get; set; } = string.Empty;

        public PhotographerProfile? Photographer { get; set; }
    }

    public class PortfolioSite
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string PhotographerId { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string CustomDomain { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public bool IsPublished { get; set; } = true;
        public string ThemeJson { get; set; } = "{}";
        public string SectionsJson { get; set; } = "[]";
        public string BookingSettingsJson { get; set; } = "{}";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public PhotographerProfile? Photographer { get; set; }
        public ICollection<BookingInquiry> Inquiries { get; set; } = new List<BookingInquiry>();
    }

    public class BookingInquiry
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string SiteId { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public string ClientEmail { get; set; } = string.Empty;
        public string ClientPhone { get; set; } = string.Empty;
        public string EventType { get; set; } = string.Empty;
        public string EventDate { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "new";

        public PortfolioSite? Site { get; set; }
    }

    public class SyncHistoryLog
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string PhotographerId { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string TriggerType { get; set; } = "webhook"; // webhook, scheduled, manual
        public int PostsFound { get; set; }
        public int NewPostsAdded { get; set; }
        public string Status { get; set; } = "success";
        public string Details { get; set; } = string.Empty;

        public PhotographerProfile? Photographer { get; set; }
    }
}
