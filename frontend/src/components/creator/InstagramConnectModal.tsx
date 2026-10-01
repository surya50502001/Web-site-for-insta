'use client';

import React, { useState } from 'react';
import { X, Instagram, ShieldCheck, CheckCircle2, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface InstagramConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (accountData: any) => void;
}

export default function InstagramConnectModal({
  isOpen,
  onClose,
  onSuccess,
}: InstagramConnectModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [handle, setHandle] = useState('chaoscurator');
  const [legalName, setLegalName] = useState('Alex Rivera');
  const [digitalSignature, setDigitalSignature] = useState('Alex Rivera');
  const [grantConfirmed, setGrantConfirmed] = useState(true);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onSuccess({
        username: handle.replace('@', ''),
        displayName: legalName,
        isVerified: true,
        followerCount: 124800,
        signedAt: new Date().toISOString(),
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-surface-card border-2 border-surface-border rounded-lg shadow-tactile p-6 text-white max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-border">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] flex items-center justify-center text-white shadow-tactile-sm">
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-base tracking-tight">
                META GRAPH API AUTHENTICATION
              </span>
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <p className="font-mono text-[10px] text-zinc-400">
              OFFICIAL OAUTH 2.0 TOKEN EXCHANGE & CONTENT RIGHTS GRANT
            </p>
          </div>
        </div>

        {step === 1 ? (
          /* Step 1: Meta OAuth Scopes & Profile */
          <div className="space-y-4">
            <div className="p-3.5 bg-surface-black border border-surface-border rounded space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-neon">
                <ShieldCheck className="w-4 h-4" />
                OFFICIAL AUTHORIZATION PROTOCOL
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                WearGram accesses your media strictly through Meta’s authorized Developer Graph API. We do not store your Instagram password or perform unauthorized web scraping.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-zinc-400 uppercase font-bold block">
                REQUESTED PERMISSION SCOPES:
              </span>
              <div className="p-3 bg-surface-black border border-surface-border rounded space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" />
                    instagram_basic
                  </span>
                  <span className="text-[10px] text-zinc-500">Read profile & public media</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" />
                    pages_show_list
                  </span>
                  <span className="text-[10px] text-zinc-500">Verify linked Facebook page</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon" />
                    instagram_manage_insights
                  </span>
                  <span className="text-[10px] text-zinc-500">Track reach & top viral moments</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Your Instagram Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-zinc-500 font-mono text-xs">@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white font-mono focus:border-brand-neon outline-none"
                  placeholder="yourhandle"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full btn-streetwear-primary py-3 text-xs justify-center mt-2"
            >
              PROCEED TO RIGHTS DECLARATION <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Step 2: Content Rights Declaration & Digital Signature */
          <div className="space-y-4">
            <div className="p-3 bg-surface-black border border-surface-border rounded space-y-2">
              <span className="sticker-tag bg-brand-orange text-white text-[10px]">
                LEGAL DECLARATION
              </span>
              <h4 className="font-display font-bold text-sm text-white">
                Content Ownership & Merchandising Grant
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                By connecting, you certify that all content imported from @{handle} is authored or licensed by you. You authorize WearGram to generate high-resolution print assets and fulfill customer orders on your behalf.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Legal Full Name:
              </label>
              <input
                type="text"
                required
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-xs text-white focus:border-brand-neon outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Digital Signature (Type your legal name):
              </label>
              <input
                type="text"
                required
                value={digitalSignature}
                onChange={(e) => setDigitalSignature(e.target.value)}
                className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-xs text-brand-neon font-mono focus:border-brand-neon outline-none"
              />
            </div>

            <div className="p-3 bg-surface-black border border-surface-border rounded flex items-start gap-2.5">
              <input
                type="checkbox"
                id="grant"
                checked={grantConfirmed}
                onChange={(e) => setGrantConfirmed(e.target.checked)}
                className="mt-0.5 accent-brand-neon w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="grant" className="text-[11px] text-zinc-300 leading-snug cursor-pointer select-none">
                I confirm I am the authorized account holder of <span className="text-white font-bold">@{handle}</span>. I authorize WearGram to import my media assets and print them as approved streetwear merchandise.
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-streetwear-secondary py-2.5 px-4 text-xs"
              >
                BACK
              </button>

              <button
                type="button"
                onClick={handleAuthorize}
                disabled={isAuthorizing || !grantConfirmed || !digitalSignature}
                className="flex-1 btn-streetwear-primary py-2.5 px-4 text-xs justify-center disabled:opacity-50"
              >
                {isAuthorizing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    CONNECTING VIA META GRAPH API...
                  </span>
                ) : (
                  'AUTHORIZE & IMPORT MEDIA'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
