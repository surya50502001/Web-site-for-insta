'use client';

import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface RightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RightsModal({ isOpen, onClose }: RightsModalProps) {
  const [targetId, setTargetId] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-surface-card border-2 border-surface-border rounded-lg shadow-tactile p-6 text-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 bg-brand-orange/20 border border-brand-orange text-brand-orange rounded">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg">CONTENT RIGHTS & DMCA</h3>
            <p className="font-mono text-xs text-zinc-400">Strict Creator Authorization Policy</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-brand-neon mx-auto" />
            <h4 className="font-display font-bold text-lg">Notice Received</h4>
            <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Ticket <span className="font-mono text-brand-neon">DMCA-{Date.now().toString().slice(-6)}</span> has been registered. 
              Our compliance team reviews reports within 24 hours. The flagged item has been placed under temporary review hold.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-streetwear-primary py-2 px-6 text-xs mt-4"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-surface-black border border-surface-border rounded text-xs text-zinc-300 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-white font-mono">
                <AlertTriangle className="w-3.5 h-3.5 text-brand-neon" />
                OUR AUTHORIZATION MANDATE
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400">
                WearGram strictly prohibits unauthorized reproduction of third-party intellectual property.
                Every drop requires authenticated Meta OAuth connection and explicit digital rights sign-off by the original creator.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Product URL or ID to flag:
              </label>
              <input
                type="text"
                required
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                placeholder="e.g. /product/p1 or THE OVERSIZED CHAOS TEE"
                className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Copyright Owner / Entity Name:
              </label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g. John Doe / Studio Archive Ltd."
                className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Your Contact Email:
              </label>
              <input
                type="email"
                required
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder="rights@yourdomain.com"
                className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                Infringement Description:
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe why you believe this design infringes your registered copyright..."
                className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn-streetwear-secondary py-2 px-4 text-xs"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="btn-streetwear-primary py-2 px-4 text-xs"
              >
                SUBMIT NOTICE
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
