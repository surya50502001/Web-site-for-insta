import { Creator, MerchProduct, InstagramMediaItem, FanSubmission } from './types';

export const MOCK_CREATORS: Creator[] = [
  {
    id: "c1",
    username: "chaoscurator",
    displayName: "Chaos Curator",
    bio: "Internet's favorite chaos. Archiving accidental masterpieces, memes that hit too close, and late-night visual thoughts.",
    profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    followerCount: 124800,
    isVerified: true,
    rightsGrantSigned: true,
    revenueSplitPercentage: 70.0,
    payoutUpiId: "chaos@okaxis"
  },
  {
    id: "c2",
    username: "streetframes",
    displayName: "Street Frames",
    bio: "Cinematic 35mm captures from Tokyo, Seoul, & Berlin. Turning fleeting street energy into wearable film grain.",
    profilePicUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    followerCount: 89200,
    isVerified: true,
    rightsGrantSigned: true,
    revenueSplitPercentage: 70.0,
    payoutUpiId: "frames@oksbi"
  },
  {
    id: "c3",
    username: "pixelmanga",
    displayName: "Pixel Manga",
    bio: "Dark anime aesthetics, lo-fi panel art, and cybernetic moods. Authorized wear for night owls.",
    profilePicUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    followerCount: 210500,
    isVerified: true,
    rightsGrantSigned: true,
    revenueSplitPercentage: 75.0,
    payoutUpiId: "pixel@okicici"
  },
  {
    id: "c4",
    username: "retroarcade",
    displayName: "Retro Arcade Club",
    bio: "90s quarter munchers, CRT glows, and arcade cabinet typography. Nostalgia you can actually wash.",
    profilePicUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    followerCount: 45300,
    isVerified: false,
    rightsGrantSigned: true,
    revenueSplitPercentage: 70.0,
    payoutUpiId: "retro@okaxis"
  }
];

export const MOCK_PRODUCTS: MerchProduct[] = [
  {
    id: "p1",
    creatorId: "c1",
    title: "THE OVERSIZED CHAOS TEE",
    description: "Premium heavyweight 240 GSM drop-shoulder boxy tee featuring iconic approved moments from @chaoscurator's viral archives. Screen-printed with ultra-dense pigment inks for lasting grit.",
    basePrice: 799,
    currency: "INR",
    fabricSpec: "240 GSM Combed Cotton French Terry, Ribbed 1.25\" Crewneck, Pre-shrunk Boxy Fit",
    availableColors: ["#121214", "#F4F4F0", "#2B3530", "#1E3A8A", "#FF4E00"],
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    defaultArtworkUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    status: "ACTIVE",
    isFeatured: true,
    salesCount: 428,
    designs: [
      {
        id: "d1",
        productId: "p1",
        instagramMediaId: "m1_1",
        title: "DEADLINE OBSESSION (REEL #37)",
        subtitle: "From Reel: Deadline at 2am (48.2k likes)",
        graphicUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        filter: "VINTAGE_STREETWEAR",
        orderSequence: 1
      },
      {
        id: "d2",
        productId: "p1",
        instagramMediaId: "m1_2",
        title: "BLURRY EMOTION '26",
        subtitle: "From Viral Post #84 (61.2k likes)",
        graphicUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        filter: "HALFTONE_SCREENPRINT",
        orderSequence: 2
      },
      {
        id: "d3",
        productId: "p1",
        instagramMediaId: "m1_3",
        title: "OVERTHINKING CLUB VIP",
        subtitle: "From Post: Lifetime Membership (92k likes)",
        graphicUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
        filter: "ORIGINAL",
        orderSequence: 3
      },
      {
        id: "d4",
        productId: "p1",
        title: "NEON SMILE STATIC",
        subtitle: "From Reel: Smile Through The Glitch (74k likes)",
        graphicUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
        filter: "STICKER_CUTOUT",
        orderSequence: 4
      }
    ],
    creator: MOCK_CREATORS[0]
  },
  {
    id: "p2",
    creatorId: "c2",
    title: "SHINJUKU MIDNIGHT FRAME TEE",
    description: "Heavyweight 240 GSM vintage washed tee carrying authentic 35mm film grain frames straight from Tokyo streets. Officially licensed by @streetframes.",
    basePrice: 899,
    currency: "INR",
    fabricSpec: "240 GSM Heavyweight Organic Cotton, Acid Washed Charcoal Finish, Pre-shrunk",
    availableColors: ["#18181A", "#EAE6DF", "#3B423C"],
    availableSizes: ["S", "M", "L", "XL"],
    defaultArtworkUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    status: "ACTIVE",
    isFeatured: true,
    salesCount: 312,
    designs: [
      {
        id: "d5",
        productId: "p2",
        title: "RAIN REFLECTION (SHIBUYA 02:41 AM)",
        subtitle: "From 35mm Tokyo Night Series (84k likes)",
        graphicUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
        filter: "ORIGINAL",
        orderSequence: 1
      },
      {
        id: "d6",
        productId: "p2",
        title: "BERLIN SUBWAY KODAK 400",
        subtitle: "From Berlin U-Bahn Series (49k likes)",
        graphicUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
        filter: "VINTAGE_STREETWEAR",
        orderSequence: 2
      }
    ],
    creator: MOCK_CREATORS[1]
  },
  {
    id: "p3",
    creatorId: "c3",
    title: "CYBER ARCHIVE PANEL TEE",
    description: "Cyberpunk manga aesthetics, halftone screen printing, and brutalist framing. Printed on custom milled drop-shoulder heavyweight cotton.",
    basePrice: 949,
    currency: "INR",
    fabricSpec: "240 GSM Combed Cotton French Terry, Ribbed Collar, Oversized Fit",
    availableColors: ["#0C0C0E", "#F4F4F0", "#2563EB"],
    availableSizes: ["M", "L", "XL", "2XL"],
    defaultArtworkUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    status: "ACTIVE",
    isFeatured: true,
    salesCount: 512,
    designs: [
      {
        id: "d7",
        productId: "p3",
        title: "CYBERNETIC AWAKENING",
        subtitle: "From Chapter 04 Manga Reel (112k likes)",
        graphicUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
        filter: "HALFTONE_SCREENPRINT",
        orderSequence: 1
      }
    ],
    creator: MOCK_CREATORS[2]
  }
];

