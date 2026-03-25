import React from 'react';
import { CheckCircle, TriangleAlert } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Successful() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || "N/A";

  return (
    <div className="min-h-screen bg-dark-bg party-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-pink/5 blur-[150px] animate-disco-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="party-card rounded-2xl p-8 max-w-md w-full mx-auto text-center animate-fade-in relative z-10">
        <div className="mb-4 text-4xl">🎉🪩🎶</div>
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center animate-bounce">
            <CheckCircle className="w-12 h-12 text-neon-green" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Registration Successful!
        </h1>
        <div className="space-y-4 mb-8">
          <p className="text-gray-400">
            Thank you for registering for Truba Fest 2026! Your registration has been confirmed. 🎉
          </p>

          <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-4">
            <p className="text-neon-green">
              A confirmation email has been sent to your registered email address with all the event details.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/payment', { state: { totalAmount } })}
            className="btn-party w-full font-semibold py-3 px-6 rounded-xl"
          >
            <span>🎉 Continue For Payment</span>
          </button>
          <div className="flex items-center gap-2 bg-neon-yellow/5 border border-neon-yellow/20 rounded-xl p-3">
            <TriangleAlert className="w-6 h-6 text-neon-yellow flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm text-neon-yellow/80">
                Note: If you have not paid for the registration you will be marked as unregistered for the event
              </p>
              <p className="text-lg font-bold text-neon-cyan mt-2">
                Total Amount to Pay: ₹{totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Successful;