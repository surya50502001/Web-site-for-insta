'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchProductById } from '@/lib/api';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { MerchProduct, DesignArtwork } from '@/lib/types';
import TShirtCanvas from '@/components/3d/TShirtCanvas';
import { useCart } from '@/lib/CartContext';
import { 
  CheckCircle2, 
  ShoppingBag, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Copy, 
  Check, 
  Instagram, 
  ChevronRight 
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<MerchProduct>(
    MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0]
  );
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0] || '#121214');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [isBackView, setIsBackView] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    async function loadProduct() {
      if (id) {
        const p = await fetchProductById(id);
        if (p) {
          setProduct(p);
          setSelectedColor(p.availableColors[0] || '#121214');
        }
      }
    }
    loadProduct();
  }, [id]);

  const activeDesign = product.designs[selectedDesignIndex] || product.designs[0];

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${activeDesign.id}-${selectedColor}-${selectedSize}`,
      productId: product.id,
      productTitle: product.title,
      creatorUsername: product.creator?.username || 'chaoscurator',
      designId: activeDesign.id,
      designTitle: activeDesign.title,
      graphicUrl: activeDesign.graphicUrl,
      color: selectedColor,
      size: selectedSize,
      price: product.basePrice,
      quantity,
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Link href="/" className="hover:text-white transition-colors">HOME</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/explore" className="hover:text-white transition-colors">CREATORS</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/creator/${product.creator?.username}`} className="hover:text-brand-neon transition-colors">
          @{product.creator?.username}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / CENTER: Large Interactive 3D Product Viewer */}
        <div className="lg:col-span-7 bg-surface-black border-2 border-surface-border rounded-xl p-4 sm:p-6 shadow-tactile relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
              <span className="font-bold text-white uppercase tracking-wider">3D INTERACTIVE VIEWER</span>
            </div>
            <span className="text-zinc-400">TOUCH & DRAG TO ORBIT</span>
          </div>

          {/* 3D Canvas */}
          <div className="h-[480px] sm:h-[550px] w-full flex items-center justify-center">
            <TShirtCanvas
              graphicUrl={activeDesign.graphicUrl}
              shirtColor={selectedColor}
              size={selectedSize}
              isBackView={isBackView}
              onViewChange={setIsBackView}
              className="w-full h-full"
              interactive={true}
            />
          </div>

          {/* Bottom viewer helper notice */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-3 border-t border-surface-border">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-neon" />
              <span>OFFICIALLY AUTHORIZED BY @{product.creator?.username}</span>
            </div>
            <span className="text-zinc-500 font-bold uppercase">240 GSM COMBED TERRY</span>
          </div>
        </div>

        {/* RIGHT: Product Details, Design Selector, Options, and Buy */}
        <div className="lg:col-span-5 space-y-6">
          {/* Creator Pill & Title */}
          <div className="space-y-3">
            <Link
              href={`/creator/${product.creator?.username}`}
              className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-surface-border hover:border-brand-neon rounded-full transition-colors group"
            >
              <img
                src={product.creator?.profilePicUrl}
                alt="Creator"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-mono text-xs text-white group-hover:text-brand-neon font-bold">
                @{product.creator?.username}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
            </Link>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="font-display font-extrabold text-3xl text-brand-neon">
                ₹{product.basePrice}
              </span>
              <span className="font-mono text-xs text-zinc-400">
                INR (INCL. ALL TAXES)
              </span>
            </div>

            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* VISUAL DESIGN SELECTOR (Instantly changes 3D shirt) */}
          <div className="space-y-2.5 pt-2 border-t border-surface-border">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-neon" />
                SELECT INSTAGRAM MOMENT:
              </label>
              <span className="text-[11px] font-mono text-brand-neon font-bold">
                {selectedDesignIndex + 1} OF {product.designs.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {product.designs.map((design, idx) => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesignIndex(idx)}
                  className={`p-2 rounded border text-left transition-all flex items-center gap-2.5 ${
                    selectedDesignIndex === idx
                      ? 'bg-surface-panel border-brand-neon ring-1 ring-brand-neon/50 shadow-tactile-sm'
                      : 'bg-surface-card border-surface-border opacity-70 hover:opacity-100 hover:border-zinc-500'
                  }`}
                >
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src={design.graphicUrl}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-display font-bold text-xs text-white truncate">
                      {design.title}
                    </h5>
                    <span className="text-[10px] font-mono text-zinc-400 block truncate">
                      {design.filter.replace('_', ' ')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* GARMENT COLOR SELECTOR */}
          <div className="space-y-2 pt-2 border-t border-surface-border">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="uppercase font-bold text-white">GARMENT COLORWAY:</span>
              <span className="text-zinc-400 font-bold">{selectedColor}</span>
            </div>

            <div className="flex items-center gap-3">
              {product.availableColors.map((hex) => (
                <button
                  key={hex}
                  onClick={() => setSelectedColor(hex)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === hex
                      ? 'border-brand-neon scale-110 ring-2 ring-brand-neon/40 shadow-tactile-sm'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div className="space-y-2 pt-2 border-t border-surface-border">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="uppercase font-bold text-white">SIZE (BOXY STREETWEAR CUT):</span>
              <span className="text-brand-neon">TRUE TO OVERSIZED FIT</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 rounded font-mono font-bold text-xs uppercase border transition-all ${
                    selectedSize === sz
                      ? 'bg-brand-neon text-surface-black border-brand-neon shadow-tactile-sm'
                      : 'bg-surface-card text-zinc-300 border-surface-border hover:border-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY & ACTIONS */}
          <div className="space-y-3 pt-3 border-t border-surface-border">
            <div className="flex gap-3">
              <div className="flex items-center bg-surface-card border border-surface-border rounded px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-zinc-400 hover:text-white px-2 py-1 font-bold"
                >
                  -
                </button>
                <span className="font-mono text-sm font-bold px-2 text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-zinc-400 hover:text-white px-2 py-1 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 btn-streetwear-primary py-3 text-xs justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO MERCH BAG (₹{product.basePrice * quantity})
              </button>
            </div>

            {/* Social Sharing bar */}
            <div className="flex items-center justify-between p-3 bg-surface-black border border-surface-border rounded text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> SHARE THIS DROP:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this 3D streetwear tee from @${product.creator?.username} on WearGram: ${product.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 bg-surface-panel hover:bg-emerald-600 rounded text-zinc-300 hover:text-white transition-colors text-[10px]"
                >
                  WHATSAPP
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just customized this tee from @${product.creator?.username} on WearGram 🔥`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 bg-surface-panel hover:bg-blue-500 rounded text-zinc-300 hover:text-white transition-colors text-[10px]"
                >
                  X
                </a>
                <button
                  onClick={handleCopyLink}
                  className="px-2 py-1 bg-surface-panel hover:bg-brand-neon hover:text-surface-black rounded text-zinc-300 transition-colors text-[10px] flex items-center gap-1"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copiedLink ? 'COPIED' : 'LINK'}
                </button>
              </div>
            </div>
          </div>

          {/* Garment Highlights Specs */}
          <div className="p-4 bg-surface-card border border-surface-border rounded-lg space-y-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 text-white font-bold">
              <Truck className="w-4 h-4 text-brand-neon" />
              PRINT-ON-DEMAND FULFILLMENT
            </div>
            <p className="text-[11px] leading-relaxed">
              Printed on custom-milled 240 GSM heavy combed cotton. Zero deadstock waste. Dispatches in 48 hours with direct revenue shared to @{product.creator?.username}.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-black/95 backdrop-blur-md border-t border-surface-border p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="font-display font-bold text-lg text-brand-neon">
            ₹{product.basePrice * quantity}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 block">
            {selectedSize} • {activeDesign.title}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="btn-streetwear-primary py-2 px-5 text-xs flex-1 justify-center"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}
