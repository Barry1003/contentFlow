"use client";

import React, { useState } from 'react';
import { CreditCard, MessageCircle, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { processCheckout } from '../../app/actions/checkout';

export const CheckoutClient: React.FC = () => {
  const [method, setMethod] = useState<'website' | 'dm' | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock product info
  const product = {
    name: 'Content Creator Masterclass & Templates',
    price: 49.99,
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) return;

    if (method === 'dm') {
      const message = `Hi! I'd like to purchase: ${product.name}. My name is ${customerName}, email is ${customerEmail}, delivery address is ${deliveryAddress}.`;
      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setIsSuccess(true);
      return;
    }

    setIsProcessing(true);
    try {
      await processCheckout({
        customerName,
        customerEmail,
        deliveryAddress,
        paymentMethod: 'WEBSITE',
        productId: 'prod_123',
        totalAmount: product.price,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200 dark:border-slate-800">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Confirmed!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {method === 'dm' 
              ? "You've been redirected to WhatsApp to complete your payment."
              : "Thank you for your purchase! A confirmation email and receipt has been sent to you."}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Secure Checkout</h1>
        <p className="text-slate-600 dark:text-slate-400">Complete your purchase securely</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 h-fit">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Order Summary</h2>
          <div className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400">{product.name}</span>
            <span className="font-semibold text-slate-900 dark:text-white">${product.price}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="font-bold text-slate-900 dark:text-white">Total</span>
            <span className="font-bold text-xl text-slate-900 dark:text-white">${product.price}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Your Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                required
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                required
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Delivery Address</label>
              <textarea
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all resize-none"
                placeholder="123 Creator St..."
                rows={3}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Payment Method</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMethod('website')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  method === 'website' 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-500/50'
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="font-medium">Pay on Website</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('dm')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  method === 'dm' 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-500/50'
                }`}
              >
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">Pay via DM</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!method || isProcessing}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {method === 'dm' ? 'Proceed to WhatsApp' : 'Complete Purchase'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
