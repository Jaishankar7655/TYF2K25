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

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxvcS7iar05au5XtfX8J8H91D_heVbcLzqIi80eZ7OsFdUGrsJjyjZJn0zgItlUy0VP/exec";

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

          // Calculate new dimensions
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200;

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
          resolve(canvas.toDataURL("image/jpeg", 0.7));
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
      const filename = `payment_${phoneNumber}_${timestamp}.jpg`;

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          phone: phoneNumber.trim(),
          imageData: compressedImage,
          filename: filename,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to submit payment details");
      }

      setPaymentSuccess(true);
      setTimeout(() => {
        navigate("/paymentSuccess", {
          state: { amount: totalAmount },
        });
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Failed to submit. Please check your internet connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of your JSX remains the same...
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 px-4">
      {/* Existing JSX remains the same */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl">
        <div className="p-6 border-b border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
          <p className="text-gray-500 mt-1">{merchantDetails.name}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center bg-orange-50 py-4 rounded-lg">
            <p className="text-sm text-gray-600">Amount to Pay</p>
            <p className="text-4xl font-bold text-orange-600">₹{totalAmount}</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">UPI ID</p>
                <p className="text-base font-medium text-gray-700">
                  {merchantDetails.upiId}
                </p>
              </div>
              <button
                onClick={handleCopyUpiId}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Copy UPI ID"
                type="button"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="text-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                paymentLinks.upi
              )}&size=150x150`}
              alt="UPI QR Code"
              className="mx-auto rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                setError(
                  "Failed to load QR code. Please use the UPI ID above."
                );
              }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                pattern="[0-9]{10}"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Upload Payment Screenshot*
              </p>
              <label
                htmlFor="screenshot"
                className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-orange-500 transition-colors"
              >
                <Camera className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-500">
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
            </div>

            {paymentSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-center">
                  Payment details submitted successfully! Redirecting...
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !screenshot}
              className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Submit Payment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
