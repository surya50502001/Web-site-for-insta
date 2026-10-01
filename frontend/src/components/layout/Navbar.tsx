'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { ShoppingBag, Sparkles, Instagram, Flame, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { items, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'EXPLORE CREATORS', href: '/explore' },
    { label: 'HOW IT WORKS', href: '/#pipeline' },
    { label: 'CREATOR STUDIO', href: '/creator-studio', badge: 'CREATORS' },
  ];

  return (
    <>
      {/* Top Streetwear Ticker Marquee */}
      <div className="w-full bg-brand-neon text-surface-black py-1 overflow-hidden font-mono text-[11px] font-bold tracking-widest uppercase border-b border-surface-black">
        <div className="flex animate-marquee whitespace-nowrap gap-8">
          <span>★ OFFICIAL INSTAGRAM CREATOR MERCHANDISE</span>
          <span>• 240 GSM HEAVYWEIGHT FRENCH TERRY</span>
          <span>★ DIRECT-TO-GARMENT ULTRA HD PRINTING</span>
          <span>• CREATOR-AUTHORIZED CONTENT ONLY</span>
          <span>★ WORLDWIDE DISPATCH WITHIN 48 HOURS</span>
          <span>• ZERO INVENTORY RISK FOR CREATORS</span>
          <span>★ OFFICIAL INSTAGRAM CREATOR MERCHANDISE</span>
          <span>• 240 GSM HEAVYWEIGHT FRENCH TERRY</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-surface-black/90 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-brand-neon rounded flex items-center justify-center font-display font-extrabold text-xl text-surface-black shadow-tactile-sm group-hover:rotate-6 transition-transform">
              W
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tighter leading-none group-hover:text-brand-neon transition-colors">
                WEAR<span className="text-brand-neon">GRAM</span>
              </span>
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                WEARABLE CULTURE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-mono font-bold tracking-wider transition-colors flex items-center gap-1.5 ${
                    isActive ? 'text-brand-neon' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-brand-orange text-white rounded font-mono font-bold uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-3">
            <Link
              href="/creator-studio"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-surface-card hover:bg-surface-panel border border-surface-border text-white text-xs font-mono font-bold transition-all hover:border-brand-neon"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>CONNECT IG</span>
            </Link>

            <button
              onClick={openCart}
              className="relative p-2.5 bg-surface-card hover:bg-brand-neon hover:text-surface-black border border-surface-border text-white rounded transition-all shadow-tactile-sm active:scale-95 flex items-center gap-2"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono font-bold hidden sm:inline">BAG</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-mono font-bold flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-black border-b border-surface-border px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-mono font-bold text-zinc-300 hover:text-brand-neon py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/creator-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 bg-brand-neon text-surface-black font-display font-bold text-xs uppercase rounded"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              CONNECT INSTAGRAM ACCOUNT
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
