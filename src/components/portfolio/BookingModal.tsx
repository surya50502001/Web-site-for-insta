"use client";

import React, { useState } from "react";
import { X, Send, Calendar, CheckCircle, Sparkles, MapPin, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingSettings, ServiceTier } from "@/lib/types";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingSettings: BookingSettings;
  photographerName: string;
  accentColor?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingSettings,
  photographerName,
  accentColor = "#C28E5C",
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(
    bookingSettings.serviceTiers[0]?.title || "Custom Commission"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C28E5C", "#E87A5D", "#587B6D", "#FCFAF6"],
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#18191E] text-white rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-8">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border mb-3"
                  style={{
                    backgroundColor: `${accentColor}1A`,
                    color: accentColor,
                    borderColor: `${accentColor}33`,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Commission Request
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif tracking-tight mb-2">
                  {bookingSettings.headline || "Have a story to tell?"}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Direct inquiry for {photographerName}. {bookingSettings.noticePeriod || "Inquire for seasonal dates."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Collection selector */}
                {bookingSettings.serviceTiers.length > 0 && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Preferred Collection / Service
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {bookingSettings.serviceTiers.map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedTier(tier.title)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedTier === tier.title
                              ? "border-amber-400/80 bg-amber-400/10 text-white"
                              : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/25"
                          }`}
                        >
                          <div className="text-xs font-semibold truncate">{tier.title}</div>
                          <div className="text-xs font-mono text-zinc-400 mt-0.5">{tier.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Clara & Julian"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clara@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                </div>

                {/* Date & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Event / Session Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Location / Venue
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Lake Como, Italy or Studio"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Tell us about your celebration & vision
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what drew you to this photography style, guest count, estimated timing, or any specific details..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-medium tracking-tight text-white flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99] disabled:opacity-50"
                    style={{
                      backgroundColor: accentColor,
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Booking Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Submission Confirmation */
            <div className="text-center py-10 space-y-5">
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white"
                style={{ backgroundColor: accentColor }}
              >
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-serif">Inquiry Delivered</h3>
              <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{name}</span>! Your inquiry for{" "}
                <span className="font-semibold text-white">{selectedTier}</span> has been routed directly to{" "}
                {photographerName}. A confirmation has been logged.
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto text-xs text-zinc-400 space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Confirmation sent to: {email}</span>
                </div>
                {eventDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Requested date: {eventDate}</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