export const MOCK_INSTAGRAM_MEDIA: InstagramMediaItem[] = [
  {
    id: "m1_1",
    creatorId: "c1",
    instagramMediaId: "ig_18491823901",
    mediaType: "REEL",
    mediaUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80",
    permalink: "https://instagram.com/p/C0911_chaos",
    caption: "When the deadline is in 2 hours and you discover a whole new obsession 😂 #designchaos #midnightenergy",
    likeCount: 48200,
    commentsCount: 1340,
    timestamp: "2026-09-20T14:32:00Z",
    isEligibleForMerch: true,
    rightsAuthorized: true
  },
  {
    id: "m1_2",
    creatorId: "c1",
    instagramMediaId: "ig_18491823902",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    permalink: "https://instagram.com/p/C0912_chaos",
    caption: "The emotion of 2026 summed up in a single blurry frame.",
    likeCount: 61200,
    commentsCount: 2100,
    timestamp: "2026-09-18T18:12:00Z",
    isEligibleForMerch: true,
    rightsAuthorized: true
  },
  {
    id: "m1_3",
    creatorId: "c1",
    instagramMediaId: "ig_18491823903",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80",
    permalink: "https://instagram.com/p/C0913_chaos",
    caption: "Overthinking club: lifetime VIP member card.",
    likeCount: 92000,
    commentsCount: 3450,
    timestamp: "2026-09-15T11:45:00Z",
    isEligibleForMerch: true,
    rightsAuthorized: true
  },
  {
    id: "m1_4",
    creatorId: "c1",
    instagramMediaId: "ig_18491823904",
    mediaType: "REEL",
    mediaUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80",
    permalink: "https://instagram.com/p/C0914_chaos",
    caption: "Smiles through the system glitch. Wear your bugs proudly.",
    likeCount: 74100,
    commentsCount: 1980,
    timestamp: "2026-09-10T09:20:00Z",
    isEligibleForMerch: true,
    rightsAuthorized: true
  }
];

export const MOCK_FAN_SUBMISSIONS: FanSubmission[] = [
  {
    id: "fs1",
    creatorId: "c1",
    submitterName: "Aryan Sharma",
    submitterEmail: "aryan@graphiclab.dev",
    submitterInstagram: "@aryanstudio",
    title: "CHAOS ARCHIVE AUDIO WAVE TEE",
    description: "Turned the audio spectrogram from your viral Reel #37 into a brutalist streetwear typographic print.",
    designFileUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    proposedRoyaltyShare: 15.0,
    status: "PENDING",
    submittedAt: "2026-09-29T10:15:00Z"
  }
];
