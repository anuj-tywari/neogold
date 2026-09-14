"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import TransactionReceipt from '@/app/components/TransactionReceipt';

export default function RedeemSuccessPage() {
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(true);
  
  // Get transaction ID from URL param or use default
  const transactionId = searchParams.get('id') || 'REDEEM123456';
  
  // Mock transaction for demonstration
  const transaction = {
    transactionId: transactionId,
    date: new Date().toISOString(),
    quantity: 10, // grams
    rate: 6245, // price per gram
    totalAmount: 67645, // including all charges
    productType: 'Gold Coin',
    deliveryAddress: '123 Main Street, Bangalore, Karnataka, 560001, India',
    estimatedDelivery: '5-7 Business Days',
    type: 'redeem' as const
  };
  
  // Show confetti effect for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 animate-fadeIn">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="animate-fall absolute w-3 h-3"
              style={{
                top: `-20px`,
                left: `${Math.random() * 100}%`,
                background: `${['#FFD700', '#FFA500', '#9370DB', '#3498DB'][Math.floor(Math.random() * 4)]}`,
                borderRadius: `${Math.random() > 0.5 ? '50%' : '0'}`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Redemption Successful!</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Your physical gold redemption has been confirmed. Your order is now being processed for delivery.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Order Confirmed</h2>
                  <p className="text-white/80 text-sm">Your physical gold is on its way</p>
                </div>
                <div className="h-16 w-16 relative">
                  <Image 
                    src="/images/gold-coin.png" 
                    alt="Gold Coin"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Order has been placed successfully</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Estimated delivery: {transaction.estimatedDelivery}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                You will receive an email with tracking information once your order ships. Please keep this receipt for your records.
              </p>
              
              <TransactionReceipt transaction={transaction} />
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/dashboard" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-center text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
                  Go to Dashboard
                </Link>
                <Link href="/redeem" className="flex-1 text-center py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300">
                  Redeem More Gold
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 