'use client';

import React, { useState, useEffect } from 'react';
import TShirtCanvas from './TShirtCanvas';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Heart, 
  MessageCircle, 
  Share2, 
  Sparkles, 
  ShoppingBag,
  RotateCw,
  CheckCircle2
} from 'lucide-react';

export default function Hero3DViewer() {
  const featuredProduct = MOCK_PRODUCTS[0];
  const designs = featuredProduct.designs;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(featuredProduct.availableColors[0]);
  const [isBackView, setIsBackView] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const { addItem } = useCart();
  const activeDesign = designs[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % designs.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + designs.length) % designs.length);
  };

  // Optional auto-cycle to demonstrate instant transformation
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % designs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, designs.length]);

  const handleBuyNow = () => {
    addItem({
      id: `${featuredProduct.id}-${activeDesign.id}-${selectedColor}`,
      productId: featuredProduct.id,
      productTitle: featuredProduct.title,
      creatorUsername: featuredProduct.creator?.username || 'chaoscurator',
      designId: activeDesign.id,
      designTitle: activeDesign.title,
      graphicUrl: activeDesign.graphicUrl,
      color: selectedColor,
      size: 'L',
      price: featuredProduct.basePrice,
      quantity: 1,
    });
  };

  return (
    <div className="w-full relative bg-surface-card border-2 border-surface-border rounded-lg overflow-hidden shadow-tactile">
      {/* Top Streetwear Utility Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-surface-black border-b border-surface-border text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-neon animate-pulse" />
          <span className="font-bold text-white tracking-wider">LIVE 3D DROP ENGINE</span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">OFFICIAL INSTAGRAM IP PIPELINE</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-2 py-0.5 text-[11px] font-bold rounded transition-colors ${
              isAutoPlay 
                ? 'bg-brand-neon text-surface-black' 
                : 'text-zinc-400 hover:text-white bg-white/5'
            }`}
          >
            {isAutoPlay ? '⏸ PAUSE AUTO' : '▶ AUTO SWIPE'}
          </button>
          <span className="text-zinc-600">•</span>
          <span className="text-brand-neon font-bold">
            DESIGN {activeIndex + 1}/{designs.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* LEFT: Instagram Post / Moment Card */}
        <div className="lg:col-span-4 p-5 lg:p-6 bg-surface-black/60 border-b lg:border-b-0 lg:border-r border-surface-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-neon p-0.5">
                  <img
                    src={featuredProduct.creator?.profilePicUrl}
                    alt="Creator"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-display font-bold text-sm text-white">
                      @{featuredProduct.creator?.username}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    124.8K Followers • Authorized Moment
                  </span>
                </div>
              </div>

              <div className="p-1.5 rounded-full bg-white/5 text-pink-500">
                <Instagram className="w-4 h-4" />
              </div>
            </div>

            {/* Moment Media Card with Stencil Animation */}
            <div className="relative aspect-square rounded-md overflow-hidden border border-surface-border group mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeDesign.id}
                  src={activeDesign.graphicUrl}
                  alt={activeDesign.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Instagram Reel Badges */}
              <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>REEL MOMENT</span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-xs text-white">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> 48.2k
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <MessageCircle className="w-3.5 h-3.5 text-zinc-300" /> 1.3k
                  </span>
                </div>
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>

            {/* Moment Details */}
            <div className="space-y-1.5">
              <span className="sticker-tag bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
                AUTHENTICATED CONTENT
              </span>
              <h4 className="font-display font-bold text-base text-white tracking-tight">
                {activeDesign.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {activeDesign.subtitle || "Extracted from viral Reel archives with creator authorization. Printed using high-density DTG pigment."}
              </p>
            </div>
          </div>

          {/* Transformation Indicator */}
          <div className="mt-6 pt-4 border-t border-surface-border">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span className="flex items-center gap-1.5 text-brand-neon">
                <Sparkles className="w-3.5 h-3.5" />
                INSTANT PRINT TRANSFORM
              </span>
              <span>DTG ULTRA HD</span>
            </div>
            <div className="w-full bg-surface-panel h-1.5 rounded-full overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4 }}
                className="h-full bg-brand-neon"
              />
            </div>
          </div>
        </div>

        {/* CENTER / RIGHT: 3D T-Shirt Interactive Stage */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-surface-black relative">
          {/* Subtle Stage Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

          {/* 3D Canvas Area */}
          <div className="relative flex-1 min-h-[400px] flex items-center justify-center">
            <TShirtCanvas
              graphicUrl={activeDesign.graphicUrl}
              shirtColor={selectedColor}
              size="L"
              isBackView={isBackView}
              onViewChange={setIsBackView}
              className="w-full h-full min-h-[420px]"
              interactive={true}
              autoRotate={false}
            />

            {/* Tactile Swipe Arrows on sides */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-surface-card/90 hover:bg-brand-neon hover:text-black border border-surface-border text-white rounded-full transition-all shadow-tactile active:scale-95 z-10"
              aria-label="Previous Design"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-surface-card/90 hover:bg-brand-neon hover:text-black border border-surface-border text-white rounded-full transition-all shadow-tactile active:scale-95 z-10"
              aria-label="Next Design"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* BOTTOM INTERACTION BAR: Design Dots, Color Swatches, Price & Buy */}
          <div className="p-4 sm:p-5 bg-surface-card/95 border-t border-surface-border backdrop-blur-md z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Design Selector Thumbnails & Dots */}
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <span className="font-mono text-xs text-zinc-400 font-bold uppercase whitespace-nowrap">
                  DESIGNS:
                </span>
                <div className="flex items-center gap-2">
                  {designs.map((d, idx) => (
                    <button
                      key={d.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative w-11 h-11 rounded border-2 overflow-hidden transition-all flex-shrink-0 ${
                        idx === activeIndex
                          ? 'border-brand-neon scale-105 shadow-tactile-sm'
                          : 'border-surface-border opacity-60 hover:opacity-100'
                      }`}
                      title={d.title}
                    >
                      <img src={d.graphicUrl} alt={d.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-zinc-400 font-bold uppercase whitespace-nowrap">
                  COLOR:
                </span>
                <div className="flex items-center gap-1.5">
                  {featuredProduct.availableColors.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => setSelectedColor(hex)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        selectedColor === hex
                          ? 'border-brand-neon scale-110 ring-2 ring-brand-neon/40'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              {/* Price & Buy Button */}
              <div className="flex items-center gap-3.5 w-full md:w-auto justify-end">
                <div className="text-right">
                  <div className="font-display font-extrabold text-2xl text-white tracking-tight">
                    ₹{featuredProduct.basePrice}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 uppercase">
                    Free shipping • 240 GSM
                  </div>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="btn-streetwear-primary py-2.5 px-5 text-sm whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4" />
                  BUY THIS DESIGN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
