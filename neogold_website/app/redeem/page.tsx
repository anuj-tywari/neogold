"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

// Define product types
type ProductWeight = {
  weight: string;
  mintingCost: number;
  selected?: boolean;
};

type Product = {
  id: string;
  name: string;
  type: 'coin' | 'bar';
  description: string;
  image: string;
  weights: ProductWeight[];
};

export default function RedeemPage() {
  const { user, requireAuth } = useAuth();
  const [userGoldBalance, setUserGoldBalance] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<ProductWeight | null>(null);
  const [step, setStep] = useState<'products' | 'weight' | 'checkout' | 'success'>('products');
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Helper function to safely get user gold balance
  const getUserGoldBalance = () => {
    return userGoldBalance || 0;
  };

  // Mock gold rate (₹ per gram)
  const goldRate = 6245;

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Gold Coin',
      type: 'coin',
      description: 'Round 24K gold coin with the NeoGold logo',
      image: '/gold-coins.png',
      weights: [
        { weight: '0.5', mintingCost: 250 },
        { weight: '1', mintingCost: 350 },
        { weight: '2', mintingCost: 550 },
        { weight: '5', mintingCost: 1000 },
        { weight: '10', mintingCost: 1800 },
      ],
    },
    {
      id: '2',
      name: 'Gold Bar',
      type: 'bar',
      description: 'Rectangular 24K gold bar with the NeoGold stamp',
      image: '/icons/gold-bar-icon.svg',
      weights: [
        { weight: '1', mintingCost: 400 },
        { weight: '2', mintingCost: 600 },
        { weight: '5', mintingCost: 1200 },
        { weight: '10', mintingCost: 2000 },
        { weight: '20', mintingCost: 3500 },
      ],
    }
  ];

  useEffect(() => {
    // If user is authenticated, get gold balance
    if (user) {
      // In a real app, you would fetch the user's gold balance from an API
      // Mocking a gold balance here for demonstration
      setUserGoldBalance(3.25);
    }
  }, [user]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setStep('weight');
    setSelectedWeight(null);
  };

  const handleWeightSelect = (weight: ProductWeight) => {
    setSelectedWeight(weight);
  };

  const handleBack = () => {
    if (step === 'weight') {
      setStep('products');
    } else if (step === 'checkout') {
      setStep('weight');
    }
  };

  const handleProceedToCheckout = () => {
    // Check if user is authenticated
    if (!user) {
      // Redirect to login with current page as redirect URL
      requireAuth('/redeem');
      return;
    }
    
    if (selectedWeight) {
      setStep('checkout');
    }
  };

  const handleConfirmRedemption = () => {
    // Check if user is authenticated
    if (!user) {
      // Redirect to login with current page as redirect URL
      requireAuth('/redeem');
      return;
    }
    
    setConfirmationModalOpen(true);
  };

  const processRedemption = async () => {
    if (!selectedProduct || !selectedWeight) {
      return;
    }

    const weightValue = parseFloat(selectedWeight.weight);
    
    // Check if user has enough gold
    if (weightValue > getUserGoldBalance()) {
      setError('You do not have enough gold balance to redeem this product.');
      setConfirmationModalOpen(false);
      return;
    }
    
    setIsProcessing(true);
    setError('');

    try {
      // In a real app, you would make an API call to process the redemption
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user gold balance
      setUserGoldBalance(prevBalance => prevBalance - weightValue);
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to process your redemption. Please try again later.');
    } finally {
      setIsProcessing(false);
      setConfirmationModalOpen(false);
    }
  };

  const resetRedemption = () => {
    setSelectedProduct(null);
    setSelectedWeight(null);
    setStep('products');
    setIsSuccess(false);
  };

  // If authentication check is successful, proceed
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white text-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="text-center py-8">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Redemption Successful!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your redemption request has been successfully submitted. You can track the status of your order in your account.
              </p>
              <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto mb-8">
                <h3 className="text-lg font-semibold text-primary mb-3">Order Summary</h3>
                <div className="border-b border-gray-200 pb-3 mb-3">
                  <p className="flex justify-between mb-1">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="text-gray-800 font-medium">NGL-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </p>
                  <p className="flex justify-between mb-1">
                    <span className="text-gray-600">Product:</span>
                    <span className="text-gray-800">{selectedProduct?.name}</span>
                  </p>
                  <p className="flex justify-between mb-1">
                    <span className="text-gray-600">Weight:</span>
                    <span className="text-gray-800">{selectedWeight?.weight} grams</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">Processing</span>
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  Your order is now being processed. Estimated delivery: 7-10 business days.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => {
                    setStep('products');
                    setSelectedProduct(null);
                    setSelectedWeight(null);
                  }}
                  className="bg-white text-primary border border-gray-200 hover:border-primary py-2 px-6 rounded-lg transition-colors"
                >
                  Redeem More Gold
                </button>
                <Link 
                  href="/account/orders" 
                  className="bg-primary text-white hover:bg-primary/90 py-2 px-6 rounded-lg transition-colors"
                >
                  View Order Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Redeem Your Digital Gold</h1>
          {user && (
            <div className="bg-primary/5 py-2 px-4 rounded-lg">
              <span className="text-gray-600 mr-2">Your Gold Balance:</span>
              <span className="font-semibold text-primary">{getUserGoldBalance().toFixed(2)} grams</span>
            </div>
          )}
        </div>
        
        {/* Step indicator - only show for authenticated users in transaction flow */}
        {user && (
          <div className="mb-10">
            <div className="flex items-center justify-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'products' ? 'bg-gold text-black' : 'bg-gray-200 text-gray-700'}`}>
                1
              </div>
              <div className={`flex-1 h-1 max-w-[100px] ${step === 'products' ? 'bg-gray-200' : 'bg-gold'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'weight' ? 'bg-gold text-black' : step === 'checkout' ? 'bg-gold text-black' : 'bg-gray-200 text-gray-700'}`}>
                2
              </div>
              <div className={`flex-1 h-1 max-w-[100px] ${step === 'checkout' ? 'bg-gold' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'checkout' ? 'bg-gold text-black' : 'bg-gray-200 text-gray-700'}`}>
                3
              </div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="text-sm text-center w-20">Select Product</div>
              <div className="flex-1 max-w-[100px]"></div>
              <div className="text-sm text-center w-20">Choose Weight</div>
              <div className="flex-1 max-w-[100px]"></div>
              <div className="text-sm text-center w-20">Checkout</div>
            </div>
          </div>
        )}

        {!user && (
          <div className="bg-primary/5 rounded-lg p-6 mb-12 border border-primary/10 shadow-sm">
            <div className="flex items-center gap-3 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-primary font-medium">
                To redeem gold for physical products, please <Link href="/login?redirect=/redeem" className="text-primary underline font-semibold hover:text-accent transition-colors">log in</Link> or <Link href="/register" className="text-primary underline font-semibold hover:text-accent transition-colors">create an account</Link>.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 mb-6">
            {error}
          </div>
        )}

        {step === 'products' && (
          <div className="min-h-screen bg-white text-gray-800 animate-fadeIn">
            <div className="container mx-auto px-4 max-w-5xl">
              {/* Display user balance if they're logged in */}
              {user && (
                <div className="bg-gradient-to-r from-primary/5 to-gold/5 rounded-xl p-4 mb-8 flex items-center justify-between max-w-5xl mx-auto">
                  <div>
                    <p className="text-gray-600 text-sm">Your Gold Balance</p>
                    <p className="text-xl font-bold text-gold">{getUserGoldBalance().toFixed(3)} g</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Current Gold Rate</p>
                    <p className="text-lg font-medium text-primary">₹{goldRate.toLocaleString('en-IN')}/g</p>
                  </div>
                </div>
              )}
              
              {/* Enhanced Product Selection Cards */}
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Select Your Gold Product</h2>
                
                {/* Product selection cards with improved styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {products.map((product) => (
                    <div 
                      key={product.id} 
                      className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden transform hover:-translate-y-1 ${product.type === 'coin' ? 'bg-gradient-to-br from-white via-white to-yellow-50' : 'bg-gradient-to-br from-white via-white to-yellow-50'}`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="relative h-48 bg-gradient-to-b from-gray-50 to-yellow-50 flex items-center justify-center overflow-hidden border-b border-yellow-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/5 to-yellow-500/10 group-hover:from-yellow-300/10 group-hover:to-yellow-500/20 transition-all duration-500"></div>
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-yellow-100 text-primary font-medium text-sm">
                          999.9 Purity
                        </div>
                        {product.type === 'coin' ? (
                          <div className="relative w-36 h-36 perspective-1000">
                            {/* Coin 3D model with animations */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-light to-accent shadow-lg group-hover:shadow-xl transition-all duration-300 animate-coin-float">
                              <div className="absolute inset-0 rounded-full overflow-hidden">
                                <div className="absolute inset-4 rounded-full bg-accent border-4 border-accent-light glow-gold flex items-center justify-center">
                                  <span className="font-bold text-primary-dark text-2xl">NG</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-shine"></div>
                              </div>
                            </div>
                            
                            {/* Reflection */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-gradient-to-r from-gray-300/20 via-gray-200/30 to-gray-300/20 rounded-full blur-sm"></div>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center h-48">
                            <div className="relative w-60 h-32 perspective-1000">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-28 animate-bar-rotate">
                                {/* Gold bar with 3D effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-accent-light to-accent rounded-lg shadow-xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                                <div className="absolute inset-1 border-2 border-accent/50 rounded-md"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-primary-dark font-bold text-lg">NeoGold</span>
                                </div>
                              </div>
                              
                              {/* Shadow */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gradient-to-r from-gray-300/30 via-gray-200/40 to-gray-300/30 rounded-full blur-md"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        <div className="flex flex-col space-y-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Available weights:</p>
                            <div className="flex flex-wrap gap-2">
                              {product.weights.map((weight, index) => (
                                <span key={index} className="text-xs py-1 px-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-full font-medium">
                                  {weight.weight}g
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="self-end mt-2 flex items-center text-primary hover:text-accent transition-colors font-medium">
                            Select Product
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Product information section moved below product selection */}
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-gold/5 rounded-2xl shadow-sm p-8 mb-16">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column: Intro and Process */}
                    <div className="w-full md:w-1/2">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-primary mb-4">Convert Your Digital Gold</h2>
                        <p className="text-gray-600 mb-6">
                          Transform your digital gold investments into premium physical gold products. Choose from our selection of professionally minted coins and bars.
                        </p>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gold/10">
                          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Simple 3-Step Process
                          </h3>
                          <ol className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-2">1</span>
                              <span>Select your preferred gold product type and weight</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-2">2</span>
                              <span>Confirm your delivery details and identity verification</span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-2">3</span>
                              <span>Receive your physical gold at your doorstep within 7-10 days</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column: Benefits and Quality */}
                    <div className="w-full md:w-1/2">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                          Key Benefits
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gold/10 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">100% pure 24K gold with 999.9 purity guarantee</span>
                          </div>
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gold/10 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Secure, insured delivery</span>
                          </div>
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gold/10 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Tamper-proof packaging</span>
                          </div>
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gold/10 flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">NeoGold certification</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Quality Assurance
                        </h3>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gold/10">
                          <div className="flex items-center justify-between">
                            <div className="text-center px-2">
                              <div className="w-12 h-12 mx-auto rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-xs font-medium">Secured</span>
                            </div>
                            <div className="text-center px-2">
                              <div className="w-12 h-12 mx-auto rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-xs font-medium">Certified</span>
                            </div>
                            <div className="text-center px-2">
                              <div className="w-12 h-12 mx-auto rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-xs font-medium">Documented</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'weight' && selectedProduct && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Weight</h2>
            <p className="text-gray-600 mb-6">Choose the weight of your {selectedProduct.name}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProduct.weights.map((weight, index) => (
                <div 
                  key={index}
                  onClick={() => handleWeightSelect(weight)}
                  className={`bg-white border rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg relative overflow-hidden group ${
                    selectedWeight && selectedWeight.weight === weight.weight 
                      ? 'border-gold ring-2 ring-gold/30 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Background glow effect when selected */}
                  {selectedWeight && selectedWeight.weight === weight.weight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5"></div>
                  )}
                  
                  <div className="relative z-10">
                    {/* 3D Coin/Bar Visualization */}
                    <div className="flex justify-center mb-6">
                      {selectedProduct.type === 'coin' ? (
                        <div className="relative w-32 h-32 perspective-1000 group-hover:scale-105 transition-transform">
                          {/* Coin 3D model with weight label */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-light to-accent shadow-lg group-hover:shadow-xl transition-all duration-300 animate-float-slow">
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-light to-accent flex items-center justify-center">
                                <span className="font-bold text-primary-dark text-lg md:text-xl">
                                  {weight.weight}g
                                </span>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                            </div>
                            
                            {/* Edge texture */}
                            <div className="absolute inset-0 rounded-full border-4 border-accent-light opacity-80"></div>
                            
                            {/* "NG" embossed logo - appears below weight */}
                            <div className="absolute inset-0 rounded-full flex items-end justify-center pb-4">
                              <span className="text-primary-dark font-bold text-sm opacity-80">NG</span>
                            </div>
                          </div>
                          
                          {/* Reflection shadow */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gradient-to-r from-gray-300/20 via-gray-200/40 to-gray-300/20 rounded-full blur-sm"></div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center h-32">
                          <div className="relative w-44 h-24 perspective-1000 group-hover:scale-105 transition-transform">
                            {/* Gold bar with 3D effect and weight label */}
                            <div className="absolute inset-0 bg-gradient-to-b from-accent-light to-accent rounded-md shadow-lg group-hover:shadow-xl transition-all duration-300 animate-bar-rotate">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                              
                              {/* Texture details */}
                              <div className="absolute inset-1 border border-accent-light/50 rounded-sm"></div>
                              
                              {/* Weight label */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-bold text-primary-dark text-lg md:text-xl">
                                  {weight.weight}g
                                </span>
                              </div>
                              
                              {/* "NeoGold" branding */}
                              <div className="absolute inset-x-0 bottom-2 flex justify-center">
                                <span className="text-primary-dark font-bold text-xs opacity-80">NeoGold</span>
                              </div>
                            </div>
                            
                            {/* Reflection shadow */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-4 bg-gradient-to-r from-gray-300/20 via-gray-200/40 to-gray-300/20 rounded-full blur-sm"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-3">
                        <span className="text-lg font-semibold text-primary">{weight.weight}g</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">Value:</span>
                          <span className="text-accent font-medium">
                            ₹{(parseFloat(weight.weight) * goldRate).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500 block">Minting Cost:</span>
                          <span className="text-gray-700 font-medium">₹{weight.mintingCost.toLocaleString('en-IN')}</span>
                        </div>
                        
                        {getUserGoldBalance() < parseFloat(weight.weight) ? (
                          <span className="text-sm text-red-500 font-medium">Insufficient balance</span>
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-between items-center">
              <button
                onClick={() => setStep('products')}
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
              </button>
              
              <button
                onClick={() => setStep('checkout')}
                disabled={!selectedWeight || getUserGoldBalance() < parseFloat(selectedWeight.weight)}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  !selectedWeight || getUserGoldBalance() < parseFloat(selectedWeight.weight)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {step === 'checkout' && selectedProduct && selectedWeight && (
          <div>
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Weight Selection
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-primary mb-4">Redemption Summary</h2>
                    
                    <div className="flex items-center mb-6">
                      <div className="relative w-16 h-16 bg-gradient-to-b from-gray-50 to-gray-100 rounded flex items-center justify-center">
                        {selectedProduct.type === 'coin' ? (
                          <div className="relative w-12 h-12 animate-bar-rotate">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg"></div>
                            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-300 flex items-center justify-center overflow-hidden">
                              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-300"></div>
                              <div className="absolute inset-0 rounded-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                              </div>
                              <div className="absolute w-4 h-4 rounded-full bg-yellow-200 top-2 transform -translate-x-0.5 border border-yellow-400 scale-50"></div>
                              <div className="absolute w-6 h-6 rounded-full border-2 border-yellow-400/50 flex items-center justify-center z-10">
                                <span className="text-yellow-800 font-bold text-xs">NG</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-14 h-8 perspective-1000">
                            <div className="animate-bar-rotate">
                              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md shadow-lg"></div>
                              <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-300 rounded-md flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-1 bg-gradient-to-r from-yellow-100 to-yellow-300 rounded-sm"></div>
                                <div className="absolute inset-0 rounded-md overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                  <span className="text-yellow-800 font-bold text-[8px]">NeoGold</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">{selectedProduct.name}</h3>
                        <p className="text-sm text-gray-600">{selectedWeight.weight} grams</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-b border-gray-200 py-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Gold Value:</span>
                        <span className="text-gray-800">₹{(parseFloat(selectedWeight.weight) * goldRate).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Minting Cost:</span>
                        <span className="text-gray-800">₹{selectedWeight.mintingCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Delivery Charges:</span>
                        <span className="text-gray-800">₹150</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                        <span className="text-gray-800">Total:</span>
                        <span className="text-gray-800">₹{(parseFloat(selectedWeight.weight) * goldRate + selectedWeight.mintingCost + 150).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-gray-600">Gold Balance After Redemption:</span>
                      <span className="float-right font-semibold text-gray-800">{(getUserGoldBalance() - parseFloat(selectedWeight.weight)).toFixed(2)} grams</span>
                    </div>
                    
                    <button
                      onClick={handleConfirmRedemption}
                      className="w-full bg-gold text-black py-3 px-4 rounded-lg font-medium hover:bg-gold/80 transition-colors"
                    >
                      Confirm Redemption
                    </button>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <h3 className="text-primary font-semibold flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Important Information
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li key="cancel">• Physical gold redemption requests cannot be cancelled once confirmed.</li>
                    <li key="delivery">• Delivery will be made to your registered address only.</li>
                    <li key="availability">• Please ensure someone is available to receive the package.</li>
                    <li key="timeframe">• Typical delivery time is 7-10 business days.</li>
                    <li key="insurance">• The product will be insured during transit.</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-primary mb-4">Delivery Address</h2>
                    
                    <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-800">{user?.name}</span>
                        <span className="text-sm text-primary hover:text-gold cursor-pointer">Edit</span>
                      </div>
                      <p className="text-gray-600 text-sm">123 Main Street, Apartment 4B</p>
                      <p className="text-gray-600 text-sm">Bangalore, Karnataka - 560001</p>
                      <p className="text-gray-600 text-sm mt-2">Phone: +91 9876543210</p>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-primary mb-4">Identity Verification</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      For security reasons, we need to verify your identity before processing this redemption request.
                    </p>
                    
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">ID Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold">
                          <option value="aadhar">Aadhar Card</option>
                          <option value="pan">PAN Card</option>
                          <option value="passport">Passport</option>
                          <option value="driving">Driving License</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">ID Number</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                          placeholder="Enter your ID number"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded bg-gray-50"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I confirm that the information provided is accurate and I agree to the <Link href="/terms" className="text-primary hover:text-gold">Terms and Conditions</Link>.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white/10 border border-white/20 rounded-lg max-w-md w-full p-6 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Redemption</h3>
            <p className="text-white/80 mb-6">
              Are you sure you want to redeem {selectedWeight?.weight}g of your digital gold for a {selectedProduct?.name}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmationModalOpen(false)}
                className="px-4 py-2 border border-white/30 rounded-lg text-white hover:bg-white/10 transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={processRedemption}
                className="px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/80 transition-colors flex items-center"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}