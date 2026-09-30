# Postfolio — The Zero-Maintenance Photographer Portfolio

> **"Keep posting on Instagram. Your portfolio updates itself."**

Postfolio automatically transforms a photographer's Instagram presence into a professional, personalized portfolio website that **stays updated whenever they publish new Instagram content**.

Designed and engineered to feel like a bespoke digital product created by a high-end design studio—**NOT an AI-generated template**.

---

## 📸 Product Concept & Target Audience

Most professional photographers have great work on Instagram, but their website is months or years out of date because updating WordPress or Squarespace is tedious and time-consuming.

**Postfolio solves this forever:**
1. Connect your Instagram account through the official Meta Graph API.
2. Our engine automatically imports and analyzes your photographs, captions, and EXIF metadata.
3. Your work is categorized into meaningful photography genres (**Weddings**, **Pre-Weddings**, **Portraits**, **Events**, **Commercial**, **Candid**).
4. An editorial, luxury website is generated with curated typography and asymmetric spreads.
5. **Zero Maintenance:** Every time you post on Instagram, your live portfolio website updates in seconds.

### Target Customer
Purpose-built specifically for photographers:
* **Destination & Wedding Photographers**
* **Pre-Wedding & Elopement Photographers**
* **Studio & Editorial Portrait Photographers**
* **Event & Festival Photographers**
* **Commercial & Fashion Lookbook Photographers**
* **Candid Photojournalists & Street Photographers**

---

## 🎨 Visual Identity & Editorial Design

* **Typography First:** Expressive editorial serif headings (`Playfair Display`, `Cormorant Garamond`, `Space Grotesk`) paired with clean modern sans-serifs (`Plus Jakarta Sans`) and monospace technical metadata (`JetBrains Mono`).
* **Luxury Palettes:**
  * *Editorial Ochre & Paper Linen* (Cream `#FCFAF6`, Charcoal `#121211`, Warm Ochre `#C28E5C`)
  * *Dark Noir & Titanium* (Midnight `#0C0D10`, Titanium `#F0F0F2`, Studio Amber `#FF6B4A`)
  * *Atelier Sage & Linen* (Stone `#F6F4EE`, Forest `#1E231F`, Muted Sage `#4A6B56`)
  * *Monochrome Gallery* (Pure White `#FFFFFF`, Pitch Black `#0A0A0A`, Minimalist Lines)
* **Playful & Sophisticated Accents:** Hand-drawn SVG arrows, subtle cartoon stickers (`Leica M11 & 35mm film`, `Zero Maintenance Active`), scribbles, and micro-interactions that enhance the photography rather than competing with it.

---

## 🏗️ System Architecture

Postfolio is architected into clean, decoupled layers:

