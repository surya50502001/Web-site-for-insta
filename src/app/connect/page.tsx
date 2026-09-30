"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Lock, Sparkles, Check, Info } from "lucide-react";
import { InstagramIcon } from "@/components/decorative/InstagramIcon";
import { OTHER_CREATORS } from "@/lib/mockData";
import { FloatingSticker, StampBadge } from "@/components/decorative/FloatingSticker";
import { HandDrawnArrow, ScribbleUnderline } from "@/components/decorative/HandDrawnArrow";

export default function ConnectPage() {
  const router = useRouter();
  const [handle, setHandle] = useState("elena.visuals");
  const [isConnecting, setIsConnecting] = useState(false);
  const [showMetaCredentials, setShowMetaCredentials] = useState(false);
  const [appId, setAppId] = useState("");
  const [appSecret, setAppSecret] = useState("");

  const handleStartConnect = (chosenHandle?: string) => {
    const targetHandle = chosenHandle || handle || "elena.visuals";
    setIsConnecting(true);
    setTimeout(() => {
      router.push(`/onboarding?handle=${encodeURIComponent(targetHandle)}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#141413] flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-stone-200 px-6 sm:px-10 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-xl bg-stone-900 text-white font-serif flex items-center justify-center font-bold text-base group-hover:bg-[#C28E5C] transition-colors">
            P
          </span>
          <span className="font-serif font-bold text-xl tracking-tight">Postfolio</span>
        </Link>

        <span className="text-xs font-mono opacity-60">Step 1 of 2: Connect Instagram</span>
      </header>

      {/* Main Connection Container */}
      <main className="max-w-2xl mx-auto px-6 py-12 w-full space-y-8">
        <div className="text-center space-y-3">
          <FloatingSticker
            text="Official Meta Graph API"
            emoji="🔒"
            rotation={-2}
            bg="#F5EFE6"
            borderColor="#DCD4C4"
            className="mx-auto"
          />

          <h1 className="text-3xl sm:text-5xl font-serif tracking-tight pt-2">
            Connect your Instagram
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Postfolio imports your photographs, captures captions, and builds an editorial portfolio that automatically updates when you post.
          </p>
        </div>

        {/* Primary Connection Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shrink-0">
              <InstagramIcon className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <div className="text-xs font-mono uppercase text-stone-500">Instagram Handle</div>
              <div className="flex items-center gap-1 font-mono font-bold text-stone-900 text-base">
                <span>@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.replace("@", ""))}
                  placeholder="your.handle"
                  className="bg-transparent focus:outline-none focus:underline w-full"
                />
              </div>
            </div>
          </div>

          {/* Permissions breakdown */}
          <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
            <span className="font-semibold text-stone-800 block text-[11px] font-mono uppercase">
              Permitted Official Scopes:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Read public photos & carousels</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Read captions & timestamps</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Receive new post webhook alerts</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>No posting/messaging rights required</span>
              </div>
            </div>
          </div>

          {/* Connect Button */}
          <button
            onClick={() => handleStartConnect()}
            disabled={isConnecting}
            className="w-full py-4 px-6 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isConnecting ? (
              <span className="flex items-center gap-2 font-mono">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authorizing with Meta...
              </span>
            ) : (
              <>
                <InstagramIcon className="w-4 h-4 text-amber-400" />
                <span>Connect & Generate Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Alternative Demo Sandbox Accounts */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Or try with an authentic photographer profile:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {OTHER_CREATORS.map((creator) => (
                <button
                  key={creator.username}
                  onClick={() => handleStartConnect(creator.username)}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-stone-400 hover:bg-stone-50 text-left transition-all"
                >
                  <div className="text-xs font-semibold truncate text-stone-900">{creator.name}</div>
                  <div className="text-[10px] font-mono text-stone-500 truncate">@{creator.username}</div>
                  <div className="text-[9px] text-amber-700 font-mono mt-1">{creator.role.split(" ")[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Developer / Live Meta App Credentials Toggle */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowMetaCredentials(!showMetaCredentials)}
            className="text-xs text-stone-500 hover:text-stone-800 underline font-mono"
          >
            {showMetaCredentials ? "Hide Meta Developer Settings" : "Configure Custom Meta App ID & Secret"}
          </button>

          {showMetaCredentials && (
            <div className="mt-4 p-5 rounded-2xl bg-white border border-stone-200 text-left text-xs space-y-3">
              <div className="font-semibold text-stone-800">Meta Developer API Configuration</div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">
                  Meta App ID (Client ID)
                </label>
                <input
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="e.g. 194829105820194"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-stone-500 mb-1">
                  Meta App Secret
                </label>
                <input
                  type="password"
                  value={appSecret}
                  onChange={(e) => setAppSecret(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 font-mono text-xs"
                />
              </div>
              <p className="text-[10px] text-stone-500">
                Postfolio is already configured with official OAuth redirect URIs and automatic token renewal.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-stone-200 text-xs text-stone-500">
        Postfolio &copy; {new Date().getFullYear()} • Official Meta Graph API Integration
      </footer>
    </div>
  );
}
