# WEARGRAM (SaaS Platform)
> **"Your favorite Instagram moments. Now you can wear them."**

A production-quality SaaS platform that turns authorized Instagram creator content into interactive, collectible 3D streetwear merchandise.

---

## ⚡ Core Philosophy & Positioning

* **NOT** a generic AI T-shirt generator.
* **NOT** a cookie-cutter print-on-demand website.
* **A new way for Instagram creators to turn their content into wearable culture.**
* **Instagram content is the source. Physical merchandise is the result. The interactive 3D shopping experience is the differentiator.**

---

## 📐 System Architecture

The platform is engineered into clean, decoupled modules:

```text
┌─────────────────────────────────────────────────────────────┐
│                 FRONTEND (Next.js 14 + Three.js)             │
│  - Interactive 3D T-Shirt Studio (Three.js & Canvas Decal)  │
│  - Instant Design Swipe & Haptic Rotation Transition        │
│  - Landing Page with Live Transformation Hook               │
│  - Creator Storefronts (@chaoscurator, @streetframes, etc.) │
│  - Visual Moment Selector & Streetwear Sizing (240 GSM)     │
│  - Fan Co-Creator Submission Portal                         │
│  - Slide-over Shopping Bag & Instant Order Checkout         │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│   ASP.NET CORE 9 WEB API     │ │     OFFICIAL META / IG     │
│  - REST Controllers          │ │  - Meta Graph OAuth 2.0    │
│  - EF Core (PostgreSQL/SQLite│ │  - Authorized Scopes:      │
│  - Print-on-Demand Webhooks  │ │    instagram_basic         │
│  - Transparent Revenue Split │ │    pages_show_list         │
│  - Digital Rights Management │ │    instagram_manage_insights
└──────────────────────────────┘ └────────────────────────────┘
```

---

## 🌟 Key Features Implemented

### 1. The 3D T-Shirt Experience (Core Visual Differentiator)
* Built on **Three.js** with custom procedural geometry and shaders:
  * **Boxy drop-shoulder streetwear silhouette** (Tokyo / Seoul aesthetic).
  * **Procedural cotton knit bump map** generating realistic weave depth and natural cloth folds.
  * **Direct-to-Garment (DTG) print simulation**: Dynamic canvas texture blending inks with fabric roughness and subtle garment absorption.
  * **Tactile Spring Bounce Transition**: Whenever a fan swipes or clicks a new Instagram moment, the 3D shirt performs an animated rotational spring pop while the artwork updates seamlessly.
  * **Full 360° Touch & Mouse Orbit**, Front/Back view flipping, garment recoloring (*Heavyweight Black, Bone White, Washed Sage, Cobalt, Safety Orange*), and sizing fit guide.

### 2. High-Impact Streetwear Landing Page
* **Hero Headline**: *"If you love their content, wear it."*
* **Supporting copy**: *"Turn your favorite Instagram moments into merchandise."*
* **Primary CTAs**: `CREATE YOUR MERCH` & `EXPLORE CREATORS`.
* **Live Transformation Hook**: Interactive hero pairing the original Instagram Reel/post with the real-time 3D shirt, auto-swipe demo, and one-click purchase.
* **Content → Merch Pipeline Explainer**: 6 visual steps detailing the official ingestion to print dispatch.
* **Garment Engineering Section**: Heavyweight 240 GSM Combed Cotton, Pre-shrunk French Terry, ribbed crewneck specifications.
* **Creator Revenue Calculator**: Interactive sliders for followers, price, and conversion rate showing real-time net earnings (up to 70% profit share).

### 3. Official Meta / Instagram Integration & Legal Rights Mandate
* Built strictly for **authorized creator content** — **zero web scraping**.
* Meta Graph API OAuth connection workflow requesting:
  * `instagram_basic`
  * `pages_show_list`
  * `instagram_manage_insights`
* Digital Content Ownership & Rights Grant sign-off with electronic signatures and audit timestamps.
* Integrated **DMCA & Takedown Notice Portal** with automated review ticket generation.

