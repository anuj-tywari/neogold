"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BuySummaryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // In a real app, this would come from the previous page or context
  const transactionDetails = {
    quantity: 2.5, // grams
    rate: 6245, // price per gram
    totalAmount: 15612.5, // quantity * rate
    transactionId: 'BUY' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toISOString(),
    paymentMethod: 'UPI',
  };

  const handleConfirm = () => {
    setLoading(true);
    
    // Simulate API call with 70% success rate
    setTimeout(() => {
      const isSuccess = Math.random() < 0.7;
      
      if (isSuccess) {
        // Navigate to success page with transaction details
        router.push(`/buy/success?id=${transactionDetails.transactionId}`);
      } else {
        // Navigate to failure page
        router.push('/buy/failure');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/buy" className="text-primary hover:text-primary-dark mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Order Summary</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <h2 className="text-xl font-semibold">Purchase Details</h2>
              <p className="text-white/80 text-sm">Review your gold purchase before confirming</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium">{transactionDetails.transactionId}</span>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-medium">{new Date(transactionDetails.date).toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">Gold Quantity</span>
                <span className="font-medium">{transactionDetails.quantity} grams</span>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">Gold Rate</span>
                <span className="font-medium">₹{transactionDetails.rate}/gram</span>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">{transactionDetails.paymentMethod}</span>
              </div>
              
              <div className="flex items-center justify-between py-4 mt-2">
                <span className="text-lg font-semibold text-primary">Total Amount</span>
                <span className="text-xl font-bold text-primary">₹{transactionDetails.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6">
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Important Notes</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Your gold will be securely stored in our vaults and associated with your account.
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    You can sell your gold anytime at the current market rate.
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    You can also redeem physical gold from your digital gold balance.
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className={`flex-1 bg-accent hover:bg-accent-light text-primary font-medium py-3 px-6 rounded-lg transition-all duration-300 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm Purchase'
                  )}
                </button>
                
                <Link href="/buy" className="flex-1 text-center py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 