using MerchPlatform.Api.Models;

namespace MerchPlatform.Api.Data;

public static class DbInitializer
{
    public static void Initialize(MerchDbContext context)
    {
        context.Database.EnsureCreated();

        if (context.Creators.Any())
        {
            return; // DB has been seeded
        }

        var creator1 = new Creator
        {
            Id = "c1",
            Username = "chaoscurator",
            DisplayName = "Chaos Curator",
            Bio = "Internet's favorite chaos. Archiving accidental masterpieces, memes that hit too close, and late-night visual thoughts.",
            ProfilePicUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            FollowerCount = 124800,
            IsVerified = true,
            RightsGrantSigned = true,
            RightsGrantSignedAt = DateTime.UtcNow.AddMonths(-3),
            RevenueSplitPercentage = 70.0,
            PayoutUpiId = "chaos@okaxis",
            CreatedAt = DateTime.UtcNow.AddMonths(-3)
        };

        var creator2 = new Creator
        {
            Id = "c2",
            Username = "streetframes",
            DisplayName = "Street Frames",
            Bio = "Cinematic 35mm captures from Tokyo, Seoul, & Berlin. Turning fleeting street energy into wearable film grain.",
            ProfilePicUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            FollowerCount = 89200,
            IsVerified = true,
            RightsGrantSigned = true,
            RightsGrantSignedAt = DateTime.UtcNow.AddMonths(-2),
            RevenueSplitPercentage = 70.0,
            PayoutUpiId = "frames@oksbi",
            CreatedAt = DateTime.UtcNow.AddMonths(-2)
        };

        var creator3 = new Creator
        {
            Id = "c3",
            Username = "pixelmanga",
            DisplayName = "Pixel Manga",
            Bio = "Dark anime aesthetics, lo-fi panel art, and cybernetic moods. Authorized wear for night owls.",
            ProfilePicUrl = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
            FollowerCount = 210500,
            IsVerified = true,
            RightsGrantSigned = true,
            RightsGrantSignedAt = DateTime.UtcNow.AddMonths(-4),
            RevenueSplitPercentage = 75.0,
            PayoutUpiId = "pixel@okicici",
            CreatedAt = DateTime.UtcNow.AddMonths(-4)
        };

        context.Creators.AddRange(creator1, creator2, creator3);

        // Instagram Media for Creator 1
        var media1_1 = new InstagramMedia
        {
            Id = "m1_1",
            CreatorId = creator1.Id,
            InstagramMediaId = "ig_18491823901",
            MediaType = InstagramMediaType.REEL,
            MediaUrl = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
            ThumbnailUrl = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
            Permalink = "https://instagram.com/p/C0911_chaos",
            Caption = "When the deadline is in 2 hours and you discover a whole new obsession 😂 #designchaos #midnightenergy",
            LikeCount = 48200,
            CommentsCount = 1340,
            IsEligibleForMerch = true,
            RightsAuthorized = true,
            RightsAuthorizedAt = DateTime.UtcNow.AddMonths(-3)
        };

        var media1_2 = new InstagramMedia
        {
            Id = "m1_2",
            CreatorId = creator1.Id,
            InstagramMediaId = "ig_18491823902",
            MediaType = InstagramMediaType.IMAGE,
            MediaUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            ThumbnailUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
            Permalink = "https://instagram.com/p/C0912_chaos",
            Caption = "The emotion of 2026 summed up in a single blurry frame.",
            LikeCount = 61200,
            CommentsCount = 2100,
            IsEligibleForMerch = true,
            RightsAuthorized = true,
            RightsAuthorizedAt = DateTime.UtcNow.AddMonths(-3)
        };

        var media1_3 = new InstagramMedia
        {
            Id = "m1_3",
            CreatorId = creator1.Id,
            InstagramMediaId = "ig_18491823903",
            MediaType = InstagramMediaType.IMAGE,
            MediaUrl = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
            ThumbnailUrl = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
            Permalink = "https://instagram.com/p/C0913_chaos",
            Caption = "Overthinking club: lifetime VIP member card.",
            LikeCount = 92000,
            CommentsCount = 3450,
            IsEligibleForMerch = true,
            RightsAuthorized = true,
            RightsAuthorizedAt = DateTime.UtcNow.AddMonths(-2)
        };

        context.InstagramMedia.AddRange(media1_1, media1_2, media1_3);

        // Products for Creator 1
        var prod1 = new MerchProduct
        {
            Id = "p1",
            CreatorId = creator1.Id,
            Title = "THE OVERSIZED CHAOS TEE",
            Description = "Premium heavyweight 240 GSM drop-shoulder boxy tee featuring iconic approved moments from @chaoscurator's viral archives. Screen-printed with ultra-dense pigment inks for lasting grit.",
            BasePrice = 799.00m,
            Currency = "INR",
            FabricSpec = "240 GSM Combed Cotton French Terry, Ribbed 1.25\" Crewneck, Pre-shrunk Boxy Fit",
            AvailableColorsJson = "[\"#121214\",\"#F4F4F0\",\"#2B3530\",\"#1E3A8A\",\"#FF4E00\"]",
            AvailableSizesJson = "[\"S\",\"M\",\"L\",\"XL\",\"2XL\"]",
            DefaultArtworkUrl = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
            Status = ProductStatus.ACTIVE,
            IsFeatured = true,
            SalesCount = 428,
            CreatedAt = DateTime.UtcNow.AddMonths(-2)
        };

        var prod2 = new MerchProduct
        {
            Id = "p2",
            CreatorId = creator2.Id,
            Title = "SHINJUKU MIDNIGHT FRAME TEE",
            Description = "Heavyweight 240 GSM vintage washed tee carrying authentic 35mm film grain frames straight from Tokyo streets. Officially licensed by @streetframes.",
            BasePrice = 899.00m,
            Currency = "INR",
            FabricSpec = "240 GSM Heavyweight Organic Cotton, Acid Washed Charcoal Finish, Pre-shrunk",
            AvailableColorsJson = "[\"#18181A\",\"#EAE6DF\",\"#3B423C\"]",
            AvailableSizesJson = "[\"S\",\"M\",\"L\",\"XL\"]",
            DefaultArtworkUrl = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
            Status = ProductStatus.ACTIVE,
            IsFeatured = true,
            SalesCount = 312,
            CreatedAt = DateTime.UtcNow.AddMonths(-1)
        };

        context.Products.AddRange(prod1, prod2);

        // Designs for Product 1
        var design1 = new DesignArtwork
        {
            Id = "d1",
            ProductId = prod1.Id,
            InstagramMediaId = media1_1.Id,
            Title = "DEADLINE OBSESSION (REEL #37)",
            Subtitle = "From Reel: Deadline at 2am (48.2k likes)",
            GraphicUrl = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
            Filter = ArtworkFilter.VINTAGE_STREETWEAR,
            CreatorApproved = true,
            CreatorApprovedAt = DateTime.UtcNow.AddMonths(-2),
            OrderSequence = 1
        };

        var design2 = new DesignArtwork
        {
            Id = "d2",
            ProductId = prod1.Id,
            InstagramMediaId = media1_2.Id,
            Title = "BLURRY EMOTION '26",
            Subtitle = "From Viral Post #84 (61.2k likes)",
            GraphicUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            Filter = ArtworkFilter.HALFTONE_SCREENPRINT,
            CreatorApproved = true,
            CreatorApprovedAt = DateTime.UtcNow.AddMonths(-2),
            OrderSequence = 2
        };

        var design3 = new DesignArtwork
        {
            Id = "d3",
            ProductId = prod1.Id,
            InstagramMediaId = media1_3.Id,
            Title = "OVERTHINKING CLUB VIP",
            Subtitle = "From Post: Lifetime Membership (92k likes)",
            GraphicUrl = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
            Filter = ArtworkFilter.ORIGINAL,
            CreatorApproved = true,
            CreatorApprovedAt = DateTime.UtcNow.AddMonths(-2),
            OrderSequence = 3
        };

        var design4 = new DesignArtwork
        {
            Id = "d4",
            ProductId = prod1.Id,
            Title = "NEON SMILE STATIC",
            Subtitle = "From Reel: Smile Through The Glitch",
            GraphicUrl = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
            Filter = ArtworkFilter.STICKER_CUTOUT,
            CreatorApproved = true,
            CreatorApprovedAt = DateTime.UtcNow.AddMonths(-1),
            OrderSequence = 4
        };

        context.DesignArtworks.AddRange(design1, design2, design3, design4);

        // Fan Submissions
        var fanSub1 = new FanSubmission
        {
            Id = "fs1",
            CreatorId = creator1.Id,
            SubmitterName = "Aryan Sharma",
            SubmitterEmail = "aryan@graphiclab.dev",
            SubmitterInstagram = "@aryanstudio",
            Title = "CHAOS ARCHIVE TYPOGRAPHY TEE",
            Description = "Turned the audio spectrogram from your viral Reel #37 into a brutalist streetwear typographic print.",
            DesignFileUrl = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
            ProposedRoyaltyShare = 15.0,
            Status = FanSubmissionStatus.PENDING,
            SubmittedAt = DateTime.UtcNow.AddDays(-2)
        };

        context.FanSubmissions.Add(fanSub1);

        context.SaveChanges();
    }
}
