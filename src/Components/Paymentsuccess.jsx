import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const { amount, merchantName, upiId } = location.state || {};

  return (
    <div className="min-h-screen bg-dark-bg party-bg py-8 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-cyan/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-md mx-auto party-card rounded-2xl p-8 relative z-10 text-center">
        <div className="mb-4 text-5xl">🎉🪩🎉</div>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-neon-green" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-400">Your payment has been verified 🎶</p>

        <div className="mt-6 space-y-4">
          <div className="bg-neon-green/5 border border-neon-green/20 p-4 rounded-xl">
            <p className="text-sm text-gray-400">Amount Paid</p>
            <p className="text-2xl font-black text-neon-green">₹{amount}</p>
          </div>
        </div>
        <p className="mt-6 text-neon-yellow/80 text-sm">🎉 Welcome to the party! See you at Truba Fest 2026 🎉</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;