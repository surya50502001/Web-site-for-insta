export type CategoryType =
  | "Weddings"
  | "Pre-Weddings"
  | "Portraits"
  | "Events"
  | "Commercial"
  | "Candid"
  | "Featured Work";

export interface PhotographerProfile {
  id: string;
  username: string;
  name: string;
  tagline: string;
  bio: string;
  extendedBio?: string;
  avatarUrl: string;
  coverUrl?: string;
  location: string;
  specialties: CategoryType[];
  postsCount: number;
  followersCount: number;
  followingCount: number;
  instagramUrl: string;
  websiteUrl?: string;
  isConnected: boolean;
  lastSyncedAt: string;
  syncStatus: "active" | "syncing" | "paused" | "error";
  gearSummary?: string;
}

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption: string;
  timestamp: string;
  permalink: string;
  likeCount: number;
  commentsCount: number;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  aspectRatio: "square" | "portrait" | "landscape";
  category: CategoryType;
  isFeatured: boolean;
  isVisible: boolean;
  exifData?: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    iso?: string;
    year?: string;
    location?: string;
  };
}

export interface CategoryInfo {
  id: string;
  name: CategoryType;
  slug: string;
  description: string;
  coverImage: string;
  postCount: number;
}

export type ThemeStyle = "editorial" | "noir" | "atelier" | "minimal";
export type HeroLayout = "fullscreen" | "split" | "asymmetric" | "minimal-center";
export type GalleryLayout = "editorial-grid" | "masonry" | "filmstrip" | "balanced";
export type AnimationIntensity = "subtle" | "expressive" | "minimal";

export interface ThemeConfig {
  style: ThemeStyle;
  primaryFont: string;
  headingFont: string;
  colorPalette: {
    name: string;
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    cardBg: string;
    border: string;
  };
  heroLayout: HeroLayout;
  galleryLayout: GalleryLayout;
  animationLevel: AnimationIntensity;
  showInstagramBadge: boolean;
  showCameraStickers: boolean;
  enableImageParallax: boolean;
}

export interface SiteSection {
  id: string;
  type:
    | "hero"
    | "selected-work"
    | "categories"
    | "latest-sync"
    | "about"
    | "instagram-feed"
    | "pricing"
    | "booking";
  title: string;
  subtitle?: string;
  enabled: boolean;
  order: number;
  customContent?: {
    editorialQuote?: string;
    aboutSignature?: string;
    ctaButtonText?: string;
    highlightCount?: number;
  };
}

export interface ServiceTier {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface BookingSettings {
  headline: string;
  subheadline: string;
  buttonText: string;
  email: string;
  phone?: string;
  location: string;
  noticePeriod?: string;
  pricingStartingAt?: string;
  serviceTiers: ServiceTier[];
}

export interface PortfolioSite {
  id: string;
  userId: string;
  slug: string;
  customDomain?: string;
  title: string;
  published: boolean;
  theme: ThemeConfig;
  profile: PhotographerProfile;
  categories: CategoryInfo[];
  posts: InstagramPost[];
  sections: SiteSection[];
  bookingSettings: BookingSettings;
  createdAt: string;
  updatedAt: string;
  viewsCount?: number;
}

export interface Inquiry {
  id: string;
  siteId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  eventType: string;
  eventDate: string;
  location?: string;
  message: string;
  createdAt: string;
  status: "new" | "replied" | "archived";
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  type: "scheduled" | "webhook" | "manual";
  postsFound: number;
  newPostsAdded: number;
  status: "success" | "error";
  message: string;
}
