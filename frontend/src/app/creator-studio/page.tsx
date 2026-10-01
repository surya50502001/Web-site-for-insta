'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_CREATORS, MOCK_INSTAGRAM_MEDIA, MOCK_PRODUCTS, MOCK_FAN_SUBMISSIONS } from '@/lib/mockData';
import { InstagramMediaItem, FanSubmission, MerchProduct, ArtworkFilter } from '@/lib/types';
import TShirtCanvas from '@/components/3d/TShirtCanvas';
import InstagramConnectModal from '@/components/creator/InstagramConnectModal';
import { 
  Instagram, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Trash2, 
  Check, 
  X, 
  Sliders, 
  Plus, 
  Eye, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function CreatorStudioPage() {
  const [activeTab, setActiveTab] = useState<'BUILDER' | 'QUEUE' | 'DROPS' | 'ANALYTICS'>('BUILDER');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const [creator, setCreator] = useState(MOCK_CREATORS[0]);
  const [mediaList, setMediaList] = useState<InstagramMediaItem[]>(MOCK_INSTAGRAM_MEDIA);
  const [fanSubmissions, setFanSubmissions] = useState<FanSubmission[]>(MOCK_FAN_SUBMISSIONS);
  const [activeDrops, setActiveDrops] = useState<MerchProduct[]>(MOCK_PRODUCTS);

  // Merch Builder Modal state
  const [selectedMedia, setSelectedMedia] = useState<InstagramMediaItem | null>(null);
  const [dropTitle, setDropTitle] = useState('');
  const [dropPrice, setDropPrice] = useState(799);
  const [selectedFilter, setSelectedFilter] = useState<ArtworkFilter>('VINTAGE_STREETWEAR');
  const [builderColor, setBuilderColor] = useState('#121214');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Profit calculations
  const baseCost = 350;
  const gatewayFee = Math.round(dropPrice * 0.02 + 3);
  const grossMargin = Math.max(0, dropPrice - (baseCost + gatewayFee));
  const platformFee = Math.round(grossMargin * 0.12);
  const creatorProfit = Math.round((grossMargin - platformFee) * 0.70);

  const openBuilder = (media: InstagramMediaItem) => {
    setSelectedMedia(media);
    setDropTitle(media.caption ? media.caption.slice(0, 36).toUpperCase() + ' TEE' : 'VIRAL MOMENT TEE');
    setPublishSuccess(false);
  };

  const handlePublishDrop = () => {
    if (!selectedMedia) return;
    setIsPublishing(true);

    setTimeout(() => {
      const newProduct: MerchProduct = {
        id: `p_${Date.now()}`,
        creatorId: creator.id,
        title: dropTitle || 'NEW CREATOR DROP',
        description: `Officially authorized streetwear drop from @${creator.username}. High density print on 240 GSM heavy cotton.`,
        basePrice: dropPrice,
        currency: 'INR',
        fabricSpec: '240 GSM French Terry 100% Combed Cotton, Pre-shrunk Boxy Cut',
        availableColors: ['#121214', '#F4F4F0', '#2B3530', '#1E3A8A'],
        availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
        defaultArtworkUrl: selectedMedia.mediaUrl,
        status: 'ACTIVE',
        salesCount: 0,
        designs: [
          {
            id: `d_${Date.now()}`,
            productId: `p_${Date.now()}`,
            instagramMediaId: selectedMedia.id,
            title: dropTitle,
            graphicUrl: selectedMedia.mediaUrl,
            filter: selectedFilter,
          },
        ],
      };

      setActiveDrops([newProduct, ...activeDrops]);
      setIsPublishing(false);
      setPublishSuccess(true);
    }, 1000);
  };

  const handleApproveFanSubmission = (subId: string) => {
    setFanSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'APPROVED' } : s))
    );
  };

  const handleRejectFanSubmission = (subId: string) => {
    setFanSubmissions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'REJECTED' } : s))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-surface-card border-2 border-surface-border rounded-xl shadow-tactile">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-brand-neon overflow-hidden p-0.5 shadow-tactile-sm flex-shrink-0">
            <img src={creator.profilePicUrl} alt={creator.displayName} className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                @{creator.username}
              </h1>
              {creator.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/20" />}
              <span className="sticker-tag bg-brand-neon text-surface-black text-[10px]">
                CREATOR STUDIO
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> META GRAPH API CONNECTED
              </span>
              <span>•</span>
              <span>UPI: {creator.payoutUpiId || 'Not set'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="btn-streetwear-secondary py-2 px-3 text-xs font-mono"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            RE-SYNC INSTAGRAM
          </button>
          <a
            href={`/creator/${creator.username}`}
            target="_blank"
            className="btn-streetwear-primary py-2 px-3 text-xs font-mono"
          >
            LIVE STOREFRONT <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-border pb-2 overflow-x-auto">
        {[
          { id: 'BUILDER', label: 'CONTENT → MERCH BUILDER', count: mediaList.length },
          { id: 'QUEUE', label: 'FAN SUBMISSION QUEUE', count: fanSubmissions.filter((f) => f.status === 'PENDING').length },
          { id: 'DROPS', label: 'ACTIVE STOREFRONT DROPS', count: activeDrops.length },
          { id: 'ANALYTICS', label: 'REVENUE & PAYOUTS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded text-xs font-mono font-bold tracking-wider transition-colors border whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-brand-neon text-surface-black border-brand-neon shadow-tactile-sm'
                : 'bg-surface-card text-zinc-400 border-surface-border hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                activeTab === tab.id ? 'bg-surface-black text-brand-neon' : 'bg-surface-panel text-zinc-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: CONTENT → MERCH BUILDER */}
      {activeTab === 'BUILDER' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-white tracking-tight uppercase">
                AUTHORIZED INSTAGRAM ARCHIVE
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Click any viral Reel or photo to open the 3D Stencil Studio and turn it into wearable merch.
              </p>
            </div>
            <span className="sticker-tag bg-surface-black border border-surface-border text-zinc-300">
              {mediaList.length} AUTHORIZED MOMENTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaList.map((item) => (
              <div
                key={item.id}
                className="bg-surface-card border-2 border-surface-border rounded-lg overflow-hidden flex flex-col justify-between group hover:border-brand-neon transition-all shadow-tactile-sm"
              >
                <div>
                  <div className="aspect-square bg-surface-panel relative overflow-hidden">
                    <img src={item.mediaUrl} alt="Instagram Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
                      {item.mediaType}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-zinc-300 flex justify-between">
                      <span>♥ {item.likeCount.toLocaleString()}</span>
                      <span>💬 {item.commentsCount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-xs text-zinc-300 font-sans line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => openBuilder(item)}
                    className="w-full btn-streetwear-primary py-2 text-xs justify-center"
                  >
                    CREATE 3D TEE DROP <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FAN SUBMISSIONS QUEUE */}
      {activeTab === 'QUEUE' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-xl text-white tracking-tight uppercase">
              COMMUNITY FAN ART SUBMISSIONS
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              Fans submit designs inspired by your content. Review the 3D preview, approve to make public, or reject.
            </p>
          </div>

          <div className="space-y-4">
            {fanSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-surface-card border-2 border-surface-border rounded-lg p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-tactile-sm"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 bg-surface-panel rounded overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={sub.designFileUrl} alt={sub.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-base text-white">{sub.title}</h4>
                      <span className={`sticker-tag text-[9px] ${
                        sub.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        sub.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        'bg-brand-orange/20 text-brand-orange border border-brand-orange/30'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-mono">
                      By {sub.submitterName} ({sub.submitterInstagram || sub.submitterEmail}) • 15% Co-Creator Royalty
                    </p>
                    <p className="text-xs text-zinc-400 max-w-xl">{sub.description}</p>
                  </div>
                </div>

                {sub.status === 'PENDING' && (
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={() => handleRejectFanSubmission(sub.id)}
                      className="flex-1 md:flex-initial btn-streetwear-secondary py-2 px-3 text-xs text-red-400 border-red-500/30 hover:border-red-400"
                    >
                      <X className="w-3.5 h-3.5" /> REJECT
                    </button>
                    <button
                      onClick={() => handleApproveFanSubmission(sub.id)}
                      className="flex-1 md:flex-initial btn-streetwear-primary py-2 px-4 text-xs"
                    >
                      <Check className="w-3.5 h-3.5" /> APPROVE & PUBLISH
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE STOREFRONT DROPS */}
      {activeTab === 'DROPS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-white tracking-tight uppercase">
                ACTIVE STOREFRONT MERCH
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Products currently purchasable on shop.weargram.dev/@{creator.username}
              </p>
            </div>
            <span className="sticker-tag bg-brand-neon text-surface-black font-bold">
              {activeDrops.length} ACTIVE DROPS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeDrops.map((drop) => (
              <div key={drop.id} className="bg-surface-card border-2 border-surface-border rounded-lg overflow-hidden shadow-tactile-sm">
                <div className="aspect-square bg-surface-black relative">
                  <img src={drop.defaultArtworkUrl} alt={drop.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-brand-neon font-bold">
                    ₹{drop.basePrice}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-display font-bold text-sm text-white truncate">{drop.title}</h4>
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                    <span>{drop.designs.length} designs available</span>
                    <span className="text-emerald-400 font-bold">{drop.salesCount} sold</span>
                  </div>
                  <Link
                    href={`/product/${drop.id}`}
                    className="w-full btn-streetwear-secondary py-2 text-xs justify-center block text-center mt-3"
                  >
                    VIEW 3D CUSTOMIZER
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVENUE & ANALYTICS */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-surface-card border-2 border-surface-border rounded-lg shadow-tactile-sm space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">TOTAL CREATOR EARNINGS</span>
              <div className="font-display font-extrabold text-3xl text-brand-neon">₹1,57,932</div>
              <span className="text-[10px] font-mono text-emerald-400">100% Payout Dispatched</span>
            </div>

            <div className="p-5 bg-surface-card border-2 border-surface-border rounded-lg shadow-tactile-sm space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">TOTAL TEES SOLD</span>
              <div className="font-display font-extrabold text-3xl text-white">428</div>
              <span className="text-[10px] font-mono text-zinc-400">Avg. ₹369 profit / tee</span>
            </div>

            <div className="p-5 bg-surface-card border-2 border-surface-border rounded-lg shadow-tactile-sm space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">COMMUNITY FAN DESIGNS</span>
              <div className="font-display font-extrabold text-3xl text-brand-orange">12</div>
              <span className="text-[10px] font-mono text-zinc-400">Co-creators rewarded</span>
            </div>

            <div className="p-5 bg-surface-card border-2 border-surface-border rounded-lg shadow-tactile-sm space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">PAYOUT STATUS</span>
              <div className="font-display font-bold text-lg text-emerald-400 flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-5 h-5" /> ACTIVE (UPI)
              </div>
              <span className="text-[10px] font-mono text-zinc-400 truncate block">{creator.payoutUpiId}</span>
            </div>
          </div>
        </div>
      )}

      {/* MERCH BUILDER DRAWER / MODAL */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-surface-card border-2 border-surface-border rounded-xl shadow-2xl p-6 text-white max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-surface-border">
              <div className="p-1.5 bg-brand-neon text-surface-black rounded">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-display font-extrabold text-lg uppercase tracking-tight">
                3D MERCH STENCIL STUDIO
              </h3>
            </div>

            {publishSuccess ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-brand-neon mx-auto animate-bounce" />
                <h4 className="font-display font-extrabold text-3xl uppercase">DROP IS OFFICIALLY LIVE!</h4>
                <p className="text-zinc-300 text-sm max-w-md mx-auto">
                  Your new T-shirt drop has been generated and published to your public storefront. Fans can now interact with it in 3D.
                </p>
                <div className="flex justify-center gap-3 pt-4">
                  <button onClick={() => setSelectedMedia(null)} className="btn-streetwear-secondary py-2.5 px-6 text-xs">
                    CLOSE STUDIO
                  </button>
                  <a href={`/creator/${creator.username}`} className="btn-streetwear-primary py-2.5 px-6 text-xs">
                    VIEW ON STOREFRONT
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: 3D Garment Live Preview */}
                <div className="lg:col-span-6 bg-surface-black border border-surface-border rounded-lg p-4 relative min-h-[380px] flex items-center justify-center">
                  <TShirtCanvas
                    graphicUrl={selectedMedia.mediaUrl}
                    shirtColor={builderColor}
                    size="L"
                    className="w-full h-full min-h-[360px]"
                    interactive={true}
                  />
                  <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-zinc-400">
                    REAL-TIME 3D SIMULATION (DRAG TO ROTATE)
                  </div>
                </div>

                {/* Right: Customization Controls */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      DROP PRODUCT TITLE:
                    </label>
                    <input
                      type="text"
                      value={dropTitle}
                      onChange={(e) => setDropTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white font-display font-bold uppercase focus:border-brand-neon outline-none"
                    />
                  </div>

                  {/* Filter selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      PRINT STENCIL FILTER:
                    </label>
                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      {(['ORIGINAL', 'VINTAGE_STREETWEAR', 'HALFTONE_SCREENPRINT', 'STICKER_CUTOUT'] as ArtworkFilter[]).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setSelectedFilter(f)}
                          className={`p-2 rounded border text-left transition-all ${
                            selectedFilter === f
                              ? 'bg-brand-neon text-surface-black font-bold border-brand-neon'
                              : 'bg-surface-black text-zinc-300 border-surface-border hover:border-zinc-500'
                          }`}
                        >
                          {f.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Garment Color Preview */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      SAMPLE PREVIEW COLOR:
                    </label>
                    <div className="flex gap-2">
                      {['#121214', '#F4F4F0', '#2B3530', '#1E3A8A', '#FF4E00'].map((hex) => (
                        <button
                          key={hex}
                          onClick={() => setBuilderColor(hex)}
                          className={`w-7 h-7 rounded-full border transition-all ${
                            builderColor === hex ? 'border-brand-neon scale-110 ring-2 ring-brand-neon/40' : 'border-white/20'
                          }`}
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price & Economics slider */}
                  <div className="p-4 bg-surface-black border border-surface-border rounded-lg space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-bold uppercase">RETAIL PRICE:</span>
                      <span className="font-display font-extrabold text-xl text-brand-neon">₹{dropPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="699"
                      max="1299"
                      step="50"
                      value={dropPrice}
                      onChange={(e) => setDropPrice(Number(e.target.value))}
                      className="w-full accent-brand-neon h-1.5 bg-surface-card rounded cursor-pointer"
                    />

                    <div className="pt-2 border-t border-surface-border space-y-1 text-[11px] text-zinc-400">
                      <div className="flex justify-between">
                        <span>Base 240 GSM + DTG Print:</span>
                        <span>₹{baseCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment & Platform:</span>
                        <span>₹{gatewayFee + platformFee}</span>
                      </div>
                      <div className="flex justify-between text-brand-neon font-bold text-xs pt-1 border-t border-surface-border">
                        <span>YOUR NET PROFIT / TEE:</span>
                        <span>₹{creatorProfit}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePublishDrop}
                    disabled={isPublishing}
                    className="w-full btn-streetwear-primary py-3 text-xs justify-center"
                  >
                    {isPublishing ? 'GENERATING PRINT ASSETS & PUBLISHING...' : 'PUBLISH DROP TO STOREFRONT'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meta Instagram Connection Modal */}
      <InstagramConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSuccess={(acc) => {
          setCreator((prev) => ({ ...prev, username: acc.username, isVerified: true }));
        }}
      />
    </div>
  );
}
