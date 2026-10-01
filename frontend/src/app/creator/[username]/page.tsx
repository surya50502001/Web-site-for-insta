'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CREATORS, MOCK_PRODUCTS } from '@/lib/mockData';
import { fetchCreatorByUsername, fetchProducts } from '@/lib/api';
import TShirtCanvas from '@/components/3d/TShirtCanvas';
import FanSubmissionModal from '@/components/creator/FanSubmissionModal';
import { 
  Instagram, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  ShoppingBag, 
  Flame, 
  Send 
} from 'lucide-react';

export default function CreatorStorefront() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = rawUsername ? rawUsername.replace('%40', '').replace('@', '') : 'chaoscurator';

  const [creator, setCreator] = useState(
    MOCK_CREATORS.find((c) => c.username.toLowerCase() === username.toLowerCase()) || MOCK_CREATORS[0]
  );
  const [products, setProducts] = useState(
    MOCK_PRODUCTS.filter((p) => p.creatorId === creator.id)
  );
  const [isFanModalOpen, setIsFanModalOpen] = useState(false);
  const [active3DPreviewProduct, setActive3DPreviewProduct] = useState(products[0] || MOCK_PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState(active3DPreviewProduct.availableColors[0]);

  useEffect(() => {
    async function loadData() {
      const c = await fetchCreatorByUsername(username);
      if (c) {
        setCreator(c);
        const p = await fetchProducts(c.id);
        if (p && p.length > 0) {
          setProducts(p);
          setActive3DPreviewProduct(p[0]);
        }
      }
    }
    loadData();
  }, [username]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Creator Storefront Hero Banner */}
      <div className="relative bg-surface-card border-2 border-surface-border rounded-xl overflow-hidden shadow-tactile p-6 sm:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neon/10 blur-[120px] pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-surface-border">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-brand-neon overflow-hidden p-0.5 shadow-tactile-sm">
              <img
                src={creator.profilePicUrl}
                alt={creator.displayName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  @{creator.username}
                </h1>
                {creator.isVerified && (
                  <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                )}
                <span className="sticker-tag bg-brand-neon text-surface-black text-[10px]">
                  VERIFIED STOREFRONT
                </span>
              </div>
              <p className="text-zinc-400 font-mono text-xs mt-1">
                {creator.displayName} • {creator.followerCount.toLocaleString()} Instagram Followers
              </p>
            </div>
          </div>

          {/* Social Links & Fan Art Submission CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`https://instagram.com/${creator.username}`}
              target="_blank"
              rel="noreferrer"
              className="btn-streetwear-secondary py-2.5 px-4 text-xs"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>OFFICIAL IG</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <button
              onClick={() => setIsFanModalOpen(true)}
              className="btn-streetwear-primary py-2.5 px-4 text-xs"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT FAN ART</span>
            </button>
          </div>
        </div>

        {/* Bio quote */}
        <p className="text-sm sm:text-base text-zinc-300 font-sans italic mt-6 max-w-2xl leading-relaxed">
          "{creator.bio}"
        </p>
      </div>

      {/* Featured 3D Merch Showcase */}
      <div className="bg-surface-black border-2 border-surface-border rounded-xl p-6 sm:p-8 shadow-tactile grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Model */}
        <div className="lg:col-span-6 bg-surface-card rounded-lg border border-surface-border p-4 relative min-h-[420px] flex items-center justify-center">
          <TShirtCanvas
            graphicUrl={active3DPreviewProduct.defaultArtworkUrl}
            shirtColor={selectedColor}
            size="L"
            className="w-full h-full min-h-[380px]"
            interactive={true}
          />
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-400">
            INTERACTIVE 3D PREVIEW • DRAG TO ROTATE
          </div>
        </div>

        {/* Right: Featured Drop Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="sticker-tag bg-brand-orange text-white font-mono text-[10px]">
              CURRENT DROP
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight uppercase">
              {active3DPreviewProduct.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {active3DPreviewProduct.description}
            </p>
          </div>

          {/* Color Switcher */}
          <div>
            <span className="font-mono text-xs text-zinc-400 uppercase font-bold block mb-2">
              SELECT GARMENT COLOR:
            </span>
            <div className="flex items-center gap-2">
              {active3DPreviewProduct.availableColors.map((hex) => (
                <button
                  key={hex}
                  onClick={() => setSelectedColor(hex)}
                  className={`w-7 h-7 rounded-full border transition-all ${
                    selectedColor === hex
                      ? 'border-brand-neon scale-110 ring-2 ring-brand-neon/40'
                      : 'border-white/20'
                  }`}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 border-t border-surface-border flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 block">RETAIL PRICE</span>
              <span className="font-display font-extrabold text-3xl text-brand-neon">
                ₹{active3DPreviewProduct.basePrice}
              </span>
            </div>

            <Link
              href={`/product/${active3DPreviewProduct.id}`}
              className="btn-streetwear-primary py-3 px-6 text-xs"
            >
              CHOOSE MOMENTS & BUY <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Storefront Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <h3 className="font-display font-bold text-2xl text-white tracking-tight uppercase">
            ALL ACTIVE DROPS ({products.length})
          </h3>
          <span className="font-mono text-xs text-zinc-400">
            OFFICIALLY LICENSED ARCHIVES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-surface-card border-2 border-surface-border rounded-lg overflow-hidden group hover:border-brand-neon transition-all flex flex-col justify-between shadow-tactile-sm"
            >
              <div>
                <div className="aspect-square bg-surface-panel relative overflow-hidden">
                  <img
                    src={prod.defaultArtworkUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-brand-neon font-bold">
                    {prod.designs.length} DESIGNS
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-display font-bold text-base text-white truncate">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-surface-border mt-3">
                <span className="font-display font-extrabold text-xl text-brand-neon">
                  ₹{prod.basePrice}
                </span>

                <Link
                  href={`/product/${prod.id}`}
                  className="btn-streetwear-primary py-2 px-4 text-xs"
                >
                  VIEW 3D TEE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fan Art Submission Modal */}
      <FanSubmissionModal
        isOpen={isFanModalOpen}
        onClose={() => setIsFanModalOpen(false)}
        creatorId={creator.id}
        creatorUsername={creator.username}
      />
    </div>
  );
}
