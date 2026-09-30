"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { InstagramIcon } from "@/components/decorative/InstagramIcon";
import {
  ArrowRight,
  RefreshCw,
  Sparkles,
  Camera,
  Layers,
  Palette,
  CheckCircle2,
  Calendar,
  Lock,
  Globe,
  Sliders,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { TransformationHero } from "@/components/landing/TransformationHero";
import { FloatingSticker, StampBadge, CartoonCamera } from "@/components/decorative/FloatingSticker";
import { HandDrawnArrow, ScribbleUnderline, ScribbleCircle } from "@/components/decorative/HandDrawnArrow";
import { OTHER_CREATORS } from "@/lib/mockData";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#141413] selection:bg-[#E87A5D]/20 overflow-x-hidden">
      {/* 1. ANNOUNCEMENT BADGE */}
      <div className="bg-[#18191E] text-white py-2.5 px-4 text-center text-xs font-mono border-b border-white/10 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Official Meta Graph API Integration &bull; Instant Zero-Maintenance Sync</span>
        <Link
          href="/connect"
          className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 ml-1"
        >
          Try Demo &rarr;
        </Link>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-2xl bg-stone-900 text-white font-serif flex items-center justify-center font-bold text-lg shadow-sm">
            P
          </span>
          <span className="font-serif font-bold text-2xl tracking-tight text-stone-900">
            Postfolio
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#how-it-works" className="hover:text-stone-900 transition-colors">
            How It Works
          </a>
          <a href="#transformation" className="hover:text-stone-900 transition-colors">
            Transformation
          </a>
          <a href="#categories" className="hover:text-stone-900 transition-colors">
            For Photographers
          </a>
          <a href="#pricing" className="hover:text-stone-900 transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-stone-700 hover:text-stone-900 px-3 py-2"
          >
            Dashboard
          </Link>
          <Link
            href="/connect"
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#1C1917] hover:bg-stone-800 transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <span>Create my portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-20 text-center relative">
        {/* Playful Stickers */}
        <div className="hidden lg:block absolute left-8 top-20">
          <FloatingSticker
            text="Zero Maintenance"
            subtext="Updates automatically"
            emoji="✨"
            rotation={-6}
            bg="#FFF9E6"
            borderColor="#E6D5AC"
          />
        </div>

        <div className="hidden lg:block absolute right-12 top-24">
          <FloatingSticker
            text="Editorial Typography"
            subtext="Not an AI template"
            emoji="✍️"
            rotation={5}
            bg="#F5EFE6"
            borderColor="#DCD4C4"
          />
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/70 border border-stone-300 text-stone-800 text-xs font-mono">
            <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
            <span>Built exclusively for professional photographers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light font-serif tracking-tight leading-[1.08] text-stone-950">
            Your Instagram is{" "}
            <span className="italic block sm:inline font-serif font-normal">
              already your portfolio.
            </span>
          </h1>

          <div className="w-36 mx-auto">
            <ScribbleUnderline color="#C28E5C" />
          </div>

          <p className="text-lg sm:text-xl text-stone-600 font-normal max-w-xl mx-auto leading-relaxed">
            We turn it into a professional website that updates itself.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/connect"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-white bg-[#1C1917] hover:bg-stone-800 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5"
            >
              <span>Create my portfolio</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>

            <Link
              href="/p/elena-rostova"
              className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-medium border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>See an example</span>
              <ExternalLink className="w-4 h-4 text-stone-400" />
            </Link>
          </div>

          <div className="pt-2 text-xs font-mono text-stone-500 flex items-center justify-center gap-2">
            <span>Keep posting on Instagram.</span>
            <span>&bull;</span>
            <span className="font-semibold text-stone-800">Your portfolio updates itself.</span>
          </div>
        </div>

        {/* 4. VISUAL TRANSFORMATION DEMO */}
        <div id="transformation">
          <TransformationHero />
        </div>
      </section>

      {/* 5. TARGET PHOTOGRAPHER SPECIALTIES */}
      <section id="categories" className="py-20 border-t border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C28E5C]">
                Target Audience
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
                Designed exclusively for photographers
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md">
              Not a generic website builder for all creators. Postfolio understands photography EXIF metadata, portrait/landscape ratios, high-res image delivery, and client commission inquiries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Weddings", desc: "Intimate destination vows & heirloom albums" },
              { title: "Pre-Weddings", desc: "Couples, elopements & golden hour sessions" },
              { title: "Portraits", desc: "Daylight studies, studio & editorial headshots" },
              { title: "Events", desc: "Festivals, corporate galas & midnight parties" },
              { title: "Commercial", desc: "Lookbooks, fashion campaigns & brand ateliers" },
              { title: "Candid", desc: "Unposed photojournalism & street storytelling" },
            ].map((spec, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2 hover:border-stone-400 transition-colors"
              >
                <div className="text-xs font-mono text-stone-400">0{i + 1}</div>
                <h4 className="font-serif font-bold text-base text-stone-900">{spec.title}</h4>
                <p className="text-[11px] text-stone-500 leading-snug">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (THE CORE PROMISE) */}
      <section id="how-it-works" className="py-24 border-t border-stone-200/80 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C28E5C]">
              Zero-Maintenance Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
              How Postfolio works
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              The only portfolio tool you set up once and never have to touch again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Connect Instagram",
                desc: "Authorize with official Meta permissions in 1 click. We import your bio, photos, and captions.",
                icon: InstagramIcon,
              },
              {
                step: "02",
                title: "Auto-Categorize",
                desc: "Our engine analyzes captions, semantics & hashtags into Weddings, Portraits, Candids, and Events.",
                icon: Layers,
              },
              {
                step: "03",
                title: "Editorial Portfolio",
                desc: "Generated with bespoke editorial typography and asymmetric spreads. Never looks AI-made.",
                icon: Palette,
              },
              {
                step: "04",
                title: "Auto-Sync Forever",
                desc: "Every time you publish on Instagram, our background worker synchronizes your website in seconds.",
                icon: RefreshCw,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                    {card.step}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">{card.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{card.desc}</p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center text-xs text-stone-400">
                  <card.icon className="w-4 h-4 text-stone-500 mr-2" />
                  <span className="font-mono text-[10px] uppercase">Engineered for speed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LIVE CREATORS SHOWCASE */}
      <section className="py-24 border-t border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C28E5C]">
                Live Showcase
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
                Websites created by Postfolio
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md">
              Each photographer receives a unique design direction matching their visual medium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OTHER_CREATORS.map((creator) => (
              <div
                key={creator.username}
                className="rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group bg-stone-50"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={creator.cover}
                    alt={creator.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-black/70 text-white backdrop-blur-md">
                      @{creator.username}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-stone-900">{creator.name}</h3>
                    <p className="text-xs text-stone-600 mt-1">{creator.role}</p>
                    <span className="text-[11px] font-mono text-stone-400">{creator.location}</span>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-mono">{creator.followers} followers</span>
                    <Link
                      href={`/onboarding?handle=${creator.username}`}
                      className="text-stone-900 font-semibold flex items-center gap-1 group-hover:underline"
                    >
                      <span>Preview style &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 border-t border-stone-200/80 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C28E5C]">
              Photographer Stories
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
              Loved by destination & portrait artists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I hated WordPress and Squarespace with a passion. With Postfolio, I literally just post to my Instagram from Lake Como and my website updates itself before I reach my hotel room.",
                author: "Elena Rostova",
                location: "Milan & Paris",
                role: "Destination Wedding Photographer",
              },
              {
                quote:
                  "Couples used to get lost in my Instagram feed or ask 'do you have a website?'. Now I have a high-fashion portfolio with packages and inquiries that requires zero upkeep.",
                author: "Marcus Chen",
                location: "Brooklyn, NYC",
                role: "Editorial Fashion & Studio",
              },
              {
                quote:
                  "The typography alone looks like an agency charged me $12,000. It doesn't look AI-generated at all—it feels like an Italian art book.",
                author: "Julian Vance",
                location: "London",
                role: "Commercial & Live Music",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <p className="font-serif italic text-sm text-stone-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-stone-100">
                  <div className="font-bold text-xs text-stone-900">{t.author}</div>
                  <div className="text-[11px] text-stone-500">{t.role} • {t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRANSPARENT PRICING */}
      <section id="pricing" className="py-24 border-t border-stone-200/80 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-12 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C28E5C]">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight">
              One simple price. Never build a website again.
            </h2>
            <p className="text-sm text-stone-600">
              Start with a 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl border border-stone-200 bg-stone-50 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase text-stone-500">Solo Photographer</div>
                <div className="text-4xl font-serif font-bold text-stone-900">
                  $14<span className="text-sm font-sans font-normal text-stone-500"> / month</span>
                </div>
                <p className="text-xs text-stone-600">
                  Everything a solo wedding, portrait, or commercial photographer needs.
                </p>

                <ul className="space-y-2.5 text-xs text-stone-700 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Automatic Instagram Sync (24/7)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Intelligent Categorization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Editorial Typography & Palettes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Client Booking Form</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Custom domain (yourname.com)</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/connect"
                className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs text-center transition-all"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="p-8 rounded-3xl border-2 border-stone-900 bg-white space-y-6 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3 right-6 bg-[#C28E5C] text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full font-bold">
                Most Popular
              </div>

              <div className="space-y-4">
                <div className="text-xs font-mono uppercase text-[#C28E5C]">Studio Collective</div>
                <div className="text-4xl font-serif font-bold text-stone-900">
                  $29<span className="text-sm font-sans font-normal text-stone-500"> / month</span>
                </div>
                <p className="text-xs text-stone-600">
                  For high-volume studios, agency collectives, and multi-shooter teams.
                </p>

                <ul className="space-y-2.5 text-xs text-stone-700 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Everything in Solo Photographer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Multiple Instagram Accounts Linked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Client Proofing & Password Galleries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Priority Meta Webhook Ingestion (Sub-second)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated Studio Concierge</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/connect"
                className="w-full py-3.5 rounded-2xl bg-[#C28E5C] hover:bg-[#a87445] text-white font-semibold text-xs text-center transition-all shadow-md"
              >
                Create Studio Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-24 border-t border-stone-200/80 bg-[#FBF9F5]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C28E5C]">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the zero-maintenance auto-sync work?",
                a: "Postfolio registers webhooks with the official Meta/Instagram Graph API. Whenever you publish a new photograph or carousel on your Instagram account, Meta notifies Postfolio, which imports the photo, analyzes the caption, assigns the correct category (e.g. Weddings or Portraits), and publishes it to your live website in seconds.",
              },
              {
                q: "Do I have to keep paying for WordPress hosting or plugins?",
                a: "No! Postfolio completely replaces WordPress, Squarespace, and Wix. High-performance hosting, global CDN image caching, SSL certificates, and mobile optimization are all included.",
              },
              {
                q: "Can I use my own custom domain (e.g. johnphotography.com)?",
                a: "Yes. Every photographer can connect their custom domain with 1 click by adding a standard CNAME record. SSL is provisioned automatically.",
              },
              {
                q: "Can I manually hide certain Instagram posts or re-order categories?",
                a: "Absolutely. The visual studio editor allows you to toggle the visibility of any post, re-order sections, edit text, customize colors, and adjust typography at any time.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                onClick={() => toggleFaq(idx)}
                className="p-6 rounded-2xl bg-white border border-stone-200 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between font-serif font-bold text-base text-stone-900">
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      activeFaq === idx ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {activeFaq === idx && (
                  <p className="mt-3 text-xs text-stone-600 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CALL TO ACTION */}
      <section className="py-24 border-t border-stone-200/80 bg-[#1C1917] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-6 relative z-10">
          <div className="w-14 mx-auto">
            <CartoonCamera className="w-14 h-14" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight">
            Stop updating your website manually.
          </h2>

          <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto font-sans font-light">
            Keep posting on Instagram. Your portfolio updates itself.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/connect"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold bg-[#C28E5C] hover:bg-[#a87445] text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Create my portfolio now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/editor"
              className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-medium border border-white/20 hover:bg-white/10 text-white transition-colors"
            >
              Explore Visual Studio
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 sm:px-10 py-12 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div className="flex items-center gap-3">
          <span className="font-serif font-bold text-stone-900 text-sm">Postfolio</span>
          <span>&copy; {new Date().getFullYear()} Postfolio Inc. Built for fine art & commercial photographers.</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <Link href="/connect" className="hover:text-stone-900">Connect</Link>
          <Link href="/dashboard" className="hover:text-stone-900">Dashboard</Link>
          <Link href="/editor" className="hover:text-stone-900">Studio Editor</Link>
          <Link href="/p/elena-rostova" className="hover:text-stone-900">Example Portfolio</Link>
        </div>
      </footer>
    </div>
  );
}
