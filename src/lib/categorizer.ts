import { CategoryType, InstagramPost } from "./types";

interface CategorizationResult {
  category: CategoryType;
  confidence: number;
  matchedKeywords: string[];
  suggestedTags: string[];
}

const CATEGORY_KEYWORDS: Record<CategoryType, string[]> = {
  Weddings: [
    "wedding",
    "bride",
    "groom",
    "vows",
    "ceremony",
    "aisle",
    "altar",
    "veil",
    "bridal",
    "destination wedding",
    "lake como",
    "tuscany",
    "chateau",
    "villa",
    "newlyweds",
    "matrimony",
    "first kiss",
    "reception",
    "heirloom",
  ],
  "Pre-Weddings": [
    "pre-wedding",
    "prewedding",
    "engagement",
    "proposal",
    "engaged",
    "save the date",
    "lovers",
    "elopement",
    "prewed",
    "couple session",
    "santorini",
    "golden hour couples",
  ],
  Portraits: [
    "portrait",
    "headshot",
    "editorial",
    "studio",
    "model",
    "vogue",
    "harper",
    "daylight study",
    "natural light",
    "window light",
    "skin texture",
    "monochrome portrait",
    "eyes",
    "posture",
  ],
  Events: [
    "event",
    "gala",
    "party",
    "celebration",
    "midnight",
    "champagne",
    "orchestra",
    "festival",
    "conference",
    "red carpet",
    "exhibition",
    "awards",
  ],
  Commercial: [
    "commercial",
    "campaign",
    "lookbook",
    "brand",
    "advertising",
    "atelier",
    "autumn campaign",
    "cashmere",
    "collection",
    "client",
    "product",
  ],
  Candid: [
    "candid",
    "unposed",
    "unstaged",
    "raw emotion",
    "in-between",
    "street",
    "laughter",
    "spontaneous",
    "first dance",
    "whisper",
    "pier",
  ],
  "Featured Work": ["featured", "cover", "award", "masterpiece", "signature", "curated", "favorite"],
};

export function categorizePost(caption: string, mediaType: string = "IMAGE"): CategorizationResult {
  const cleanCaption = (caption || "").toLowerCase();
  let bestCategory: CategoryType = "Portraits";
  let maxScore = 0;
  let bestMatches: string[] = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [CategoryType, string[]][]) {
    let score = 0;
    const matches: string[] = [];

    for (const kw of keywords) {
      if (cleanCaption.includes(kw)) {
        score += kw.includes(" ") ? 3 : 2; // multi-word matches get higher weight
        matches.push(kw);
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
      bestMatches = matches;
    }
  }

  // Fallbacks if no keywords matched
  if (maxScore === 0) {
    if (cleanCaption.includes("love") || cleanCaption.includes("forever") || cleanCaption.includes("ring")) {
      bestCategory = "Weddings";
      bestMatches = ["contextual love"];
    } else {
      bestCategory = "Portraits";
    }
  }

  const confidence = Math.min(100, Math.max(45, maxScore * 20));

  return {
    category: bestCategory,
    confidence,
    matchedKeywords: bestMatches,
    suggestedTags: bestMatches.slice(0, 3).map((w) => `#${w.replace(/\s+/g, "")}`),
  };
}

export function autoOrganizePosts(posts: InstagramPost[]): {
  postsWithCategories: InstagramPost[];
  categoryCounts: Record<CategoryType, number>;
} {
  const categoryCounts: Record<CategoryType, number> = {
    Weddings: 0,
    "Pre-Weddings": 0,
    Portraits: 0,
    Events: 0,
    Commercial: 0,
    Candid: 0,
    "Featured Work": 0,
  };

  const processed = posts.map((post) => {
    // If post already has a category specified, retain or refine
    const result = categorizePost(post.caption, post.mediaType);
    const assignedCategory = post.category || result.category;
    categoryCounts[assignedCategory] = (categoryCounts[assignedCategory] || 0) + 1;

    return {
      ...post,
      category: assignedCategory,
    };
  });

  return {
    postsWithCategories: processed,
    categoryCounts,
  };
}
