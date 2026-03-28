import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, Loader, Copy, Check, AlertCircle } from "lucide-react";

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState(location.state?.phone || "");
  const [totalAmount] = useState(location.state?.totalAmount || "0");
  const [screenshot, setScreenshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZNVEQwvtv4EQjRlH05z8uT66CgMW043akdGp3ca8I9ZXvYOWVfC58ME-9WAkH4nKS/exec";

  const merchantDetails = {
    name: "TRUBA PROVISIONAL ADMISSION POOL ACCOUNT",
    upiId: "8103571179m@pnb",
  };

  const paymentLinks = {
    upi: `upi://pay?pa=${merchantDetails.upiId}&am=${totalAmount}&cu=INR`,
  };

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(merchantDetails.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy UPI ID");
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.4));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size too large. Please upload an image under 10MB");
        return;
      }
      setScreenshot(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !screenshot) {
      setError("Please fill all required fields");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber.trim())) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const compressedImage = await compressImage(screenshot);
      const timestamp = new Date().getTime();
      const filename = `payment_${phoneNumber.trim()}_${timestamp}.jpg`;
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          phone: phoneNumber.trim(),
          imageData: compressedImage,
          filename: filename,
        }),
      });
      if (response.type === "opaque" || response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setPaymentSuccess(true);
        setTimeout(() => {
          navigate("/paymentSuccess", {
            state: { amount: totalAmount },
          });
        }, 1500);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to submit. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg party-bg py-8 px-4 relative overflow-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-neon-yellow/5 blur-[150px] animate-disco-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-neon-pink/5 blur-[150px] animate-disco-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md mx-auto party-card rounded-2xl relative z-10">
        <div className="p-6 border-b border-neon-purple/20 text-center">
          <div className="text-3xl mb-2">💳🎉</div>
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <p className="text-gray-400 mt-1 text-sm">{merchantDetails.name}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center bg-neon-yellow/5 border border-neon-yellow/20 py-4 rounded-xl">
            <p className="text-sm text-gray-400">Amount to Pay</p>
            <p className="text-4xl font-black text-neon-yellow">₹{totalAmount}</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-300 p-4 rounded-xl">
              <AlertCircle className="w-5 h-5 text-neon-pink" />
              <p>{error}</p>
            </div>
          )}

          <div className="bg-dark-surface/80 rounded-xl p-4 border border-neon-purple/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">UPI ID</p>
                <p className="text-base font-medium text-neon-cyan">
                  {merchantDetails.upiId}
                </p>
              </div>
              <button
                onClick={handleCopyUpiId}
                className="p-2 hover:bg-neon-purple/10 rounded-full transition-colors"
                title="Copy UPI ID"
                type="button"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-neon-green" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block p-3 bg-white rounded-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  paymentLinks.upi
                )}&size=150x150`}
                alt="UPI QR Code"
                className="mx-auto rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  setError("Failed to load QR code. Please use the UPI ID above.");
                }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit phone number"
                className="w-full px-3 py-2 bg-dark-surface/80 border border-neon-purple/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-transparent placeholder-gray-500"
                required
                pattern="[0-9]{10}"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">
                Upload Payment Screenshot*
              </p>
              <label
                htmlFor="screenshot"
                className="block w-full p-4 border-2 border-dashed border-neon-purple/30 rounded-xl text-center cursor-pointer hover:border-neon-pink/50 transition-colors bg-dark-surface/30"
              >
                <Camera className="w-6 h-6 mx-auto mb-2 text-neon-purple" />
                <span className="text-sm text-gray-400">
                  {screenshot ? screenshot.name : "Click to upload screenshot"}
                </span>
                <input
                  type="file"
                  id="screenshot"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  className="hidden"
                />
              </label>
              <span className="text-neon-pink text-[13px]">*Kindly Attach ScreenShot</span>
            </div>

            {paymentSuccess && (
              <div className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                <p className="text-neon-green text-center">
                  🎉 Payment details submitted successfully! Redirecting...
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !screenshot}
              className="btn-party w-full py-3 px-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                <span>🎉 Submit Payment</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
