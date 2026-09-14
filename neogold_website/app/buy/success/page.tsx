"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import TransactionReceipt, { TransactionDetails } from '@/app/components/TransactionReceipt';

export default function BuySuccessPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('id') || 'BUY123456';
  
  // In a real app, this would be fetched from an API based on the transaction ID
  const [transaction, setTransaction] = useState<TransactionDetails>({
    transactionId: transactionId,
    date: new Date().toISOString(),
    quantity: 2.5, // grams
    rate: 6245, // price per gram
    totalAmount: 15612.5, // quantity * rate
    paymentMethod: 'UPI',
    type: 'buy',
  });
  
  // Optional: Confetti effect on load
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 animate-fadeIn">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* This would be replaced with an actual confetti animation component */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i}
                className="absolute animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  width: `${5 + Math.random() * 10}px`,
                  height: `${5 + Math.random() * 10}px`,
                  background: ['#FFD700', '#FFC107', '#063970', '#185999'][Math.floor(Math.random() * 4)],
                  borderRadius: '50%',
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${1 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your gold purchase has been successfully processed. You can view the transaction details below.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link 
              href="/dashboard"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/buy"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Buy More Gold
            </Link>
          </div>
        </div>
        
        <TransactionReceipt transaction={transaction} />
      </div>
    </div>
  );
} 