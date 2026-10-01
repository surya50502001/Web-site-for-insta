'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { submitOrder, calculateRevenueBreakdown } from '@/lib/api';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalAmount } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [customerName, setCustomerName] = useState('Rahul Verma');
  const [customerEmail, setCustomerEmail] = useState('rahul@streetwear.in');
  const [shippingAddress, setShippingAddress] = useState('Flat 402, Skyline Residency, Bandra West, Mumbai, MH 400050');
  const [customerPhone, setCustomerPhone] = useState('+91 98200 12345');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = totalAmount >= 999 || totalAmount === 0 ? 0 : 79;
  const finalTotal = totalAmount + shippingCost;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const firstItem = items[0];
      const result = await submitOrder({
        productId: firstItem.productId,
        designArtworkId: firstItem.designId,
        artworkGraphicUrl: firstItem.graphicUrl,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        selectedColor: firstItem.color,
        selectedSize: firstItem.size,
        quantity: items.reduce((s, i) => s + i.quantity, 0),
        totalAmount: finalTotal,
      });

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF4E00', '#FFFFFF', '#2563EB'],
      });

      setOrderSuccess(result);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckingOut(false);
    setOrderSuccess(null);
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-surface-card border-l-2 border-surface-border flex flex-col justify-between shadow-2xl text-white"
            >
              {/* Header */}
              <div className="p-5 bg-surface-black border-b border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-brand-neon rounded text-surface-black">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base tracking-tight">
                      YOUR MERCH BAG
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400">
                      {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'} • PRINTED ON DEMAND
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Success Screen */}
              {orderSuccess ? (
                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-brand-neon/20 border-2 border-brand-neon rounded-full flex items-center justify-center mx-auto text-brand-neon">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="sticker-tag bg-brand-neon text-surface-black font-bold">
                      ORDER CONFIRMED
                    </span>
                    <h3 className="font-display font-extrabold text-2xl tracking-tight text-white">
                      DROP IS LOCKED IN!
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Order #{orderSuccess.orderNumber}
                    </p>
                  </div>

                  {/* Streetwear Receipt Ticket */}
                  <div className="p-4 bg-surface-black border-2 border-dashed border-surface-border rounded-lg space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-surface-border pb-2 text-zinc-400">
                      <span>POD DISPATCH JOB</span>
                      <span className="text-brand-neon font-bold">{orderSuccess.podJobId}</span>
                    </div>
                    <div className="flex justify-between border-b border-surface-border pb-2 text-zinc-400">
                      <span>TRACKING NUMBER</span>
                      <span className="text-white">{orderSuccess.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-surface-border pb-2 text-zinc-400">
                      <span>ESTIMATED DELIVERY</span>
                      <span className="text-white">3-5 BUSINESS DAYS</span>
                    </div>

                    {/* Creator Profit Transparency Callout */}
                    {orderSuccess.revenueBreakdown && (
                      <div className="mt-3 p-3 bg-surface-panel rounded border border-white/10 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-brand-neon font-bold text-[11px]">
                          <Sparkles className="w-3.5 h-3.5" />
                          CREATOR REVENUE SHARE
                        </div>
                        <div className="text-[11px] text-zinc-300">
                          ₹{orderSuccess.revenueBreakdown.creatorProfit} went straight to the creator. Thank you for fueling authentic creator culture!
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full btn-streetwear-primary py-3 text-xs"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : isCheckingOut ? (
                /* Checkout Form Screen */
                <form onSubmit={handlePlaceOrder} className="p-6 flex-1 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                    <span className="font-display font-bold text-sm">SHIPPING DETAILS</span>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs text-brand-neon underline font-mono"
                    >
                      ← Back to Bag
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Mobile Number (for Courier SMS updates)
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Complete Shipping Address
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-black border border-surface-border rounded text-sm text-white focus:border-brand-neon outline-none text-xs leading-relaxed"
                    />
                  </div>

                  <div className="p-3 bg-surface-black border border-surface-border rounded space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>SUBTOTAL</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>SHIPPING</span>
                      <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold border-t border-surface-border pt-1.5 text-sm">
                      <span>TOTAL PAYABLE</span>
                      <span className="text-brand-neon">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-streetwear-primary py-3 text-xs justify-center font-bold tracking-wider"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        PROCESSING SECURE ORDER...
                      </span>
                    ) : (
                      `PAY ₹${finalTotal} & DISPATCH`
                    )}
                  </button>
                </form>
              ) : (
                /* Cart Items List */
                <div className="p-5 flex-1 overflow-y-auto space-y-4">
                  {items.length === 0 ? (
                    <div className="py-16 text-center space-y-3">
                      <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                      <p className="font-display font-bold text-lg text-zinc-400">
                        YOUR BAG IS EMPTY
                      </p>
                      <p className="text-xs text-zinc-500 font-mono">
                        Swipe designs on 3D shirts and pick your favorite creator drop.
                      </p>
                      <button
                        onClick={handleClose}
                        className="btn-streetwear-secondary py-2 px-5 text-xs mt-2"
                      >
                        EXPLORE DROPS
                      </button>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-surface-black border border-surface-border rounded flex gap-3 relative group"
                      >
                        {/* Mini preview */}
                        <div className="w-20 h-20 bg-surface-panel rounded overflow-hidden flex-shrink-0 border border-white/10">
                          <img
                            src={item.graphicUrl}
                            alt={item.designTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] text-brand-neon uppercase font-bold">
                                @{item.creatorUsername}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-zinc-500 hover:text-red-400 p-1"
                                title="Remove"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h4 className="font-display font-bold text-xs text-white line-clamp-1">
                              {item.designTitle}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-400">
                              <span>SIZE: {item.size}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <span>COLOR:</span>
                                <span
                                  className="w-3 h-3 rounded-full border border-white/30 inline-block"
                                  style={{ backgroundColor: item.color }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-surface-border">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-surface-card border border-surface-border px-1.5 py-0.5 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-zinc-400 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold px-1 text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-zinc-400 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-display font-bold text-sm text-white">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Bottom Checkout Action */}
              {!orderSuccess && !isCheckingOut && items.length > 0 && (
                <div className="p-5 bg-surface-black border-t border-surface-border space-y-3">
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>BAG SUBTOTAL</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>SHIPPING</span>
                      <span className={shippingCost === 0 ? 'text-brand-neon font-bold' : ''}>
                        {shippingCost === 0 ? 'FREE (ORDERS OVER ₹999)' : `₹${shippingCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-base border-t border-surface-border pt-2">
                      <span>TOTAL PAYABLE</span>
                      <span className="text-brand-neon">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full btn-streetwear-primary py-3 text-xs justify-center"
                  >
                    PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" /> 48H DISPATCH
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> SECURE CHECKOUT
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
