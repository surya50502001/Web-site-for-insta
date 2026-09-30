"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PortfolioSite } from "@/lib/types";
import { getStoredSite, simulateIncomingInstagramPost } from "@/lib/storage";
import { PortfolioRenderer } from "@/components/portfolio/PortfolioRenderer";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function PublicPortfolioPage() {
  const params = useParams();
  const [site, setSite] = useState<PortfolioSite | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read from client store
    const stored = getStoredSite();
    setSite(stored);
    setIsLoading(false);

    const handleSync = () => {
      setSite(getStoredSite());
    };
    window.addEventListener("postfolio_site_updated", handleSync);
    return () => window.removeEventListener("postfolio_site_updated", handleSync);
  }, [params]);

  if (isLoading || !site) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center font-serif text-lg text-stone-700">
        <div className="flex flex-col items-center gap-3">
          <span className="w-6 h-6 border-2 border-[#C28E5C] border-t-transparent rounded-full animate-spin" />
          <span>Curating portfolio from Instagram...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Floating owner bar if previewing/editing */}
      <div className="fixed bottom-4 right-4 z-40">
        <Link
          href="/editor"
          className="px-4 py-2 rounded-full bg-black/90 hover:bg-black text-white text-xs font-mono shadow-xl border border-white/20 flex items-center gap-2 backdrop-blur-md transition-transform hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Edit in Studio</span>
        </Link>
      </div>

      <PortfolioRenderer
        site={site}
        isEditorPreview={false}
        onSimulateNewPost={() => {
          simulateIncomingInstagramPost();
        }}
      />
    </div>
  );
}
