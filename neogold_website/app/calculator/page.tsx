"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GoldCalculatorPage() {
  const [goldRate, setGoldRate] = useState(6245); // Default rate in INR per gram
  const [weight, setWeight] = useState<number>(1);
  const [purity, setPurity] = useState<number>(24);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('INR');
  const [currencyRates, setCurrencyRates] = useState({
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0096,
    AED: 0.044
  });

  // Calculate total value whenever inputs change
  useEffect(() => {
    const purityFactor = purity / 24;
    const value = weight * goldRate * purityFactor * currencyRates[currency as keyof typeof currencyRates];
    setTotalValue(parseFloat(value.toFixed(2)));
  }, [weight, goldRate, purity, currency, currencyRates]);

  const formatCurrency = (value: number): string => {
    const symbols: Record<string, string> = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
      AED: 'AED'
    };
    
    return `${symbols[currency] || ''}${value.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Gold Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use our calculator to determine the value of your gold based on weight, purity, and current market rates.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-8">
            <div className="bg-gradient-to-r from-accent to-accent-light p-6 text-primary">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Calculate Gold Value</h2>
                <div className="h-12 w-12 relative flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-10 h-10 text-primary"
                  >
                    <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12zM9 8H7v2h2V8zm0 4H7v2h2v-2zm0-8H7v2h2V4zm4 4h-2v2h2V8zm0 4h-2v2h2v-2zm0-8h-2v2h2V4zm4 8h-2v2h2v-2zm0-4h-2v2h2V8zm0-4h-2v2h2V4z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Gold Weight</label>
                  <div className="flex">
                    <input
                      type="number"
                      min="0.001"
                      step="0.001"
                      value={weight}
                      onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                      className="block w-full rounded-l-lg border border-gray-300 py-2 px-4 focus:border-primary focus:ring-primary"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      grams
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Gold Purity</label>
                  <select
                    value={purity}
                    onChange={(e) => setPurity(parseInt(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 py-2 px-4 focus:border-primary focus:ring-primary"
                  >
                    <option value={24}>24 Karat (99.9% Pure)</option>
                    <option value={22}>22 Karat (91.6% Pure)</option>
                    <option value={18}>18 Karat (75% Pure)</option>
                    <option value={14}>14 Karat (58.3% Pure)</option>
                    <option value={10}>10 Karat (41.7% Pure)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Gold Rate (per gram)</label>
                  <div className="flex">
                    <input
                      type="number"
                      min="1"
                      value={goldRate}
                      onChange={(e) => setGoldRate(parseFloat(e.target.value) || 0)}
                      className="block w-full rounded-l-lg border border-gray-300 py-2 px-4 focus:border-primary focus:ring-primary"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      ₹/g
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 py-2 px-4 focus:border-primary focus:ring-primary"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                    <option value="AED">UAE Dirham (AED)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">Estimated Gold Value:</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(totalValue)}</span>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>
                    Note: This calculation is based on current market rates and is for informational purposes only.
                    Actual buying and selling prices may vary based on market conditions and dealer margins.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Understanding Gold Calculations</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Karat System</h3>
                  <p className="text-gray-600">
                    Gold purity is measured in karats, with 24 karat being 99.9% pure gold.
                    Lower karat values indicate gold mixed with other metals to increase durability.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Value Calculation</h3>
                  <p className="text-gray-600">
                    Gold value = Weight × Current rate × Purity factor (karat/24)
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Current Market Rate</h3>
                  <p className="text-gray-600">
                    Gold prices fluctuate based on market conditions. For the most accurate calculations,
                    always use the latest gold rates.
                  </p>
                  <div className="mt-2">
                    <Link href="/rates" className="text-primary hover:text-primary-dark font-medium">
                      View Current Gold Rates →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-light rounded-lg shadow-xl p-8 text-center text-white mt-4">
            <h2 className="text-2xl font-bold mb-4">Ready to Invest in Gold?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">Start investing in digital gold today with as little as ₹1. Our platform offers you the best rates, secure storage, and easy liquidity.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a className="bg-accent hover:bg-accent-light text-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1" href="/buy">Buy Gold</a>
              <a className="border border-accent text-accent hover:bg-accent/10 px-6 py-3 rounded-lg font-medium transition-all duration-300" href="/register">Create Account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 