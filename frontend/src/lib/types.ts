export type ArtworkFilter = 
  | 'ORIGINAL'
  | 'HALFTONE_SCREENPRINT'
  | 'VINTAGE_STREETWEAR'
  | 'STICKER_CUTOUT'
  | 'ACID_WASH'
  | 'MONOCHROME_PUNK';

export interface DesignArtwork {
  id: string;
  productId: string;
  instagramMediaId?: string;
  title: string;
  subtitle?: string;
  graphicUrl: string;
  filter: ArtworkFilter;
  orderSequence?: number;
}

export interface MerchProduct {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  basePrice: number;
  currency: string;
  fabricSpec: string;
  availableColors: string[];
  availableSizes: string[];
  defaultArtworkUrl: string;
  backArtworkUrl?: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'ACTIVE' | 'ARCHIVED';
  isFeatured?: boolean;
  salesCount: number;
  designs: DesignArtwork[];
  creator?: Creator;
}

export interface Creator {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  profilePicUrl: string;
  followerCount: number;
  isVerified: boolean;
  rightsGrantSigned: boolean;
  revenueSplitPercentage: number;
  payoutUpiId?: string;
  products?: MerchProduct[];
}

export interface InstagramMediaItem {
  id: string;
  creatorId: string;
  instagramMediaId: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL';
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink?: string;
  caption: string;
  likeCount: number;
  commentsCount: number;
  timestamp: string;
  isEligibleForMerch: boolean;
  rightsAuthorized: boolean;
}

export interface FanSubmission {
  id: string;
  creatorId: string;
  submitterName: string;
  submitterEmail: string;
  submitterInstagram?: string;
  title: string;
  description?: string;
  designFileUrl: string;
  proposedRoyaltyShare: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  creatorUsername: string;
  designId: string;
  designTitle: string;
  graphicUrl: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface RevenueBreakdown {
  retailPrice: number;
  baseProductionCost: number;
  paymentGatewayFee: number;
  platformFee: number;
  grossMargin: number;
  creatorProfit: number;
  fanCoCreatorShare: number;
  currency: string;
}
