"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, RefreshCw, CheckCircle2, Heart, Camera } from "lucide-react";
import { InstagramIcon } from "../decorative/InstagramIcon";
import { FloatingSticker, StampBadge } from "../decorative/FloatingSticker";
import { HandDrawnArrow, ScribbleUnderline } from "../decorative/HandDrawnArrow";

export const TransformationHero: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"before" | "after">("after");

  const samplePhotos = [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      tag: "Weddings",
      likes: "1.4k",
    },
    {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      tag: "Portraits",
      likes: "3.4k",
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      tag: "Weddings",
      likes: "2.1k",
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      tag: "Pre-Weddings",
      likes: "1.8k",
    },
    {
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
      tag: "Events",
      likes: "2.7k",
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
      tag: "Candid",
      likes: "3.1k",
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16">
      {/* Transformation Mode Toggle Bar */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="bg-stone-200/80 p-1.5 rounded-2xl flex items-center gap-1 border border-stone-300 shadow-sm backdrop-blur-sm">
          <button
            onClick={() => setActiveMode("before")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeMode === "before"
                ? "bg-white text-stone-900 shadow-md scale-102"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
            <span>Raw Instagram Profile</span>
          </button>

          <button
            onClick={() => setActiveMode("after")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeMode === "after"
                ? "bg-stone-900 text-white shadow-md scale-102"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Transformed Website (Postfolio)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-serif italic text-stone-500">
          <HandDrawnArrow variant="pointer-left" color="#C28E5C" className="w-8 h-6" />
          <span>Click to see transformation</span>
        </div>
      </div>

      {/* Main Animated Canvas Container */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-2xl bg-white min-h-[520px] transition-all duration-500">
        <AnimatePresence mode="wait">
          {activeMode === "before" ? (
            /* BEFORE: INSTAGRAM APP VIEW */
            <motion.div
              key="before"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10 max-w-xl mx-auto space-y-6"
            >
              {/* Fake Instagram Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="font-bold text-sm tracking-tight">elena.visuals</span>
                <span className="text-xs text-stone-400 font-mono">Instagram App</span>
              </div>

              {/* Profile Details */}
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400"
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 flex justify-around text-center text-xs">
                  <div>
                    <span className="font-bold block text-sm">428</span>
                    <span className="text-stone-500 text-[11px]">posts</span>
                  </div>
                  <div>
                    <span className="font-bold block text-sm">28.4k</span>
                    <span className="text-stone-500 text-[11px]">followers</span>
                  </div>
                  <div>
                    <span className="font-bold block text-sm">684</span>
                    <span className="text-stone-500 text-[11px]">following</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="text-xs space-y-1">
                <div className="font-bold">Elena Rostova • Photographer</div>
                <p className="text-stone-600">
                  Destination Wedding & Editorial. Lake Como & Paris. Available worldwide.
                </p>
                <div className="text-blue-600 font-medium">linktr.ee/elena_rostova</div>
              </div>

              {/* 3x3 Grid */}
              <div className="grid grid-cols-3 gap-1.5 pt-2">
                {samplePhotos.map((p, idx) => (
                  <div key={idx} className="relative aspect-square rounded-sm overflow-hidden bg-stone-100 group">
                    <Image src={p.url} alt="ig post" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1">
                      <Heart className="w-3 h-3 fill-white" />
                      <span>{p.likes}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-stone-100 rounded-xl text-center text-xs text-stone-500">
                Notice: Flat 3x3 grid, zero storytelling context, hard for couples to book high-ticket weddings.
              </div>
            </motion.div>
          ) : (
            /* AFTER: POSTFOLIO EDITORIAL WEBSITE VIEW */
            <motion.div
              key="after"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FCFAF6] text-[#121211] p-6 sm:p-12 space-y-10"
            >
              {/* Site Header */}
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                    Elena Rostova
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#C28E5C]">
                    Lake Como &bull; Paris &bull; Worldwide
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Instagram Auto-Sync
                  </span>

                  <span className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#C28E5C] shadow-sm">
                    Book a Session
                  </span>
                </div>
              </div>

              {/* Asymmetrical Editorial Composition */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                    Editorial Stories • 35mm & Medium Format
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif leading-tight">
                    &ldquo;Preserving quiet intimacy and European light that will outlive us all.&rdquo;
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    Unstaged destination weddings documented across heritage villas and intimate coasts. Automatically imported from @elena.visuals.
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    {["Weddings", "Pre-Weddings", "Portraits", "Candid"].map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 rounded-full text-[11px] font-mono border border-stone-300 bg-white text-stone-800"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800"
                    alt="editorial hero"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/60 backdrop-blur-md rounded-xl text-white text-xs">
                    <span className="font-mono text-[10px] text-amber-300 block uppercase">
                      Leica M11 • Lake Como
                    </span>
                    <span className="font-serif italic truncate block">Sofia & Mateo Vows</span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Micro-Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/80">
                {samplePhotos.slice(1, 4).map((p, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                    <Image src={p.url} alt="gallery sample" fill className="object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white rounded text-[10px] font-mono">
                      {p.tag}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
