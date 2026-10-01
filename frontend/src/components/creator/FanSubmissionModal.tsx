'use client';

import React, { useState } from 'react';
import { submitFanDesign } from '@/lib/api';
import TShirtCanvas from '../3d/TShirtCanvas';
import { X, Sparkles, CheckCircle2, ShieldCheck, Upload, AlertCircle } from 'lucide-react';

interface FanSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorId: string;
  creatorUsername: string;
}

export default function FanSubmissionModal({
  isOpen,
  onClose,
  creatorId,
  creatorUsername,
}: FanSubmissionModalProps) {
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [submitterInstagram, setSubmitterInstagram] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [designFileUrl, setDesignFileUrl] = useState(
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
  );
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;

    setIsSubmitting(true);
    try {
      await submitFanDesign({
        creatorId,
        submitterName,
        submitterEmail,
        submitterInstagram,
        title,
        description,
        designFileUrl,
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-surface-card border-2 border-surface-border rounded-lg shadow-tactile p-6 text-white my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-surface-border">
          <div className="p-2 bg-brand-neon/20 text-brand-neon border border-brand-neon/40 rounded">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="sticker-tag bg-white/10 text-white font-mono text-[10px]">
              FAN CO-CREATOR STUDIO
            </span>
            <h3 className="font-display font-extrabold text-xl tracking-tight text-white">
              SUBMIT FAN MERCH FOR @{creatorUsername}
            </h3>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-brand-neon mx-auto animate-bounce" />
            <h4 className="font-display font-bold text-2xl">DESIGN PITCH TRANSMITTED!</h4>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed font-sans">
              Your concept has been placed directly into <span className="text-brand-neon font-bold">@{creatorUsername}’s</span> review dashboard.
              If approved, it will go live in their storefront with your handle credited and a <span className="text-brand-neon font-bold">15% co-creator revenue share</span> paid to you on every sale.
            </p>
            <button onClick={handleClose} className="btn-streetwear-primary py-2.5 px-6 text-xs mt-2">
              DONE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Live 3D Shirt Preview of the fan design */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-surface-black p-4 rounded border border-surface-border">
              <div className="sm:col-span-5 h-44 rounded overflow-hidden relative border border-white/10">
                <TShirtCanvas
                  graphicUrl={designFileUrl}
                  shirtColor="#121214"
                  size="L"
                  className="w-full h-full min-h-[170px]"
                  interactive={true}
                  accentGlow={false}
                />
              </div>

              <div className="sm:col-span-7 flex flex-col justify-between text-xs space-y-2">
                <div>
                  <span className="font-mono text-zinc-400 uppercase text-[10px] block mb-1">
                    LIVE 3D SIMULATION:
                  </span>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">
                    See how your artwork projects onto the 240 GSM oversized garment in real-time.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    Design Image URL:
                  </label>
                  <input
                    type="url"
                    required
                    value={designFileUrl}
                    onChange={(e) => setDesignFileUrl(e.target.value)}
                    placeholder="https://... image link"
                    className="w-full px-2.5 py-1.5 bg-surface-card border border-surface-border rounded text-xs text-white focus:border-brand-neon outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  placeholder="Aryan Sharma"
                  className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-xs text-white focus:border-brand-neon outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  placeholder="aryan@artist.com"
                  className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-xs text-white focus:border-brand-neon outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                  Your Instagram Handle
                </label>
                <input
                  type="text"
                  value={submitterInstagram}
                  onChange={(e) => setSubmitterInstagram(e.target.value)}
                  placeholder="@aryanstudio"
                  className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-xs text-white focus:border-brand-neon outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                  Design Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CHAOS AUDIO WAVE EDIT"
                  className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-xs text-white focus:border-brand-neon outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Pitch / Why would fans wear this?
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the reference, joke, or artistic vision to the creator..."
                className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-xs text-white focus:border-brand-neon outline-none"
              />
            </div>

            {/* Legal terms checkbox */}
            <div className="p-3 bg-surface-black border border-surface-border rounded flex items-start gap-2.5">
              <input
                type="checkbox"
                id="terms"
                required
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 accent-brand-neon w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-[11px] text-zinc-300 leading-snug cursor-pointer select-none">
                I declare that this is my original fan artwork inspired by <span className="text-white font-bold">@{creatorUsername}</span>. 
                I agree that this design will <span className="text-brand-neon font-bold">NOT</span> become public merchandise until the creator manually reviews and approves it. 
                Upon approval, I will receive a 15% co-creator royalty share on every printed garment.
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="btn-streetwear-secondary py-2 px-4 text-xs"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !agreedTerms}
                className="btn-streetwear-primary py-2 px-6 text-xs disabled:opacity-50"
              >
                {isSubmitting ? 'SUBMITTING TO CREATOR...' : 'SUBMIT DESIGN FOR REVIEW'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
