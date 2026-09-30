"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortfolioSite, SyncLogEntry } from "@/lib/types";
import {
  getStoredSite,
  getStoredSyncLogs,
  saveStoredSite,
  simulateIncomingInstagramPost,
  resetToDefaultSite,
} from "@/lib/storage";
import { InstagramIcon } from "@/components/decorative/InstagramIcon";
import {
  RefreshCw,
  ExternalLink,
  Edit3,
  Globe,
  CheckCircle,
  Copy,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Mail,
  Camera,
  RotateCcw,
  Check,
} from "lucide-react";
import { FloatingSticker, StampBadge } from "@/components/decorative/FloatingSticker";
import { HandDrawnArrow } from "@/components/decorative/HandDrawnArrow";
import confetti from "canvas-confetti";

export default function DashboardPage() {
  const [site, setSite] = useState<PortfolioSite | null>(null);
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSite(getStoredSite());
    setSyncLogs(getStoredSyncLogs());

    const handleUpdate = () => {
      setSite(getStoredSite());
      setSyncLogs(getStoredSyncLogs());
    };
    window.addEventListener("postfolio_site_updated", handleUpdate);
    window.addEventListener("postfolio_sync_logs_updated", handleUpdate);
    return () => {
      window.removeEventListener("postfolio_site_updated", handleUpdate);
      window.removeEventListener("postfolio_sync_logs_updated", handleUpdate);
    };
  }, []);

  if (!site) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const res = simulateIncomingInstagramPost();
      setIsSyncing(false);
      showToast("Auto-synced! 1 new photo imported & categorized into " + res.newPost.category);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }, 1200);
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/p/${site.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("Portfolio link copied to clipboard!");
  };

  const handleTogglePublish = () => {
    const updated = { ...site, published: !site.published };
    saveStoredSite(updated);
    setSite(updated);
    showToast(updated.published ? "Portfolio published live!" : "Portfolio taken offline.");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#141413]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121318] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 text-xs font-medium animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-xl bg-stone-900 text-white font-serif flex items-center justify-center font-bold text-base group-hover:bg-[#C28E5C] transition-colors">
                P
              </span>
              <span className="font-serif font-bold text-xl tracking-tight">Postfolio</span>
            </Link>

            <span className="hidden sm:inline text-xs font-mono px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              Photographer Studio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-2 transition-colors border border-stone-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing IG..." : "Sync Instagram Now"}</span>
            </button>

            <Link
              href="/editor"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1C1917] hover:bg-stone-800 text-white flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Visual Editor</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-10 space-y-10">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
                Welcome, {site.profile.name}
              </h1>
              <FloatingSticker
                text="Zero Maintenance Active"
                emoji="✨"
                rotation={2}
                bg="#F4EFE6"
                textColor="#292524"
                borderColor="#D6CEBE"
              />
            </div>
            <p className="text-sm text-stone-600">
              Your website automatically synchronizes every time you post on Instagram.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/p/${site.slug}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </Link>

            <button
              onClick={handleCopyUrl}
              className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>
          </div>
        </div>

        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1: Instagram Connection */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-5 h-5 text-rose-500" />
                <span className="font-semibold text-xs text-stone-800">Instagram Sync</span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Connected
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-bold font-mono tracking-tight">@{site.profile.username}</div>
              <p className="text-xs text-stone-500">
                {site.profile.postsCount} posts imported • Auto-syncing 24/7
              </p>
            </div>

            <div className="pt-2 text-[11px] font-mono text-stone-400 flex items-center gap-1.5 border-t border-stone-100">
              <Clock className="w-3 h-3" />
              <span>Last checked: {site.profile.lastSyncedAt}</span>
            </div>
          </div>

          {/* Card 2: Website Status & Theme */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-xs text-stone-800">Portfolio Status</span>
              </div>
              <button
                onClick={handleTogglePublish}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                  site.published
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-stone-100 text-stone-600 border-stone-200"
                }`}
              >
                {site.published ? "Published (Live)" : "Draft (Offline)"}
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-serif font-bold text-stone-900">
                {site.theme.colorPalette.name}
              </div>
              <p className="text-xs text-stone-500">
                Layout: {site.theme.heroLayout} • {site.sections.filter((s) => s.enabled).length} active sections
              </p>
            </div>

            <div className="pt-2 text-[11px] font-mono text-stone-500 flex items-center justify-between border-t border-stone-100">
              <span>Domain: {site.customDomain || `${site.slug}.postfolio.site`}</span>
              <Link href="/editor" className="text-amber-700 hover:underline">
                Customize &rarr;
              </Link>
            </div>
          </div>

          {/* Card 3: Client Inquiries */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-xs text-stone-800">Client Inquiries</span>
              </div>
              <span className="text-[11px] font-mono bg-stone-100 px-2 py-0.5 rounded-full text-stone-600">
                2 new requests
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-bold font-mono">Lake Como & Paris</div>
              <p className="text-xs text-stone-500">
                Latest from Clara M. (The Weekend Celebration)
              </p>
            </div>

            <div className="pt-2 text-[11px] font-mono text-stone-400 flex items-center gap-1.5 border-t border-stone-100">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>Inquiries auto-routed to {site.bookingSettings.email}</span>
            </div>
          </div>
        </div>

        {/* Visual Live Preview & Editor Launcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Preview Frame */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold">Live Portfolio Canvas</h3>
                <p className="text-xs text-stone-500">
                  Real-time rendering of your public website.
                </p>
              </div>

              <Link
                href="/editor"
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Launch Studio Editor</span>
              </Link>
            </div>

            {/* Embedded Mini-Viewport */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-50 aspect-[16/10] group">
              <div className="absolute inset-0 overflow-y-auto pointer-events-none transform scale-[0.6] origin-top-left w-[166.6%] h-[166.6%]">
                <div className="pointer-events-auto">
                  <Image
                    src={site.profile.coverUrl || site.posts[0]?.mediaUrl || ""}
                    alt="cover"
                    width={1600}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/40 transition-colors flex items-center justify-center">
                <Link
                  href="/editor"
                  className="opacity-0 group-hover:opacity-100 transition-opacity px-6 py-3 rounded-full bg-white text-stone-900 font-medium text-xs shadow-2xl flex items-center gap-2 transform group-hover:scale-105"
                >
                  <Edit3 className="w-4 h-4 text-amber-600" />
                  <span>Edit Layout, Typography & Categories</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
              <span>Public link: <strong className="text-stone-800 font-mono">/p/{site.slug}</strong></span>
              <span className="font-mono">Theme: {site.theme.colorPalette.name}</span>
            </div>
          </div>

          {/* Right: Sync Activity Feed & Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-stone-600" />
                  <h4 className="font-serif font-bold text-base">Automatic Sync Log</h4>
                </div>
                <span className="text-[10px] font-mono uppercase text-emerald-600 font-semibold">
                  Live Active
                </span>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {syncLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                      <span>{log.timestamp}</span>
                      <span className="uppercase text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                        {log.type}
                      </span>
                    </div>
                    <p className="text-stone-700 leading-snug">{log.message}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="w-full py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-800 flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                <span>Simulate New Instagram Post</span>
              </button>
            </div>

            {/* Reset / Demo Sandbox Helper */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-2">
              <div className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Zero-Maintenance Guarantee</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Postfolio is designed so you never need to log into a website builder again. Just keep posting to Instagram.
              </p>
              <button
                onClick={() => {
                  resetToDefaultSite();
                  setSite(getStoredSite());
                  showToast("Reset to default demonstration profile.");
                }}
                className="text-[11px] underline text-amber-700 hover:text-amber-900 font-mono"
              >
                Reset demo data
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