### 4. Creator Studio & Merch Builder (`/creator-studio`)
* **Authorized Media Ingestion**: Displays connected posts, Reels, and carousels with likes, comments, and timestamps.
* **3D Stencil Studio**:
  * Apply streetwear stencil filters: *Original, Halftone Screenprint, Vintage Streetwear, Sticker Cutout*.
  * Instant 3D T-shirt preview reflecting the chosen artwork.
  * Pricing economics simulator (e.g. ₹799 retail → ₹350 base print cost, ₹19 gateway fee, ₹61 platform fee, **₹369 net creator profit per tee**).
  * One-click `Publish Drop to Storefront`.
* **Fan Submission Queue**: Review community fan art, preview on 3D shirt, and one-click `Approve & Publish` or `Reject`.
* **Revenue & Payout Analytics**: Total earnings (₹), units sold, and active UPI/Stripe payout connection.

### 5. Dedicated Creator Storefronts (`/creator/[username]`)
* Branded creator hub (`/@chaoscurator`, `/@streetframes`, `/@pixelmanga`).
* Verified badge, Instagram follower count, bio, and official Instagram link.
* Featured 3D interactive hero garment drop.
* Grid of all authorized creator drops with quick 3D view.
* **Fan Art Submission Portal**: Fans can pitch designs inspired by the creator with a built-in 15% co-creator royalty share agreement.

### 6. Interactive Product Page (`/product/[id]`)
* Large center/left 3D garment canvas.
* **Visual Design Selector Strip**: Instant reactive 3D shirt update on click.
* Swatches for garment colors, boxy fit sizes (S, M, L, XL, 2XL), quantity selector.
* Sticky mobile purchase bar with swipe sheet.
* Native social sharing to WhatsApp, X (Twitter), and clipboard copy.

### 7. Print-on-Demand & Order Fulfillment
* Direct-to-Garment (DTG) print job dispatching (Printful / Gelato schema compliant).
* Generates tracking IDs, courier updates, and dynamic creator profit allocation.

---

## 🚀 Running the Platform Locally

### Backend (ASP.NET Core 9 Web API)
```bash
cd backend/MerchPlatform.Api
dotnet run --urls "http://localhost:5000"
```
* API runs at: `http://localhost:5000`
* Swagger UI documentation: `http://localhost:5000/swagger`

### Frontend (Next.js 14 + Three.js)
```bash
cd frontend
npm run dev
# Or for the optimized production server:
npm start
```
* Frontend runs at: `http://localhost:3000`

---

## 📁 Repository Structure

```text
f:\MERCH\
├── backend/
│   └── MerchPlatform.Api/
│       ├── Controllers/          # REST API endpoints (Creators, Products, Instagram, Orders, FanSubmissions)
│       ├── Data/                 # MerchDbContext (EF Core SQLite/PostgreSQL) & DbInitializer seed data
│       ├── Models/               # Creator, InstagramMedia, MerchProduct, DesignArtwork, FanSubmission, Order
│       ├── Services/             # MetaGraphApiService, RevenueCalculatorService, PrintOnDemandService
│       └── Program.cs            # DI configuration, CORS, Swagger, Database setup
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Landing page with 3D hero viewer & earnings calculator
│   │   │   ├── explore/          # Explore Creators directory with filters
│   │   │   ├── creator/[username]# Dedicated Creator Storefront
│   │   │   ├── product/[id]/     # Interactive 3D Product Page with visual selector
│   │   │   ├── creator-studio/   # Creator Studio, Stencil builder, Fan queue, Analytics
│   │   │   ├── globals.css       # Streetwear design tokens, brutalist shadows, typography
│   │   │   └── layout.tsx        # Root layout with CartProvider, Navbar, Footer
│   │   ├── components/
│   │   │   ├── 3d/               # TShirtCanvas (Three.js 3D viewer) & Hero3DViewer
│   │   │   ├── layout/           # Navbar with live ticker, Footer with legal/specs
│   │   │   ├── cart/             # CartDrawer slide-over with order checkout
│   │   │   ├── creator/          # FanSubmissionModal, InstagramConnectModal
│   │   │   └── common/           # RightsModal (DMCA takedown & compliance)
│   │   └── lib/                  # types.ts, mockData.ts, api.ts, CartContext.tsx
│   └── package.json
└── README.md
```
