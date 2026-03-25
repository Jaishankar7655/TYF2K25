import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { Camera, Download, CheckCircle } from 'lucide-react';

const PaymentConfirm = () => {
  const location = useLocation();
  const [token, setToken] = useState('');
  const confirmationRef = useRef(null);
  const { transactionId, amount } = location.state || {};
  const studentData = location.state?.studentData || {};

  useEffect(() => {
    const timestamp = new Date().getTime();
    const uniqueToken = `TYF${timestamp.toString(36)}${transactionId.slice(-4)}`.toUpperCase();
    setToken(uniqueToken);
  }, [transactionId]);

  const handleDownloadScreenshot = async () => {
    if (confirmationRef.current) {
      try {
        const canvas = await html2canvas(confirmationRef.current);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `payment-confirmation-${token}.png`;
        link.click();
      } catch (error) {
        console.error('Error generating screenshot:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg party-bg py-12 px-4 relative overflow-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[150px] animate-disco-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div 
          ref={confirmationRef}
          className="party-card rounded-2xl p-8"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎉🪩🎶</div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-neon-green" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-400">
              Thank you for registering for Truba Fest 2026 🎉
            </p>
          </div>

          {/* Token Display */}
          <div className="bg-dark-surface/80 border border-neon-cyan/20 rounded-xl p-6 mb-6">
            <h2 className="text-sm text-gray-400 mb-1">Confirmation Token</h2>
            <p className="text-2xl font-mono font-bold text-neon-cyan">{token}</p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="border-b border-neon-purple/10 pb-4">
              <h3 className="text-lg font-semibold text-white mb-4">Transaction Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Amount Paid</p>
                  <p className="font-semibold text-neon-yellow">₹{amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Transaction ID</p>
                  <p className="font-semibold text-white">{transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date & Time</p>
                  <p className="font-semibold text-white">
                    {new Date().toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-neon-green font-semibold">✅ Confirmed</p>
                </div>
              </div>
            </div>

            {/* Student Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Student Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="font-semibold text-white">{studentData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold text-white">{studentData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-semibold text-white">{studentData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">College</p>
                  <p className="font-semibold text-white">{studentData.college}</p>
                </div>
              </div>
            </div>

            {/* Registered Events */}
            {studentData.events && studentData.events.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Registered Events</h3>
                <div className="grid grid-cols-2 gap-2">
                  {studentData.events.map((event, index) => (
                    <div key={index} className="bg-dark-surface/80 border border-neon-purple/10 p-2 rounded-lg text-gray-300 text-sm">
                      🎉 {event}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Screenshot Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadScreenshot}
            className="btn-party flex items-center space-x-2 px-6 py-3 rounded-xl font-medium"
          >
            <Camera className="w-5 h-5" />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirm;