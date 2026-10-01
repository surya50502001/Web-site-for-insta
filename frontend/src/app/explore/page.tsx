'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_CREATORS, MOCK_PRODUCTS } from '@/lib/mockData';
import { Search, CheckCircle2, ArrowRight, Instagram, Sparkles, Filter } from 'lucide-react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const tags = ['ALL', 'MEMES & CHAOS', '35MM FILM', 'ANIME & MANGA', 'RETRO ARCHIVE'];

  const filteredCreators = MOCK_CREATORS.filter((c) => {
    const matchesSearch =
      c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-surface-border rounded text-xs font-mono text-brand-neon">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VERIFIED CREATOR DIRECTORY</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight uppercase">
          EXPLORE CREATORS
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Discover creators turning their viral moments, jokes, and visual archives into wearable culture.
        </p>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pb-6 border-b border-surface-border">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by creator @handle or vibe..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-card border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none font-mono placeholder:text-zinc-500"
          />
        </div>

        {/* Filter tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold whitespace-nowrap transition-colors border ${
                selectedTag === tag
                  ? 'bg-brand-neon text-surface-black border-brand-neon'
                  : 'bg-surface-card text-zinc-400 border-surface-border hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => {
          const featuredDrop = MOCK_PRODUCTS.find((p) => p.creatorId === creator.id) || MOCK_PRODUCTS[0];

          return (
            <div
              key={creator.id}
              className="bg-surface-card border-2 border-surface-border rounded-lg overflow-hidden flex flex-col justify-between group hover:border-brand-neon transition-all shadow-tactile-sm"
            >
              <div>
                {/* Header: Avatar, Name, Verified */}
                <div className="p-5 flex items-center justify-between border-b border-surface-border bg-surface-black">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.profilePicUrl}
                      alt={creator.displayName}
                      className="w-12 h-12 rounded-full border border-brand-neon object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-bold text-base text-white group-hover:text-brand-neon transition-colors">
                          @{creator.username}
                        </h3>
                        {creator.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {creator.followerCount.toLocaleString()} followers
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded-full bg-white/5 text-pink-500">
                    <Instagram className="w-4 h-4" />
                  </div>
                </div>

                {/* Creator Bio */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-2">
                    {creator.bio}
                  </p>

                  {/* Featured Merch Teaser */}
                  <div className="p-3 bg-surface-black border border-surface-border rounded space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                      <span>LATEST DROP:</span>
                      <span className="text-brand-neon font-bold">₹{featuredDrop.basePrice}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-surface-panel rounded overflow-hidden flex-shrink-0 border border-white/10">
                        <img
                          src={featuredDrop.defaultArtworkUrl}
                          alt={featuredDrop.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-xs text-white truncate">
                          {featuredDrop.title}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                          {featuredDrop.designs.length} designs • 240 GSM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <Link
                  href={`/creator/${creator.username}`}
                  className="w-full btn-streetwear-primary py-2.5 text-xs justify-center"
                >
                  VISIT STOREFRONT <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
