"use client";

import React from "react";
import Image from "next/image";
import { InstagramPost } from "@/lib/types";
import { X, Heart, MessageCircle, ExternalLink, Camera, Calendar, MapPin, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxModalProps {
  post: InstagramPost | null;
  onClose: () => void;
  accentColor?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  post,
  onClose,
  accentColor = "#C28E5C",
}) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-[#141518] text-white rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: High-res image display */}
          <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[340px] md:min-h-[580px] p-2">
            <div className="relative w-full h-full min-h-[320px] md:min-h-[560px]">
              <Image
                src={post.mediaUrl}
                alt={post.caption || "Photograph"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
          </div>

          {/* Right: Metadata, EXIF, Caption & Instagram details */}
          <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-[#16181D]">
            <div className="space-y-6">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border"
                  style={{
                    backgroundColor: `${accentColor}1A`,
                    color: accentColor,
                    borderColor: `${accentColor}40`,
                  }}
                >
                  {post.category}
                </span>

                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    {post.likeCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-zinc-400" />
                    {post.commentsCount}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  Story & Caption
                </h4>
                <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line font-serif italic text-base">
                  &ldquo;{post.caption}&rdquo;
                </p>
              </div>

              {/* EXIF Information (Photographer Craft) */}
              {post.exifData && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <Camera className="w-4 h-4 text-zinc-400" />
                    <span>Technical Metadata / EXIF</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {post.exifData.camera && (
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-mono">Camera</span>
                        <span className="text-zinc-200 font-medium">{post.exifData.camera}</span>
                      </div>
                    )}
                    {post.exifData.lens && (
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-mono">Lens</span>
                        <span className="text-zinc-200 font-medium">{post.exifData.lens}</span>
                      </div>
                    )}
                    {post.exifData.aperture && (
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-mono">Exposure</span>
                        <span className="text-zinc-200 font-mono">
                          {post.exifData.aperture} • ISO {post.exifData.iso}
                        </span>
                      </div>
                    )}
                    {post.exifData.location && (
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-mono">Location</span>
                        <span className="text-zinc-200 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          {post.exifData.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors underline underline-offset-4 font-medium"
              >
                <span>View on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
