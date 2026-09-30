"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PortfolioSite,
  ThemeStyle,
  HeroLayout,
  GalleryLayout,
  AnimationIntensity,
  InstagramPost,
} from "@/lib/types";
import { getStoredSite, saveStoredSite, simulateIncomingInstagramPost } from "@/lib/storage";
import { SAMPLE_THEMES } from "@/lib/mockData";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";
import {
  Layers,
  Type,
  Palette,
  Layout,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Globe,
  ArrowLeft,
  Check,
  RefreshCw,
  Sliders,
  DollarSign,
  User,
  Image as ImageIcon,
  Copy,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";

type LeftTab = "sections" | "typography" | "colors" | "layout" | "animations";
type RightTab = "profile" | "featured" | "pricing" | "publish";

export default function EditorPage() {
  const [site, setSite] = useState<PortfolioSite | null>(null);
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab>("sections");
  const [activeRightTab, setActiveRightTab] = useState<RightTab>("profile");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [publishedNotice, setPublishedNotice] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    const loaded = getStoredSite();
    setSite(loaded);

    const handleUpdate = () => {
      setSite(getStoredSite());
    };
    window.addEventListener("postfolio_site_updated", handleUpdate);
    return () => window.removeEventListener("postfolio_site_updated", handleUpdate);
  }, []);

  if (!site) {
    return (
      <div className="min-h-screen bg-[#0E0F12] text-white flex items-center justify-center font-mono text-sm">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Opening Postfolio Visual Studio...</span>
        </div>
      </div>
    );
  }

  const updateSite = (newSite: PortfolioSite) => {
    setSaveStatus("saving");
    setSite(newSite);
    saveStoredSite(newSite);
    setTimeout(() => setSaveStatus("saved"), 300);
  };

  const handleToggleSection = (id: string) => {
    const updatedSections = site.sections.map((sec) =>
      sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
    );
    updateSite({ ...site, sections: updatedSections });
  };

  const handleApplyTheme = (themeKey: string) => {
    const targetTheme = SAMPLE_THEMES[themeKey];
    if (targetTheme) {
      updateSite({
        ...site,
        theme: {
          ...site.theme,
          ...targetTheme,
        },
      });
    }
  };

  const handleToggleFeaturedPost = (postId: string) => {
    const updatedPosts = site.posts.map((p) =>
      p.id === postId ? { ...p, isFeatured: !p.isFeatured } : p
    );
    updateSite({ ...site, posts: updatedPosts });
  };

  const handlePublish = () => {
    updateSite({ ...site, published: true });
    setPublishedNotice(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (e) {}
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/p/${site.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSimulateSync = () => {
    simulateIncomingInstagramPost();
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0C0D10] text-[#E4E4E7] overflow-hidden select-none">
      {/* 1. TOP STUDIO BAR */}
      <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between shrink-0 bg-[#121318]">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <div className="h-4 w-px bg-white/15" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white tracking-wide">
              {site.profile.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              /{site.slug}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{saveStatus === "saved" ? "Changes Saved" : "Saving..."}</span>
          </div>
        </div>

        {/* Center: Responsive Viewport Switcher */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewportMode("desktop")}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
              viewportMode === "desktop"
                ? "bg-white/20 text-white font-medium"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode("tablet")}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
              viewportMode === "tablet"
                ? "bg-white/20 text-white font-medium"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode("mobile")}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
              viewportMode === "mobile"
                ? "bg-white/20 text-white font-medium"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateSync}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 flex items-center gap-1.5 transition-colors"
            title="Simulate a new Instagram post being automatically ingested"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simulate IG Post</span>
          </button>

          <Link
            href={`/p/${site.slug}`}
            target="_blank"
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live View</span>
          </Link>

          <button
            onClick={handlePublish}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* Published Celebration Banner Modal */}
      {publishedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#18191E] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white">Your Portfolio is Live!</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Every photograph you publish on Instagram will automatically appear on your website without any extra steps.
            </p>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="truncate">{window.location.origin}/p/{site.slug}</span>
              <button
                onClick={handleCopyLink}
                className="ml-2 text-amber-400 hover:text-amber-300 shrink-0 flex items-center gap-1"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="flex gap-2 pt-2">
              <Link
                href={`/p/${site.slug}`}
                target="_blank"
                className="flex-1 py-2.5 rounded-xl bg-white text-black font-semibold text-xs text-center hover:bg-zinc-200"
              >
                Open Public Website
              </Link>
              <button
                onClick={() => setPublishedNotice(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. THREE-PANE MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANE: CONTROLS & STYLES (280px) */}
        <aside className="w-72 border-r border-white/10 bg-[#121318] flex flex-col shrink-0">
          {/* Tab selector bar */}
          <div className="flex items-center justify-around border-b border-white/10 p-1.5 bg-[#0F1014]">
            {[
              { id: "sections", label: "Sections", icon: Layers },
              { id: "typography", label: "Type", icon: Type },
              { id: "colors", label: "Colors", icon: Palette },
              { id: "layout", label: "Layout", icon: Layout },
              { id: "animations", label: "Motion", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeLeftTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLeftTab(tab.id as LeftTab)}
                  className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 transition-colors ${
                    isActive
                      ? "bg-white/15 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px]">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Left Tab Contents */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
            {/* SECTIONS TAB */}
            {activeLeftTab === "sections" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Website Sections
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Toggle or customize visible portfolio modules.
                  </p>
                </div>

                <div className="space-y-2">
                  {site.sections.map((sec) => (
                    <div
                      key={sec.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium text-white block capitalize">
                          {sec.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          Type: {sec.type}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleSection(sec.id)}
                        className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                          sec.enabled ? "bg-amber-500" : "bg-zinc-700"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            sec.enabled ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TYPOGRAPHY TAB */}
            {activeLeftTab === "typography" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Editorial Typography
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Curated typeface pairings for fine art & photography.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      name: "Editorial Serif & Clean Sans",
                      heading: "font-editorial",
                      body: "font-sans",
                      desc: "Playfair Display + Plus Jakarta",
                    },
                    {
                      name: "Classic Italian & Heirloom",
                      heading: "font-serif",
                      body: "font-sans",
                      desc: "Cormorant Garamond + Plus Jakarta",
                    },
                    {
                      name: "Contemporary Neo-Grotesk",
                      heading: "font-display",
                      body: "font-sans",
                      desc: "Space Grotesk + Plus Jakarta",
                    },
                    {
                      name: "Modern Minimal Sans",
                      heading: "font-sans",
                      body: "font-sans",
                      desc: "Plus Jakarta Bold + Regular",
                    },
                  ].map((preset, idx) => {
                    const isSelected = site.theme.headingFont === preset.heading;
                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          updateSite({
                            ...site,
                            theme: {
                              ...site.theme,
                              headingFont: preset.heading,
                              primaryFont: preset.body,
                            },
                          })
                        }
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-amber-400 bg-amber-400/10 text-white"
                            : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25"
                        }`}
                      >
                        <div className="font-semibold text-xs">{preset.name}</div>
                        <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                          {preset.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* COLORS TAB */}
            {activeLeftTab === "colors" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Color Palettes
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Design studio-crafted palettes for photography.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {Object.entries(SAMPLE_THEMES).map(([key, t]) => {
                    const isSelected = site.theme.colorPalette.name === t.colorPalette.name;
                    return (
                      <button
                        key={key}
                        onClick={() => handleApplyTheme(key)}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-amber-400 bg-amber-400/10 text-white"
                            : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-xs">{t.colorPalette.name}</span>
                          <span className="text-[10px] font-mono uppercase opacity-50">{key}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full border border-black/20"
                            style={{ backgroundColor: t.colorPalette.background }}
                          />
                          <span
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: t.colorPalette.foreground }}
                          />
                          <span
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: t.colorPalette.accent }}
                          />
                          <span
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: t.colorPalette.cardBg }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LAYOUT TAB */}
            {activeLeftTab === "layout" && (
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Hero Section Layout
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { id: "fullscreen", label: "Split Editorial" },
                      { id: "asymmetric", label: "Asymmetric" },
                      { id: "minimal-center", label: "Minimalist" },
                    ].map((h) => (
                      <button
                        key={h.id}
                        onClick={() =>
                          updateSite({
                            ...site,
                            theme: { ...site.theme, heroLayout: h.id as HeroLayout },
                          })
                        }
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          site.theme.heroLayout === h.id
                            ? "border-amber-400 bg-amber-400/10 text-white"
                            : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span className="text-[11px] font-medium">{h.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Gallery Composition
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { id: "editorial-grid", label: "Editorial Grid" },
                      { id: "masonry", label: "Masonry Story" },
                      { id: "balanced", label: "Balanced 3-Col" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() =>
                          updateSite({
                            ...site,
                            theme: { ...site.theme, galleryLayout: g.id as GalleryLayout },
                          })
                        }
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          site.theme.galleryLayout === g.id
                            ? "border-amber-400 bg-amber-400/10 text-white"
                            : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span className="text-[11px] font-medium">{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ANIMATIONS & PLAYFUL ELEMENTS TAB */}
            {activeLeftTab === "animations" && (
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Motion & Personality
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Subtle cartoon-inspired accents and smooth transitions.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Camera Stickers & Accents</span>
                      <span className="text-[10px] text-zinc-500">Playful Leica camera sticker</span>
                    </div>
                    <button
                      onClick={() =>
                        updateSite({
                          ...site,
                          theme: {
                            ...site.theme,
                            showCameraStickers: !site.theme.showCameraStickers,
                          },
                        })
                      }
                      className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                        site.theme.showCameraStickers ? "bg-amber-500" : "bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          site.theme.showCameraStickers ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Auto-Sync Live Banner</span>
                      <span className="text-[10px] text-zinc-500">Shows @{site.profile.username} connection</span>
                    </div>
                    <button
                      onClick={() =>
                        updateSite({
                          ...site,
                          theme: {
                            ...site.theme,
                            showInstagramBadge: !site.theme.showInstagramBadge,
                          },
                        })
                      }
                      className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                        site.theme.showInstagramBadge ? "bg-amber-500" : "bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          site.theme.showInstagramBadge ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER PANE: LIVE RESPONSIVE CANVAS PREVIEW */}
        <main className="flex-1 bg-[#0A0B0E] p-4 sm:p-6 overflow-y-auto flex items-start justify-center">
          <div
            className={`transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border border-white/10 ${
              viewportMode === "desktop"
                ? "w-full max-w-7xl min-h-[90vh]"
                : viewportMode === "tablet"
                ? "w-[768px] min-h-[90vh]"
                : "w-[385px] min-h-[85vh]"
            }`}
          >
            <PortfolioRenderer
              site={site}
              isEditorPreview={true}
              onSimulateNewPost={handleSimulateSync}
            />
          </div>
        </main>

        {/* RIGHT PANE: CONTEXTUAL INSPECTOR & SETTINGS (300px) */}
        <aside className="w-80 border-l border-white/10 bg-[#121318] flex flex-col shrink-0">
          {/* Header tabs */}
          <div className="flex items-center justify-around border-b border-white/10 p-1.5 bg-[#0F1014]">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "featured", label: "Featured", icon: ImageIcon },
              { id: "pricing", label: "Services", icon: DollarSign },
              { id: "publish", label: "Publish", icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeRightTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id as RightTab)}
                  className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 transition-colors ${
                    isActive
                      ? "bg-white/15 text-white font-medium"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px]">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
            {/* PROFILE SETTINGS */}
            {activeRightTab === "profile" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Photographer Details
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Synced from Instagram, editable anytime.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 font-mono uppercase mb-1">
                      Photographer Name
                    </label>
                    <input
                      type="text"
                      value={site.profile.name}
                      onChange={(e) =>
                        updateSite({
                          ...site,
                          profile: { ...site.profile, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 font-mono uppercase mb-1">
                      Tagline / Specialty
                    </label>
                    <input
                      type="text"
                      value={site.profile.tagline}
                      onChange={(e) =>
                        updateSite({
                          ...site,
                          profile: { ...site.profile, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 font-mono uppercase mb-1">
                      Short Bio
                    </label>
                    <textarea
                      rows={3}
                      value={site.profile.bio}
                      onChange={(e) =>
                        updateSite({
                          ...site,
                          profile: { ...site.profile, bio: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 font-mono uppercase mb-1">
                      Base Location
                    </label>
                    <input
                      type="text"
                      value={site.profile.location}
                      onChange={(e) =>
                        updateSite({
                          ...site,
                          profile: { ...site.profile, location: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 font-mono uppercase mb-1">
                      Camera & Lens Craft
                    </label>
                    <input
                      type="text"
                      value={site.profile.gearSummary || ""}
                      onChange={(e) =>
                        updateSite({
                          ...site,
                          profile: { ...site.profile, gearSummary: e.target.value },
                        })
                      }
                      placeholder="e.g. Leica M11 • Hasselblad • 35mm Film"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FEATURED POSTS SELECTOR */}
            {activeRightTab === "featured" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Selected Work Reel
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Choose which Instagram posts are showcased in the top hero & selected work section.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {site.posts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleToggleFeaturedPost(post.id)}
                      className={`p-2 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                        post.isFeatured
                          ? "border-amber-400/80 bg-amber-400/10 text-white"
                          : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.thumbnailUrl || post.mediaUrl}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase block text-amber-400 truncate">
                          {post.category}
                        </span>
                        <p className="text-xs text-zinc-200 truncate">{post.caption}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          post.isFeatured
                            ? "bg-amber-500 border-amber-500 text-black"
                            : "border-zinc-600"
                        }`}
                      >
                        {post.isFeatured && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES & PRICING PACKAGES */}
            {activeRightTab === "pricing" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Investment Packages
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Present your pricing collections with clarity.
                  </p>
                </div>

                <div className="space-y-3">
                  {site.bookingSettings.serviceTiers.map((tier, idx) => (
                    <div key={tier.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-xs">{tier.title}</span>
                        <span className="font-mono text-amber-400 text-xs">{tier.price}</span>
                      </div>
                      <input
                        type="text"
                        value={tier.price}
                        onChange={(e) => {
                          const updated = [...site.bookingSettings.serviceTiers];
                          updated[idx].price = e.target.value;
                          updateSite({
                            ...site,
                            bookingSettings: {
                              ...site.bookingSettings,
                              serviceTiers: updated,
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                        placeholder="Price"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PUBLISH & DOMAIN SETTINGS */}
            {activeRightTab === "publish" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider mb-1">
                    Publishing & Domain
                  </h4>
                  <p className="text-zinc-400 text-[11px]">
                    Your zero-maintenance public portfolio URL.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">Postfolio URL</span>
                    <div className="text-xs font-mono text-white truncate">
                      {typeof window !== "undefined" ? window.location.origin : ""}/p/{site.slug}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl ? "Link Copied" : "Copy Live Link"}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">Custom Domain</span>
                    <input
                      type="text"
                      value={site.customDomain || ""}
                      onChange={(e) =>
                        updateSite({ ...site, customDomain: e.target.value })
                      }
                      placeholder="e.g. yourname.com"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <p className="text-[10px] text-zinc-500">
                      Point a CNAME record to <code className="text-zinc-300">cname.postfolio.site</code>
                    </p>
                  </div>

                  <button
                    onClick={handlePublish}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Publish Changes Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
