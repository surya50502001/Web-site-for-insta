"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PortfolioSite, InstagramPost, CategoryType } from "@/lib/types";
import { LightboxModal } from "./LightboxModal";
import { BookingModal } from "./BookingModal";
import { HandDrawnArrow, ScribbleUnderline, ScribbleCircle } from "../decorative/HandDrawnArrow";
import { FloatingSticker, StampBadge, CartoonCamera } from "../decorative/FloatingSticker";
import { InstagramIcon } from "../decorative/InstagramIcon";
import {
  Camera,
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  MapPin,
  Mail,
  ChevronRight,
  Filter,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioRendererProps {
  site: PortfolioSite;
  isEditorPreview?: boolean;
  onPostClick?: (post: InstagramPost) => void;
  onSimulateNewPost?: () => void;
}

export const PortfolioRenderer: React.FC<PortfolioRendererProps> = ({
  site,
  isEditorPreview = false,
  onPostClick,
  onSimulateNewPost,
}) => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [syncNoticeVisible, setSyncNoticeVisible] = useState(true);

  const { theme, profile, posts, sections, bookingSettings } = site;
  const palette = theme.colorPalette;

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === "All"
      ? posts.filter((p) => p.isVisible)
      : posts.filter((p) => p.isVisible && p.category === activeCategory);

  const featuredPosts = posts.filter((p) => p.isFeatured && p.isVisible);

  const handleOpenLightbox = (post: InstagramPost) => {
    if (onPostClick) {
      onPostClick(post);
    } else {
      setSelectedPost(post);
    }
  };

  const getSection = (type: string) => sections.find((s) => s.type === type && s.enabled);

  return (
    <div
      style={{
        backgroundColor: palette.background,
        color: palette.foreground,
      }}
      className={`min-h-screen relative overflow-x-hidden selection:bg-[${palette.accent}]/20`}
    >
      {/* Lightbox Modal */}
      <LightboxModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        accentColor={palette.accent}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        bookingSettings={bookingSettings}
        photographerName={profile.name}
        accentColor={palette.accent}
      />

      {/* Live Auto-Sync Status Floating Banner */}
      {theme.showInstagramBadge && syncNoticeVisible && (
        <div className="sticky top-0 z-40 w-full bg-black/90 text-white text-xs py-2 px-4 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] text-zinc-300">
                Connected to <strong className="text-white">@{profile.username}</strong>
              </span>
              <span className="hidden sm:inline text-zinc-500">•</span>
              <span className="hidden sm:inline text-zinc-400 text-[11px]">
                Auto-sync active: publishes automatically when you post on Instagram
              </span>
            </div>

            <div className="flex items-center gap-3">
              {onSimulateNewPost && (
                <button
                  onClick={onSimulateNewPost}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors border border-white/10"
                  title="Simulate a new photo published on Instagram to watch Postfolio auto-sync in real time"
                >
                  <RefreshCw className="w-3 h-3 text-amber-400" />
                  <span>Test Auto-Sync</span>
                </button>
              )}
              <button
                onClick={() => setSyncNoticeVisible(false)}
                className="text-zinc-400 hover:text-white text-xs px-1"
                aria-label="Dismiss banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between border-b" style={{ borderColor: palette.border }}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className={`text-xl sm:text-2xl tracking-tight font-bold ${theme.headingFont}`}>
              {profile.name}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest opacity-60">
              {profile.location}
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <div className="hidden md:flex items-center gap-6 font-medium">
            <a href="#selected-work" className="hover:opacity-60 transition-opacity">Work</a>
            <a href="#categories" className="hover:opacity-60 transition-opacity">Galleries</a>
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#booking" className="hover:opacity-60 transition-opacity">Pricing</a>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-transform active:scale-95 shadow-sm text-white flex items-center gap-2"
            style={{ backgroundColor: palette.accent }}
          >
            <span>Inquire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </header>

      {/* 1. HERO SECTION */}
      {getSection("hero") && (
        <section className="relative max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-24 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Editorial Headline & Bio */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              {/* Playful sticker pill */}
              {theme.showCameraStickers && (
                <div className="inline-flex items-center gap-2">
                  <FloatingSticker
                    text="Zero-Maintenance Portfolio"
                    emoji="⚡"
                    rotation={-2}
                    bg={palette.cardBg}
                    textColor={palette.foreground}
                    borderColor={palette.border}
                  />
                  <span className="text-xs font-mono opacity-50">• Leica & Film Craft</span>
                </div>
              )}

              <div className="space-y-4">
                <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] ${theme.headingFont}`}>
                  {profile.tagline.split("&")[0]}
                  {profile.tagline.includes("&") && (
                    <>
                      <span className="italic block sm:inline font-serif">&amp; {profile.tagline.split("&")[1]}</span>
                    </>
                  )}
                </h1>
                <div className="w-24">
                  <ScribbleUnderline color={palette.accent} />
                </div>
              </div>

              <p className="text-base sm:text-lg leading-relaxed opacity-80 max-w-lg font-normal">
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-7 py-3.5 rounded-full text-sm font-semibold text-white tracking-wide shadow-md transition-all hover:opacity-90 active:scale-95 flex items-center gap-2.5"
                  style={{ backgroundColor: palette.accent }}
                >
                  <span>{getSection("hero")?.customContent?.ctaButtonText || "View Selected Stories"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full text-sm font-medium border transition-colors flex items-center gap-2 hover:bg-black/5"
                  style={{ borderColor: palette.border }}
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>@{profile.username}</span>
                </a>
              </div>

              {/* Hand-drawn arrow pointing to work */}
              <div className="hidden sm:flex items-center gap-3 pt-6 opacity-60">
                <HandDrawnArrow variant="curved-down" color={palette.accent} className="w-10 h-10 -rotate-12" />
                <span className="text-xs font-serif italic text-stone-500">
                  Curated straight from Instagram feed
                </span>
              </div>
            </div>

            {/* Right Column: Large Cinematic Photograph Hero */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border" style={{ borderColor: palette.border }}>
                <Image
                  src={profile.coverUrl || posts[0]?.mediaUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600"}
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/20 backdrop-blur-md">
                      Featured Cover Story
                    </span>
                    <h3 className="text-lg font-serif mt-2 text-white">
                      Lake Como Nuptials & Twilight
                    </h3>
                  </div>

                  <div className="hidden sm:block">
                    <StampBadge
                      title="Postfolio"
                      subtitle="Live Sync"
                      color="#FFFFFF"
                      className="w-20 h-20 bg-black/40 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Playful Floating Camera Sticker */}
              {theme.showCameraStickers && (
                <div className="absolute -top-4 -right-4 hidden sm:block">
                  <CartoonCamera className="w-14 h-14" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2. SELECTED WORK (EDITORIAL ASYMMETRIC COMPOSITION) */}
      {getSection("selected-work") && (
        <section id="selected-work" className="max-w-7xl mx-auto px-6 sm:px-10 py-20 border-t" style={{ borderColor: palette.border }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: palette.accent }}>
                01 • Selected Work
              </span>
              <h2 className={`text-3xl sm:text-5xl font-light tracking-tight ${theme.headingFont}`}>
                {getSection("selected-work")?.title || "Selected Stories"}
              </h2>
              <p className="text-sm sm:text-base opacity-75">
                {getSection("selected-work")?.subtitle}
              </p>
            </div>

            {getSection("selected-work")?.customContent?.editorialQuote && (
              <div className="max-w-sm p-4 rounded-2xl border italic text-xs font-serif leading-relaxed opacity-85" style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}>
                &ldquo;{getSection("selected-work")?.customContent?.editorialQuote}&rdquo;
              </div>
            )}
          </div>

          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {featuredPosts.slice(0, 4).map((post, idx) => {
              // Create dynamic editorial layout rhythm
              const isLarge = idx === 0 || idx === 3;
              const colSpan = isLarge ? "md:col-span-7" : "md:col-span-5";
              const aspect = isLarge ? "aspect-[16/11]" : "aspect-[4/5]";

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`${colSpan} group cursor-pointer space-y-3`}
                  onClick={() => handleOpenLightbox(post)}
                >
                  <div className={`relative ${aspect} rounded-2xl overflow-hidden shadow-lg border transition-all duration-500 group-hover:shadow-2xl`} style={{ borderColor: palette.border }}>
                    <Image
                      src={post.mediaUrl}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Category pill on image */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-black/60 text-white backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-black px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md">
                      <span>View Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <p className="font-serif italic text-sm opacity-90 truncate max-w-[80%]">
                      {post.caption}
                    </p>
                    {post.exifData?.camera && (
                      <span className="font-mono text-[10px] opacity-60">
                        {post.exifData.camera}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. GALLERIES BY CATEGORY WITH INTERACTIVE FILTER */}
      {getSection("categories") && (
        <section id="categories" className="max-w-7xl mx-auto px-6 sm:px-10 py-20 border-t" style={{ borderColor: palette.border }}>
          <div className="space-y-4 mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: palette.accent }}>
              02 • Categorized Archives
            </span>
            <h2 className={`text-3xl sm:text-5xl font-light tracking-tight ${theme.headingFont}`}>
              {getSection("categories")?.title || "Galleries by Genre"}
            </h2>
            <p className="text-sm sm:text-base opacity-75">
              Automatically sorted from Instagram hashtags, captions & semantics.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {["All", ...site.categories.map((c) => c.name)].map((catName) => {
              const isActive = activeCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setActiveCategory(catName)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "text-white shadow-md scale-105"
                      : "opacity-70 hover:opacity-100 border"
                  }`}
                  style={{
                    backgroundColor: isActive ? palette.accent : palette.cardBg,
                    borderColor: palette.border,
                  }}
                >
                  {catName}
                </button>
              );
            })}
          </div>

          {/* Filtered Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => handleOpenLightbox(post)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all"
                  style={{
                    backgroundColor: palette.cardBg,
                    borderColor: palette.border,
                  }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={post.mediaUrl}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-black/70 text-white backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">
                      <p className="line-clamp-2 font-serif italic text-sm">
                        {post.caption}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] opacity-60">
                      {new Date(post.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1 opacity-75">
                      <Camera className="w-3.5 h-3.5" />
                      {post.exifData?.camera?.split(" ")[0] || "35mm"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* 4. ABOUT THE PHOTOGRAPHER */}
      {getSection("about") && (
        <section id="about" className="max-w-7xl mx-auto px-6 sm:px-10 py-24 border-t" style={{ borderColor: palette.border }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Image with Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border" style={{ borderColor: palette.border }}>
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Hand-drawn scribble accent */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block">
                <ScribbleCircle color={palette.accent} className="w-28 h-16" />
              </div>
            </div>

            {/* Narrative & Craft */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: palette.accent }}>
                03 • Approach & Biography
              </span>
              <h2 className={`text-3xl sm:text-5xl font-light tracking-tight ${theme.headingFont}`}>
                {getSection("about")?.title || "The Eye Behind the Lens"}
              </h2>

              <p className="text-base sm:text-lg leading-relaxed opacity-85 font-serif italic">
                &ldquo;{profile.extendedBio || profile.bio}&rdquo;
              </p>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t" style={{ borderColor: palette.border }}>
                <div>
                  <span className="block text-[11px] font-mono uppercase opacity-60">Base Location</span>
                  <span className="font-semibold text-sm">{profile.location}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono uppercase opacity-60">Primary Medium</span>
                  <span className="font-semibold text-sm">{profile.gearSummary || "Leica & Medium Format"}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono uppercase opacity-60">Instagram Sync</span>
                  <span className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">Automatic (24/7)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-white shadow-sm transition-transform active:scale-95"
                  style={{ backgroundColor: palette.accent }}
                >
                  Commission {profile.name}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. PRICING & SERVICE TIERS */}
      {getSection("pricing") && bookingSettings.serviceTiers.length > 0 && (
        <section id="pricing" className="max-w-7xl mx-auto px-6 sm:px-10 py-24 border-t" style={{ borderColor: palette.border }}>
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: palette.accent }}>
              04 • Collections & Investment
            </span>
            <h2 className={`text-3xl sm:text-5xl font-light tracking-tight ${theme.headingFont}`}>
              Investment & Deliverables
            </h2>
            <p className="text-sm sm:text-base opacity-75">
              Transparent collections designed for destinations, heirlooms, and intimate captures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bookingSettings.serviceTiers.map((tier, i) => (
              <div
                key={tier.id}
                className="rounded-3xl p-8 border flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: palette.cardBg,
                  borderColor: palette.border,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider opacity-60">
                      Tier 0{i + 1}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5">
                      {tier.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{tier.title}</h3>
                  <div className="text-3xl font-serif mb-4" style={{ color: palette.accent }}>
                    {tier.price}
                  </div>
                  <p className="text-xs opacity-75 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 text-xs opacity-85">
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  style={{ borderColor: palette.border }}
                >
                  Request Availability
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. BOOKING CALL-TO-ACTION */}
      {getSection("booking") && (
        <section id="booking" className="max-w-7xl mx-auto px-6 sm:px-10 py-24 border-t" style={{ borderColor: palette.border }}>
          <div
            className="rounded-3xl p-10 sm:p-16 text-center space-y-6 relative overflow-hidden border shadow-xl"
            style={{
              backgroundColor: palette.cardBg,
              borderColor: palette.border,
            }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border"
              style={{
                backgroundColor: `${palette.accent}15`,
                color: palette.accent,
                borderColor: `${palette.accent}33`,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Now Booking 2026/2027
            </span>

            <h2 className={`text-3xl sm:text-6xl font-light tracking-tight max-w-2xl mx-auto leading-tight ${theme.headingFont}`}>
              {bookingSettings.headline || "Have a story to tell?"}
            </h2>

            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto leading-relaxed">
              {bookingSettings.subheadline || "Let's create timeless heirloom imagery together."}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-white tracking-wide shadow-lg transition-transform active:scale-95"
                style={{ backgroundColor: palette.accent }}
              >
                {bookingSettings.buttonText || "Book a Session"}
              </button>

              <a
                href={`mailto:${bookingSettings.email}`}
                className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-medium border transition-colors flex items-center justify-center gap-2 hover:bg-black/5"
                style={{ borderColor: palette.border }}
              >
                <Mail className="w-4 h-4" />
                <span>{bookingSettings.email}</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 sm:px-10 py-12 border-t flex flex-col sm:flex-row items-center justify-between text-xs opacity-65 gap-4" style={{ borderColor: palette.border }}>
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} {profile.name}. All photographs copyrighted.</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Crafted with</span>
          <a
            href="/"
            className="font-bold hover:underline"
            style={{ color: palette.accent }}
          >
            Postfolio
          </a>
          <span>• Powered by Instagram Auto-Sync</span>
        </div>
      </footer>
    </div>
  );
};