```
├── src/                                   # Frontend (Next.js 14 App Router, TypeScript, Tailwind, Framer Motion)
│   ├── app/
│   │   ├── page.tsx                       # Flagship landing page with interactive transformation morph
│   │   ├── connect/                       # Instagram connection & Meta OAuth permission flow
│   │   ├── onboarding/                    # Real-time generation experience with progress steps
│   │   ├── dashboard/                     # SaaS photographer dashboard with live sync logs
│   │   ├── editor/                        # 3-Pane Visual Studio: Sections, Typography, Colors, Layouts, Inspector
│   │   ├── p/[slug]/                      # High-performance public portfolio with lightbox & booking modal
│   │   └── api/                           # Next.js API Routes (OAuth, Sync, Webhooks, Inquiries)
│   │       ├── auth/instagram/
│   │       ├── auth/callback/
│   │       ├── instagram/sync/
│   │       ├── instagram/webhook/
│   │       └── contact/
│   ├── components/
│   │   ├── landing/                       # TransformationHero, Showcase, Pricing, FAQ
│   │   ├── portfolio/                     # Master PortfolioRenderer, LightboxModal, BookingModal
│   │   ├── decorative/                    # HandDrawnArrow, FloatingSticker, CartoonCamera, StampBadge
│   │   └── editor/                        # Studio controls & device viewport switcher
│   └── lib/
│       ├── types.ts                       # Domain types (PhotographerProfile, InstagramPost, etc.)
│       ├── mockData.ts                    # Curated photographer dataset & themes
│       ├── instagramApi.ts                # Official Meta Graph API client & token exchange
│       ├── categorizer.ts                 # NLP & semantic content categorization engine
│       └── storage.ts                     # Persistence & real-time auto-sync simulator
│
└── backend/                               # Backend (ASP.NET Core 8 Web API & Background Workers)
    └── Postfolio.Api/
        ├── Controllers/                   # Auth, Portfolios, Sync, Webhooks, Inquiries
        ├── Models/                        # EF Core Entities (Photographer, Post, Site, Inquiry, SyncLog)
        ├── Data/                          # PostfolioDbContext (PostgreSQL / In-Memory support)
        ├── Services/
        │   ├── InstagramService.cs        # Meta Graph API token exchange & media ingestion
        │   ├── ContentCategorizerService.cs # Keyword & heuristic categorization
        │   └── InstagramBackgroundSyncWorker.cs # Periodic background sync service
        └── Program.cs                     # DI, CORS, Seeding, Swagger OpenAPI
```

---

## ⚡ Quick Start & Local Development

### 1. Prerequisites
* **Node.js** v18+ (Node v22 tested)
* **npm** v9+
* **.NET 8 SDK** (Optional, for running ASP.NET Core backend)

### 2. Frontend Setup (Next.js)

```bash
# Clone the repository
git clone https://github.com/surya50502001/Web-site-for-insta.git
cd Web-site-for-insta

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
* **Landing Page:** [http://localhost:3000](http://localhost:3000)
* **Connect Instagram:** [http://localhost:3000/connect](http://localhost:3000/connect)
* **Visual Studio Editor:** [http://localhost:3000/editor](http://localhost:3000/editor)
* **SaaS Dashboard:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
* **Sample Public Portfolio:** [http://localhost:3000/p/elena-rostova](http://localhost:3000/p/elena-rostova)

### 3. Backend Setup (ASP.NET Core 8 Web API)

```bash
cd backend/Postfolio.Api
dotnet run
```

Swagger UI will be available at [http://localhost:5000/swagger](http://localhost:5000/swagger).

---

## 🔒 Official Meta / Instagram Integration

Postfolio integrates with the **Official Instagram Graph API**:

1. **Meta App Scopes:**
   * `instagram_basic`: To read profile information and media permalinks.
   * `pages_show_list`: To discover creator business accounts.
   * `pages_read_engagement`: To retrieve high-resolution images and carousel albums.
2. **Webhooks (`/api/instagram/webhook`):**
   * Subscribes to the `media` field on creator accounts.
   * Dispatches sub-second update events whenever a photographer publishes a new post.
3. **Environment Variables:**

Create a `.env.local` file with your credentials:
```env
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_meta_app_id
INSTAGRAM_CLIENT_SECRET=your_meta_app_secret
NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI=http://localhost:3000/api/auth/callback
META_WEBHOOK_VERIFY_TOKEN=postfolio_meta_verify_secret_token
```

*Note: For testing and demonstration, Postfolio includes an authentic **Sandbox Creator Mode** featuring curated destination wedding and portrait archives, allowing instant 1-click testing without waiting for Meta App Review approval.*

---

## 🚀 Deployment

* **Frontend:** Deploy to **Vercel** with zero configuration (`npm run build`).
* **Backend:** Deploy to **Render**, **Railway**, or **Azure App Service** with Docker or native .NET 8 runtime.
* **Database:** Connect any **PostgreSQL** instance via `ConnectionStrings:DefaultConnection`.

---

## 📄 License

MIT &copy; 2026 Postfolio. Built for discerning photographers.
