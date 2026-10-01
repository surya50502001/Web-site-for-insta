'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Instagram, Twitter, MessageSquare, ArrowUpRight, Scale, CheckCircle2 } from 'lucide-react';
import RightsModal from '../common/RightsModal';

export default function Footer() {
  const [isRightsModalOpen, setIsRightsModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-surface-black border-t-2 border-surface-border text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-surface-border">
            {/* Column 1: Brand & Manifesto */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-brand-neon rounded flex items-center justify-center font-display font-extrabold text-lg text-surface-black">
                  W
                </div>
                <span className="font-display font-extrabold text-2xl tracking-tighter">
                  WEAR<span className="text-brand-neon">GRAM</span>
                </span>
              </div>

              <p className="text-zinc-400 text-sm max-w-md leading-relaxed font-sans">
                Your favorite Instagram moments. Now you can wear them. 
                A creator-first commerce platform transforming authorized social culture into collectible heavyweight streetwear.
              </p>

              {/* Legal & Meta API Badge */}
              <div className="inline-flex items-center gap-2 p-2.5 bg-surface-card border border-surface-border rounded text-xs font-mono text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-brand-neon flex-shrink-0" />
                <span>OFFICIAL META GRAPH API INTEGRATION • ZERO UNAUTHORIZED SCRAPING</span>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div className="md:col-span-2 space-y-3 font-mono text-xs">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                EXPLORE
              </h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <Link href="/explore" className="hover:text-brand-neon transition-colors">
                    Featured Creators
                  </Link>
                </li>
                <li>
                  <Link href="/#drops" className="hover:text-brand-neon transition-colors">
                    Latest Drops
                  </Link>
                </li>
                <li>
                  <Link href="/#pipeline" className="hover:text-brand-neon transition-colors">
                    The 3D Pipeline
                  </Link>
                </li>
                <li>
                  <Link href="/creator-studio" className="hover:text-brand-neon transition-colors text-brand-orange">
                    Creator Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Garment Standards */}
            <div className="md:col-span-2 space-y-3 font-mono text-xs">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                SPECS
              </h4>
              <ul className="space-y-2 text-zinc-400">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
                  240 GSM Combed Cotton
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
                  DTG Ultra HD Pigment
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
                  Boxy Oversized Cut
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
                  Pre-shrunk Garment Wash
                </li>
              </ul>
            </div>

            {/* Column 4: Rights & Compliance */}
            <div className="md:col-span-3 space-y-3 font-mono text-xs">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-brand-neon" />
                RIGHTS & COMPLIANCE
              </h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                All designs on WearGram are explicitly authorized by authenticated creators. We respect intellectual property rights.
              </p>
              <button
                onClick={() => setIsRightsModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-brand-neon hover:underline font-bold"
              >
                File DMCA / Takedown Notice <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
            <div>
              © {new Date().getFullYear()} WEARGRAM INC. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-6">
              <span>CURRENCY: ₹ INR</span>
              <span>•</span>
              <button
                onClick={() => setIsRightsModalOpen(true)}
                className="hover:text-zinc-300 transition-colors"
              >
                Content Authorization Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Rights & DMCA Takedown Modal */}
      <RightsModal isOpen={isRightsModalOpen} onClose={() => setIsRightsModalOpen(false)} />
    </>
  );
}
