import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const { amount, merchantName, upiId } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500">Your payment has been verified</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Amount Paid</p>
            <p className="text-lg font-bold text-gray-800">₹{amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;