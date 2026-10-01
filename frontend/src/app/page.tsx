'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Hero3DViewer from '@/components/3d/Hero3DViewer';
import TShirtCanvas from '@/components/3d/TShirtCanvas';
import { MOCK_CREATORS, MOCK_PRODUCTS } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Instagram, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Cpu, 
  Zap, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const { addItem } = useCart();
  const [activeCreatorTab, setActiveCreatorTab] = useState(MOCK_CREATORS[0].id);

  // Creator revenue calculator state
  const [followerCount, setFollowerCount] = useState(75000);
  const [avgShirtPrice, setAvgShirtPrice] = useState(799);
  const [conversionRate, setConversionRate] = useState(1.2); // 1.2% buy rate

  // Calculate projected creator earnings
  const estimatedBuyers = Math.round((followerCount * (conversionRate / 100)));
  const baseCost = 350;
  const gatewayFee = Math.round(avgShirtPrice * 0.02 + 3);
  const grossMargin = Math.max(0, avgShirtPrice - (baseCost + gatewayFee));
  const platformFee = Math.round(grossMargin * 0.12);
  const netPool = grossMargin - platformFee;
  const creatorPerShirt = Math.round(netPool * 0.70);
  const totalProjectedEarnings = estimatedBuyers * creatorPerShirt;

  const currentTabProduct = MOCK_PRODUCTS.find((p) => p.creatorId === activeCreatorTab) || MOCK_PRODUCTS[0];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-neon/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
          {/* Streetwear Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-surface-border rounded-full text-xs font-mono text-zinc-300 shadow-tactile-sm">
            <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
            <span className="font-bold text-white tracking-wider">OFFICIAL CREATOR MERCHANDISE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-brand-neon font-bold">META API AUTHORIZED</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            If you love their content, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-white to-brand-neon">
              wear it.
            </span>
          </h1>

          {/* Alternative supporting copy */}
          <p className="text-base sm:text-xl text-zinc-300 font-sans max-w-2xl mx-auto font-normal leading-relaxed">
            Turn your favorite Instagram moments into merchandise. Real-time 3D garments, 240 GSM heavyweight cotton, direct creator revenue.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/creator-studio"
              className="btn-streetwear-primary text-sm sm:text-base py-3 px-7"
            >
              CREATE YOUR MERCH <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/explore"
              className="btn-streetwear-secondary text-sm sm:text-base py-3 px-7"
            >
              EXPLORE CREATORS
            </Link>
          </div>
        </div>

        {/* HERO 3D T-SHIRT VIEWER & TRANSFORMATION HOOK */}
        <div className="relative mt-8">
          <Hero3DViewer />
        </div>
      </section>

      {/* 2. CREATOR SPOTLIGHT & LIVE 3D DROP SELECTOR */}
      <section id="drops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-surface-border gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-neon font-mono text-xs font-bold uppercase mb-1">
              <Flame className="w-4 h-4 text-brand-orange" />
              HOT VIRAL DROPS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase">
              FEATURED CREATOR MERCH
            </h2>
          </div>

          {/* Creator Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {MOCK_CREATORS.slice(0, 3).map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCreatorTab(c.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-2 border ${
                  activeCreatorTab === c.id
                    ? 'bg-brand-neon text-surface-black border-brand-neon shadow-tactile-sm'
                    : 'bg-surface-card text-zinc-400 border-surface-border hover:text-white'
                }`}
              >
                <span>@{c.username}</span>
                {c.isVerified && <CheckCircle2 className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Active Creator Showcase Card */}
        <div className="bg-surface-card border-2 border-surface-border rounded-lg overflow-hidden shadow-tactile grid grid-cols-1 lg:grid-cols-12">
          {/* Left: 3D Product Interactive Stage */}
          <div className="lg:col-span-7 bg-surface-black p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-surface-border relative">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="sticker-tag bg-brand-neon text-surface-black">
                {currentTabProduct.salesCount} UNITS ORDERED
              </span>
              <span className="text-zinc-400">360° INTERACTIVE PREVIEW</span>
            </div>

            <div className="h-[380px] my-2">
              <TShirtCanvas
                graphicUrl={currentTabProduct.defaultArtworkUrl}
                shirtColor={currentTabProduct.availableColors[0]}
                size="L"
                className="w-full h-full"
                interactive={true}
                autoRotate={false}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-3 border-t border-surface-border">
              <span>DRAG TO ROTATE 3D SHIRT</span>
              <span className="text-white font-bold">{currentTabProduct.fabricSpec.split(',')[0]}</span>
            </div>
          </div>

          {/* Right: Creator Bio & Drop Details */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentTabProduct.creator?.profilePicUrl}
                  alt="Creator Avatar"
                  className="w-12 h-12 rounded-full border-2 border-brand-neon object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-lg text-white">
                      @{currentTabProduct.creator?.username}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    {currentTabProduct.creator?.followerCount.toLocaleString()} Instagram Followers
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 font-sans italic border-l-2 border-brand-neon pl-3 py-1">
                "{currentTabProduct.creator?.bio}"
              </p>

              <div>
                <h4 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
                  {currentTabProduct.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {currentTabProduct.description}
                </p>
              </div>

              {/* Design options count */}
              <div className="p-3 bg-surface-black border border-surface-border rounded space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase font-bold block">
                  AVAILABLE DESIGNS ({currentTabProduct.designs.length}):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {currentTabProduct.designs.map((d) => (
                    <div
                      key={d.id}
                      className="p-2 bg-surface-panel rounded border border-white/5 flex items-center gap-2"
                    >
                      <div className="w-7 h-7 rounded overflow-hidden flex-shrink-0">
                        <img src={d.graphicUrl} alt={d.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-mono text-white truncate">{d.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-surface-border flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 block">RETAIL PRICE</span>
                <span className="font-display font-extrabold text-3xl text-brand-neon">
                  ₹{currentTabProduct.basePrice}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/product/${currentTabProduct.id}`}
                  className="btn-streetwear-primary py-3 px-5 text-xs"
                >
                  CUSTOMIZE & BUY <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTENT → MERCH PIPELINE EXPLAINER */}
      <section id="pipeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="sticker-tag bg-brand-neon text-surface-black font-bold">
            THE ARCHITECTURE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            HOW CONTENT BECOMES CULTURE
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            From viral Reel or iconic photo to physically manufactured streetwear in 6 seamless steps.
          </p>
        </div>

        {/* Pipeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
          {[
            {
              step: '01',
              title: 'CONNECT IG',
              desc: 'Official Meta Graph OAuth. Creator authorizes media with zero scraping.',
              icon: Instagram,
              color: 'text-pink-500',
            },
            {
              step: '02',
              title: 'EXTRACT ASSETS',
              desc: 'Select posts, Reels, or scrub video frames at 300 DPI high-definition.',
              icon: Cpu,
              color: 'text-brand-neon',
            },
            {
              step: '03',
              title: 'STENCIL STUDIO',
              desc: 'Apply vintage streetwear filters, halftone screenprints, or stickers.',
              icon: Layers,
              color: 'text-brand-orange',
            },
            {
              step: '04',
              title: '3D PREVIEW',
              desc: 'Instant tactile 3D garment simulation with realistic fabric folds & drape.',
              icon: Zap,
              color: 'text-blue-400',
            },
            {
              step: '05',
              title: 'CREATOR SIGNS',
              desc: 'Creator approves drops & controls pricing. Zero unauthorized listings.',
              icon: ShieldCheck,
              color: 'text-brand-neon',
            },
            {
              step: '06',
              title: 'PRINT ON DEMAND',
              desc: 'Fan orders, garment printed on 240 GSM cotton, creator receives payout.',
              icon: ShoppingBag,
              color: 'text-purple-400',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 bg-surface-card border-2 border-surface-border rounded-lg relative group hover:border-brand-neon transition-all shadow-tactile-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-extrabold text-lg text-brand-neon">
                    {item.step}
                  </span>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h4 className="font-display font-bold text-sm text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. STREETWEAR SPECS & FABRIC BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-black border-2 border-surface-border rounded-xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="sticker-tag bg-brand-orange text-white font-mono text-[10px]">
                GARMENT ENGINEERING
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase leading-none">
                BUILT LIKE LUXURY STREETWEAR. <br />
                NOT CHEAP POD MERCH.
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Generic print-on-demand produces stiff, paper-thin shirts that shrink in one wash. 
                WearGram garments are custom milled for durability, drape, and heavy streetwear weight.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-surface-card border border-surface-border rounded space-y-1">
                  <span className="text-brand-neon font-bold block">240 GSM</span>
                  <span className="text-zinc-400 text-[11px]">100% Combed Terry Cotton</span>
                </div>
                <div className="p-3 bg-surface-card border border-surface-border rounded space-y-1">
                  <span className="text-brand-neon font-bold block">DTG ULTRA-HD</span>
                  <span className="text-zinc-400 text-[11px]">Pigment ink bonded to fabric</span>
                </div>
                <div className="p-3 bg-surface-card border border-surface-border rounded space-y-1">
                  <span className="text-brand-neon font-bold block">BOXY DROP FIT</span>
                  <span className="text-zinc-400 text-[11px]">Tokyo/Seoul oversized cut</span>
                </div>
                <div className="p-3 bg-surface-card border border-surface-border rounded space-y-1">
                  <span className="text-brand-neon font-bold block">PRE-SHRUNK</span>
                  <span className="text-zinc-400 text-[11px]">0% wash shrinkage guaranteed</span>
                </div>
              </div>
            </div>

            {/* Visual garment tag graphic */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm bg-surface-card border-2 border-dashed border-white/20 p-6 rounded-lg font-mono text-xs space-y-4 shadow-tactile">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-bold text-white tracking-widest uppercase">
                    AUTHENTIC GARMENT CERTIFICATE
                  </span>
                  <span className="w-2.5 h-2.5 bg-brand-neon rounded-full" />
                </div>
                <div className="space-y-2 text-zinc-300 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">FABRIC WEIGHT:</span>
                    <span className="font-bold text-white">240 GSM (HEAVYWEIGHT)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">WEAVE:</span>
                    <span className="text-white">FRENCH TERRY COMBED COTTON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">COLLAR:</span>
                    <span className="text-white">1.25" HEAVY RIBBED CREW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">IP AUTHORIZATION:</span>
                    <span className="text-brand-neon font-bold">100% CREATOR SIGNED</span>
                  </div>
                </div>

                <div className="p-3 bg-surface-black border border-white/10 rounded text-center text-zinc-400 text-[10px]">
                  MANUFACTURED & DISPATCHED ON DEMAND • ZERO INVENTORY LANDFILL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CREATOR REVENUE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-card border-2 border-surface-border rounded-xl p-8 sm:p-12 shadow-tactile">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="sticker-tag bg-brand-neon text-surface-black font-bold">
              TRANSPARENT ECONOMICS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase">
              CREATOR REVENUE CALCULATOR
            </h2>
            <p className="text-zinc-400 text-sm">
              You own your audience and content. Keep up to 70% of the net profit with ₹0 upfront production cost.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400 uppercase font-bold">Your Instagram Followers:</span>
                  <span className="text-brand-neon font-bold text-sm">
                    {followerCount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={followerCount}
                  onChange={(e) => setFollowerCount(Number(e.target.value))}
                  className="w-full accent-brand-neon h-2 bg-surface-black rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400 uppercase font-bold">T-Shirt Retail Price:</span>
                  <span className="text-brand-neon font-bold text-sm">₹{avgShirtPrice}</span>
                </div>
                <input
                  type="range"
                  min="699"
                  max="1299"
                  step="50"
                  value={avgShirtPrice}
                  onChange={(e) => setAvgShirtPrice(Number(e.target.value))}
                  className="w-full accent-brand-neon h-2 bg-surface-black rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400 uppercase font-bold">Est. Fan Purchase Rate:</span>
                  <span className="text-brand-neon font-bold text-sm">{conversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full accent-brand-neon h-2 bg-surface-black rounded-lg cursor-pointer"
                />
              </div>

              {/* Per-shirt breakdown */}
              <div className="p-4 bg-surface-black border border-surface-border rounded-lg font-mono text-xs space-y-2">
                <div className="text-zinc-400 uppercase font-bold border-b border-surface-border pb-1">
                  PER-GARMENT UNIT ECONOMICS (AT ₹{avgShirtPrice}):
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Base Garment & DTG Print:</span>
                  <span>₹{baseCost}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Payment Gateway (2% + ₹3):</span>
                  <span>₹{gatewayFee}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Platform Fee (12% of margin):</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-brand-neon font-bold border-t border-surface-border pt-1 text-sm">
                  <span>CREATOR NET PER TEE:</span>
                  <span>₹{creatorPerShirt}</span>
                </div>
              </div>
            </div>

            {/* Projected Earnings Display */}
            <div className="lg:col-span-5 bg-surface-black border border-surface-border rounded-lg p-6 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  ESTIMATED CREATOR EARNINGS / DROP
                </span>
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-brand-neon tracking-tight">
                  ₹{totalProjectedEarnings.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  Based on ~{estimatedBuyers.toLocaleString()} units ordered
                </p>
              </div>

              <div className="p-4 bg-surface-card rounded border border-white/5 my-4 text-xs font-mono text-left space-y-1.5 text-zinc-300">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" />
                  AUTOMATED DIRECT PAYOUTS
                </div>
                <p className="text-[11px] text-zinc-400">
                  Funds routed automatically to your UPI ID or bank account as each drop dispatches.
                </p>
              </div>

              <Link
                href="/creator-studio"
                className="btn-streetwear-primary py-3 text-xs justify-center"
              >
                START EARNING WITH YOUR CONTENT <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-neon/20 via-surface-card to-surface-black border-2 border-brand-neon rounded-xl p-8 sm:p-14 text-center space-y-6 shadow-tactile-neon">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase">
            READY TO TURN YOUR ARCHIVE INTO MERCH?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
            Connect your Instagram in 60 seconds. Pick your favorite viral posts or Reels, and let your fans wear them in 3D.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/creator-studio"
              className="btn-streetwear-primary text-sm py-3 px-8"
            >
              CONNECT INSTAGRAM & CREATE
            </Link>
            <Link
              href="/explore"
              className="btn-streetwear-secondary text-sm py-3 px-8"
            >
              BROWSE STOREFRONTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
