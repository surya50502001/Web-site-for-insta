"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Sparkles, ArrowRight, Camera, Palette, Layers } from "lucide-react";
import { InstagramIcon } from "@/components/decorative/InstagramIcon";
import { motion } from "framer-motion";
import { OTHER_CREATORS, SAMPLE_THEMES } from "@/lib/mockData";
import { saveStoredSite, getStoredSite } from "@/lib/storage";
import confetti from "canvas-confetti";

interface StepItem {
  id: number;
  label: string;
  detail: string;
  icon: any;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    label: "Reading your profile...",
    detail: "Importing bio, high-res avatar, and Instagram follower metrics",
    icon: InstagramIcon,
  },
  {
    id: 2,
    label: "Finding your best work...",
    detail: "Analyzing 428 photographs, high engagement highlights & EXIF metadata",
    icon: Camera,
  },
  {
    id: 3,
    label: "Organizing your gallery...",
    detail: "Grouping into Weddings, Pre-Weddings, Portraits, Events & Candid stories",
    icon: Layers,
  },
  {
    id: 4,
    label: "Designing your layout...",
    detail: "Pairing editorial serif typography with luxury warm paper palette",
    icon: Palette,
  },
  {
    id: 5,
    label: "Your website is ready.",
    detail: "Auto-sync configured: zero maintenance required going forward",
    icon: Sparkles,
  },
];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleParam = searchParams.get("handle") || "elena.visuals";

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Step progression
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsComplete(true);
          try {
            confetti({
              particleCount: 90,
              spread: 80,
              origin: { y: 0.6 },
            });
          } catch (e) {}
          return prev;
        }
      });
    }, 1100);

    return () => clearInterval(timer);
  }, []);

  const handleFinish = () => {
    // Configure site for the chosen handle
    const site = getStoredSite();
    if (handleParam !== "elena.visuals") {
      const match = OTHER_CREATORS.find((c) => c.username === handleParam);
      if (match) {
        site.profile.username = match.username;
        site.profile.name = match.name;
        site.profile.tagline = match.role;
        site.profile.location = match.location;
        site.profile.avatarUrl = match.avatar;
        site.profile.coverUrl = match.cover;
        site.slug = match.username.replace(".", "-");
        site.title = `${match.name} — Photography`;
        if (match.style && SAMPLE_THEMES[match.style]) {
          site.theme = SAMPLE_THEMES[match.style];
        }
        saveStoredSite(site);
      }
    }
    router.push("/editor");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#141413] flex flex-col justify-between p-6 sm:p-12">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-stone-900 text-white font-serif flex items-center justify-center font-bold text-base">
            P
          </span>
          <span className="font-serif font-bold text-xl tracking-tight">Postfolio</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <span>@{handleParam}</span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold">Authorized</span>
        </div>
      </header>

      {/* Center Generation Card */}
      <main className="max-w-2xl mx-auto w-full my-auto py-10 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C28E5C]">
            Postfolio Studio Engine
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-tight">
            Curating your photography website
          </h1>
          <p className="text-stone-600 text-sm">
            Turning your Instagram archive into an editorial portfolio.
          </p>
        </div>

        {/* Steps Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
          <div className="space-y-4">
            {STEPS.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isPending = idx > currentStepIndex;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-4 p-3.5 rounded-2xl transition-all ${
                    isCurrent
                      ? "bg-amber-50/60 border border-amber-200"
                      : isPast
                      ? "bg-stone-50/60 border border-stone-100"
                      : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isPast
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-stone-900 text-amber-400"
                        : "bg-stone-200 text-stone-500"
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-900">
                        {step.label}
                      </span>
                      {isPast && (
                        <span className="text-[10px] font-mono text-emerald-600 uppercase">
                          Complete
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-amber-700 uppercase animate-pulse">
                          Processing...
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">{step.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action button once complete */}
          <div className="pt-2">
            {isComplete ? (
              <button
                onClick={handleFinish}
                className="w-full py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.99]"
              >
                <span>Enter Visual Studio</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            ) : (
              <div className="w-full py-3 text-center text-xs font-mono text-stone-400">
                Please wait a moment while we organize your portfolio...
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-stone-400 font-mono">
        Zero maintenance • Automatically updates when you post on Instagram
      </footer>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center font-mono text-sm text-stone-600">
          <span>Loading Postfolio Studio...</span>
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
