"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context';

export default function SellGoldPage() {
  const [grams, setGrams] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [calculationMode, setCalculationMode] = useState<'grams' | 'amount'>('grams');
  const [loading, setLoading] = useState(false);
  const [currentRate, setCurrentRate] = useState(6165); // Slightly lower than buying rate
  const [availableGold, setAvailableGold] = useState(2.5); // Mock user's gold holdings
  const { user, requireAuth } = useAuth();

  // Calculate the equivalent value whenever one changes
  useEffect(() => {
    if (calculationMode === 'grams' && grams) {
      const calculatedAmount = (parseFloat(grams) * currentRate).toFixed(2);
      setAmount(calculatedAmount);
    } else if (calculationMode === 'amount' && amount) {
      const calculatedGrams = (parseFloat(amount) / currentRate).toFixed(4);
      setGrams(calculatedGrams);
    }
  }, [grams, amount, calculationMode, currentRate]);

  const handleGramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculationMode('grams');
    const value = e.target.value;
    
    // Ensure grams cannot exceed available balance
    if (value && parseFloat(value) > availableGold) {
      setGrams(availableGold.toString());
    } else {
      setGrams(value);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculationMode('amount');
    const value = e.target.value;
    const calculatedGrams = value ? parseFloat(value) / currentRate : 0;
    
    // Ensure converted grams don't exceed available balance
    if (calculatedGrams > availableGold) {
      const maxAmount = (availableGold * currentRate).toFixed(2);
      setAmount(maxAmount);
    } else {
      setAmount(value);
    }
  };

  const toggleCalculationMode = () => {
    setCalculationMode(calculationMode === 'grams' ? 'amount' : 'grams');
  };

  const handleSell = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If user is not authenticated, require auth will redirect to login
    if (!requireAuth('/sell')) return;
    
    // Validate input
    if (!grams || parseFloat(grams) <= 0 || parseFloat(grams) > availableGold) {
      return;
    }
    
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      alert(`You have successfully sold ${grams} grams of gold for ₹${amount}`);
      setGrams('');
      setAmount('');
      // In a real app, you would update the user's balance here
      setAvailableGold(prev => prev - parseFloat(grams));
    }, 1500);
  };

  // Allow selling max available gold
  const handleSellMax = () => {
    setCalculationMode('grams');
    setGrams(availableGold.toString());
    setAmount((availableGold * currentRate).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="md:w-1/2 order-2 md:order-1">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Sell Your Digital Gold
              </h1>
              <p className="text-gray-600 mb-8 bg-gradient-to-r from-accent/10 to-primary/5 rounded-lg p-4 border-l-4 border-accent shadow-sm">
                <span className="font-medium text-primary">Sell your digital gold instantly at the best rates.</span> Your funds will be credited to your registered bank account within 24 hours.
              </p>
              
              <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-primary">Current Selling Rate</h2>
                  <div className="flex items-center text-green-500 bg-green-50 px-3 py-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">₹{currentRate}/g</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div>
                      <span className="text-sm text-gray-500">Available Balance</span>
                      <div className="flex items-center">
                        <span className="text-xl font-semibold text-primary">{availableGold.toFixed(4)} g</span>
                        <span className="ml-2 text-gray-500">≈ ₹{(availableGold * currentRate).toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleSellMax}
                      className="text-sm bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Sell Max
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mb-4">
                  <button 
                    onClick={toggleCalculationMode} 
                    className="text-sm bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors flex items-center"
                  >
                    {calculationMode === 'grams' ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sell in Rupees
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sell in Grams
                      </>
                    )}
                  </button>
                </div>
                
                <form onSubmit={handleSell} className="space-y-6">
                  {calculationMode === 'grams' ? (
                    <div>
                      <label htmlFor="grams" className="block text-sm font-medium text-gray-700 mb-1">
                        Gold in Grams (g)
                      </label>
                      <input
                        type="number"
                        id="grams"
                        name="grams"
                        value={grams}
                        onChange={handleGramsChange}
                        placeholder="Enter gold weight"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary focus:ring-2 focus:ring-opacity-50 transition-all duration-300"
                        min="0.0001"
                        max={availableGold}
                        step="any"
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount in Rupees (₹)
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount in rupees"
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary focus:ring-2 focus:ring-opacity-50 transition-all duration-300"
                        min="0"
                        step="any"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center my-2">
                    <div className="w-full border-t border-gray-300"></div>
                    <div className="px-3 bg-white">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent-light flex items-center justify-center shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM5 13a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  
                  {calculationMode === 'grams' ? (
                    <div>
                      <label htmlFor="amount-result" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount in Rupees (₹)
                      </label>
                      <input
                        type="number"
                        id="amount-result"
                        value={amount}
                        readOnly
                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-all duration-300"
                        step="any"
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="grams-result" className="block text-sm font-medium text-gray-700 mb-1">
                        Gold in Grams (g)
                      </label>
                      <input
                        type="number"
                        id="grams-result"
                        value={grams}
                        readOnly
                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm transition-all duration-300"
                        step="any"
                      />
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading || !grams || parseFloat(grams) <= 0 || parseFloat(grams) > availableGold}
                      className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-primary bg-accent hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Sell Now'
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-xs text-gray-500">
                  <p>* Sell instantly at live market rates</p>
                  <p>* Proceeds will be credited to your registered bank account</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative">
                <div className="bg-primary rounded-lg shadow-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-accent">How to Sell Digital Gold</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-accent">Enter Sell Amount</h4>
                        <p className="text-white/80 text-sm">Specify how much gold you want to sell (in grams or rupees)</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-accent">Confirm Rate</h4>
                        <p className="text-white/80 text-sm">Review the current selling rate and total payout</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-accent">Confirm Sale</h4>
                        <p className="text-white/80 text-sm">Verify transaction details and approve the sale</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-accent">Receive Payment</h4>
                        <p className="text-white/80 text-sm">Amount credited to your bank account within 24 hours</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-accent text-primary text-sm font-bold py-2 px-4 rounded-full shadow-lg">
                  Best Selling Rates
                </div>
              </div>
              
              <div className="mt-12 bg-primary-light rounded-lg shadow-lg p-6 text-white animate-on-scroll">
                <h3 className="text-xl font-semibold mb-4 text-accent">Selling Process Benefits</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                      <span className="text-accent font-semibold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Competitive Rates</h4>
                      <p className="text-white/80 text-sm">Get the best market rates for your digital gold</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                      <span className="text-accent font-semibold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Instant Processing</h4>
                      <p className="text-white/80 text-sm">Your sell request is processed immediately</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                      <span className="text-accent font-semibold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Zero Fees</h4>
                      <p className="text-white/80 text-sm">No hidden charges or transaction fees</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 border border-accent">
                      <span className="text-accent font-semibold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Secure Transfer</h4>
                      <p className="text-white/80 text-sm">Funds securely transferred to your bank account</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary mb-2">When will I receive my money?</h3>
                <p className="text-gray-600">Funds are typically credited to your registered bank account within 24 hours of completing the sale.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary mb-2">Are there any charges for selling?</h3>
                <p className="text-gray-600">There are no processing or transaction fees. The selling price reflects the market rate at the time of sale.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary mb-2">Can I sell partial gold holdings?</h3>
                <p className="text-gray-600">Yes, you can sell any amount of gold from your holdings, starting from as little as 0.0001 grams.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-primary mb-2">How is the selling price determined?</h3>
                <p className="text-gray-600">The selling price is based on the current market rate for 24K gold, ensuring you get the best value for your digital gold.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}