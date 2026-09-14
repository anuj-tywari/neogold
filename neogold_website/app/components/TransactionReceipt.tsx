"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';

export type TransactionType = 'buy' | 'sell' | 'redeem';

export interface TransactionDetails {
  transactionId: string;
  date: string;
  quantity: number;
  rate: number;
  totalAmount: number;
  paymentMethod?: string;
  address?: string;
  deliveryDate?: string;
  bankAccount?: string;
  type: TransactionType;
  productType?: string;
  deliveryAddress?: string;
  estimatedDelivery?: string;
}

interface TransactionReceiptProps {
  transaction: TransactionDetails;
}

export default function TransactionReceipt({ transaction }: TransactionReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `NeoGold_Receipt_${transaction.transactionId}`,
  });
  
  const formattedDate = format(new Date(transaction.date), 'dd MMM yyyy, hh:mm a');
  const formattedRate = new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 2 
  }).format(transaction.rate);
  
  const formattedTotal = new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 2 
  }).format(transaction.totalAmount);
  
  const getTypeLabel = () => {
    switch(transaction.type) {
      case 'buy': return 'Purchase';
      case 'sell': return 'Sale';
      case 'redeem': return 'Redemption';
    }
  };
  
  const getTypeColor = () => {
    switch(transaction.type) {
      case 'buy': return 'text-green-600';
      case 'sell': return 'text-blue-600';
      case 'redeem': return 'text-purple-600';
    }
  };
  
  const getTypeIcon = () => {
    switch(transaction.type) {
      case 'buy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'sell':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'redeem':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-2xl mx-auto">
      <div className="flex justify-end p-4">
        <button 
          onClick={() => handlePrint()}
          className="flex items-center text-primary hover:text-primary-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
          </svg>
          Print Receipt
        </button>
      </div>
      
      <div ref={receiptRef} className="p-6">
        <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image 
                src="/logo.svg" 
                alt="NeoGold Logo" 
                width={40} 
                height={40}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">NeoGold</h2>
              <p className="text-gray-500 text-sm">Digital Gold Platform</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center">
              {getTypeIcon()}
              <span className={`ml-2 font-bold ${getTypeColor()}`}>
                Gold {getTypeLabel()}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Receipt #{transaction.transactionId}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Transaction Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Transaction Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">Transaction ID</p>
              <p className="font-medium">{transaction.transactionId}</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">Gold Quantity</p>
              <p className="font-medium">{transaction.quantity} grams</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">Gold Rate</p>
              <p className="font-medium">{formattedRate}</p>
            </div>
            
            {transaction.type === 'buy' && transaction.paymentMethod && (
              <div>
                <p className="text-gray-500 text-sm">Payment Method</p>
                <p className="font-medium">{transaction.paymentMethod}</p>
              </div>
            )}
            
            {transaction.type === 'sell' && transaction.bankAccount && (
              <div>
                <p className="text-gray-500 text-sm">Bank Account</p>
                <p className="font-medium">{transaction.bankAccount}</p>
              </div>
            )}
            
            {transaction.type === 'redeem' && transaction.deliveryAddress && (
              <div className="col-span-2">
                <p className="text-gray-500 text-sm">Delivery Address</p>
                <p className="font-medium">{transaction.deliveryAddress}</p>
              </div>
            )}
            
            {transaction.type === 'redeem' && transaction.estimatedDelivery && (
              <div>
                <p className="text-gray-500 text-sm">Estimated Delivery</p>
                <p className="font-medium">{transaction.estimatedDelivery}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 pb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formattedTotal}</span>
          </div>
          
          {transaction.type === 'buy' && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">GST (3%)</span>
              <span className="font-medium">₹{(transaction.totalAmount * 0.03).toFixed(2)}</span>
            </div>
          )}
          
          {transaction.type === 'redeem' && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Making Charges (8%)</span>
              <span className="font-medium">₹{(transaction.totalAmount * 0.08).toFixed(2)}</span>
            </div>
          )}
          
          {transaction.type === 'redeem' && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-medium">₹199.00</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total Amount</span>
            <span className="text-xl font-bold text-primary">
              {transaction.type === 'buy'
                ? `₹${(transaction.totalAmount * 1.03).toFixed(2)}`
                : transaction.type === 'redeem'
                  ? `₹${(transaction.totalAmount * 1.08 + 199).toFixed(2)}`
                  : `₹${transaction.totalAmount.toFixed(2)}`
              }
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Thank you for choosing NeoGold!</p>
          <p className="text-gray-400 text-xs">This is a computer-generated receipt and does not require a signature.</p>
        </div>
      </div>
    </div>
  );
} 