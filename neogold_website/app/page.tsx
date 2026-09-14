"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [amount, setAmount] = useState("1000");
  const [grams, setGrams] = useState("0.16");
  const [inputMode, setInputMode] = useState<'amount' | 'grams'>('amount');
  
  // Calculate gold weight based on amount
  const calculateGrams = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0.00";
    const goldPrice = 6245; // Price per gram in rupees
    return (numValue / goldPrice).toFixed(4);
  };
  
  // Calculate amount based on grams
  const calculateAmount = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0.00";
    const goldPrice = 6245; // Price per gram in rupees
    return (numValue * goldPrice).toFixed(2);
  };
  
  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setGrams(calculateGrams(value));
    setInputMode('amount');
  };
  
  // Handle grams change
  const handleGramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrams(value);
    setAmount(calculateAmount(value));
    setInputMode('grams');
  };

  // Toggle between amount and grams input
  const toggleInputMode = () => {
    setInputMode(inputMode === 'amount' ? 'grams' : 'amount');
  };
  
  useEffect(() => {
    // Animation for elements when they enter viewport
    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observerRef.current?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(el => {
        observerRef.current?.observe(el);
      });
    };
    
    animateOnScroll();
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section - Modern gradient with bento grid style, animated graphics and buy card */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-primary to-primary-dark py-24 lg:py-32">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        
        {/* Geometric decorative shapes */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl"></div>
        
        {/* Animated floating circles */}
        <div className="absolute top-1/4 left-1/5 h-16 w-16 rounded-full bg-accent/30 animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/5 h-12 w-12 rounded-full bg-accent/20 animate-float-slower"></div>
        <div className="absolute top-1/3 right-1/4 h-8 w-8 rounded-full bg-accent/10 animate-float"></div>
        
        {/* Geometric accent lines */}
        <svg className="absolute top-20 left-10 opacity-20 animate-pulse-slow" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 40 L100 40" stroke="#FFD700" strokeWidth="2" />
          <path d="M20 60 L100 60" stroke="#FFD700" strokeWidth="2" />
          <path d="M20 80 L100 80" stroke="#FFD700" strokeWidth="2" />
          <circle cx="60" cy="40" r="4" fill="#FFD700" />
          <circle cx="60" cy="60" r="4" fill="#FFD700" />
          <circle cx="60" cy="80" r="4" fill="#FFD700" />
        </svg>
        
        <svg className="absolute bottom-20 right-10 opacity-20 animate-pulse-slow" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 20 L40 100" stroke="#FFD700" strokeWidth="2" />
          <path d="M60 20 L60 100" stroke="#FFD700" strokeWidth="2" />
          <path d="M80 20 L80 100" stroke="#FFD700" strokeWidth="2" />
          <circle cx="40" cy="60" r="4" fill="#FFD700" />
          <circle cx="60" cy="60" r="4" fill="#FFD700" />
          <circle cx="80" cy="60" r="4" fill="#FFD700" />
        </svg>
        
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:max-w-xl mb-16 lg:mb-0 lg:mr-12 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Invest in <span className="text-accent relative">
                  Digital Gold
                  <svg className="absolute -bottom-2 left-0 w-full opacity-70" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#FFD700" strokeWidth="2"/>
                  </svg>
                </span> for a Secure Future
              </h1>
              <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
                Start your investment journey with as little as ₹1. 
                100% secure, transparent, and convenient way to invest in 24K gold.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/buy"
                  className="bg-accent hover:bg-accent-light text-primary px-8 py-4 rounded-lg font-medium text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden group"
                >
                  <span className="relative z-10">Buy Gold Now</span>
                  <span className="absolute top-0 left-0 w-full h-0 bg-white/20 transition-all duration-300 group-hover:h-full"></span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-medium text-center hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute top-0 right-0 w-0 h-full bg-white/10 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>
            
            {/* Buy Card with enhanced styling */}
            <div className="lg:w-2/5 w-full max-w-md relative">
              {/* Decorative element behind card */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-accent/10 rounded-2xl transform rotate-2 hidden lg:block"></div>
              <div className="absolute -top-2 -left-2 w-full h-full bg-accent/5 rounded-2xl transform -rotate-1 hidden lg:block"></div>
              
              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">Buy Digital Gold</h2>
                    <button 
                      onClick={toggleInputMode} 
                      className="text-sm bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors flex items-center"
                    >
                      {inputMode === 'amount' ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Buy in Grams
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Buy in Rupees
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Amount Input */}
                    {inputMode === 'amount' ? (
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                          Amount in Rupees (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                          <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="grams" className="block text-sm font-medium text-gray-700 mb-2">
                          Gold in Grams (g)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="grams"
                            value={grams}
                            onChange={handleGramsChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            placeholder="Enter grams"
                          />
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">g</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Gold Weight or Amount Result */}
                    {inputMode === 'amount' ? (
                      <div>
                        <label htmlFor="grams-result" className="block text-sm font-medium text-gray-700 mb-2">
                          Gold in Grams (g)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="grams-result"
                            value={grams}
                            readOnly
                            className="block w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                          />
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">g</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="amount-result" className="block text-sm font-medium text-gray-700 mb-2">
                          Amount in Rupees (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                          <input
                            type="text"
                            id="amount-result"
                            value={amount}
                            readOnly
                            className="block w-full pl-8 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Call to action */}
                    <Link
                      href="/buy"
                      className="w-full bg-primary text-white py-4 rounded-lg font-medium text-center hover:bg-primary-dark transition-all duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Continue to Buy
                    </Link>
                    
                    {/* Live gold rate */}
                    <div className="text-center text-sm text-gray-500">
                      <p>Current Gold Rate: ₹6,245.00 per gram</p>
                      <p className="text-xs mt-1">Rates updated every 5 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Gold Rates - Card style from Radiant */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 bg-gradient-to-br from-primary to-primary-dark text-white">
                  <h2 className="text-3xl font-bold mb-6">Live Gold Rates</h2>
                  <p className="text-white/80 mb-8">Track the latest gold prices updated in real-time to make informed investment decisions.</p>
                  <div className="mt-4">
                    <Link href="/rates" className="inline-flex items-center text-accent font-medium hover:text-accent-light transition-colors group">
                      View historical rates
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="p-8 md:p-12 bg-white">
                  <div className="flex items-end gap-4 mb-4">
                    <div>
                      <h3 className="text-4xl font-bold text-accent">₹6,245</h3>
                      <p className="text-gray-500">per gram</p>
                    </div>
                    <div className="text-green-500 flex items-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">0.8%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Last updated: Today, 10:30 AM</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                      <span className="text-gray-700">24K Gold</span>
                      <span className="font-medium">₹6,245/g</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                      <span className="text-gray-700">22K Gold</span>
                      <span className="font-medium">₹5,725/g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento grid style */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Why Choose NeoGold?</h2>
            <p className="text-gray-600 text-lg">We provide the most secure, transparent, and convenient way to invest in digital gold.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-accent to-accent-light opacity-75 blur rounded-xl group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 h-full animate-on-scroll">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">100% Secure</h3>
                <p className="text-gray-600">Your digital gold is stored in secured vaults and fully insured against theft or loss.</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-accent to-accent-light opacity-75 blur rounded-xl group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 h-full animate-on-scroll">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">99.9% Pure Gold</h3>
                <p className="text-gray-600">We offer only the highest quality 24K gold with 99.9% purity and certification.</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0.5 bg-gradient-to-r from-accent to-accent-light opacity-75 blur rounded-xl group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 h-full animate-on-scroll">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Low Cost</h3>
                <p className="text-gray-600">Start with as little as ₹1 with no making charges or hidden fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Updated with better styling */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">How It Works</h2>
            <p className="text-gray-600 text-lg">Investing in digital gold is simple, secure, and convenient.</p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-accent/30 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="relative text-center animate-on-scroll">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Sign Up</h3>
                <p className="text-gray-600">Create your account in less than 2 minutes with simple KYC verification</p>
              </div>
              
              <div className="relative text-center animate-on-scroll">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Buy Gold</h3>
                <p className="text-gray-600">Purchase gold with your preferred payment method at live market rates</p>
              </div>
              
              <div className="relative text-center animate-on-scroll">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Store Securely</h3>
                <p className="text-gray-600">Your gold is stored in secured, insured vaults with 24/7 monitoring</p>
              </div>
              
              <div className="relative text-center animate-on-scroll">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-2xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Sell or Redeem</h3>
                <p className="text-gray-600">Sell anytime at market rates or request physical delivery of your gold</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Journey Interactive Section - with 3D graphics, animations and gradients */}
      <section className="py-24 relative overflow-hidden">
        {/* Dynamic gradient background with animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 via-white to-primary/10"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
        
        {/* Floating gold particles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* This would be populated by particles in a real implementation */}
          <div className="absolute top-1/4 left-1/3 h-3 w-3 rounded-full bg-accent animate-float-slow opacity-70"></div>
          <div className="absolute top-1/2 left-1/5 h-2 w-2 rounded-full bg-accent animate-float-slower opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 h-4 w-4 rounded-full bg-accent animate-float opacity-80"></div>
          <div className="absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-accent animate-float-slower opacity-50"></div>
          <div className="absolute bottom-1/3 left-1/3 h-5 w-5 rounded-full bg-accent/30 animate-float-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">The Gold Journey</h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto">Experience the transformation from raw gold to your secure digital investment.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 3D Gold Mine Card */}
              <div className="relative group perspective-1000 animate-on-scroll">
                <div className="relative h-full group-hover:rotate-x-5 transition-transform duration-500">
                  {/* Card background with depth effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-dark to-primary transform translate-z-[-50px] group-hover:translate-z-[-60px] transition-transform duration-500 opacity-80"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white rounded-2xl shadow-xl p-8 h-full z-10 transform group-hover:translate-z-[10px] transition-transform duration-500 border border-accent/20">
                    <div className="h-48 mb-6 relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-accent animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                      </div>
                      {/* Gold shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 animate-shine"></div>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">1. Gold Mining</h3>
                    <p className="text-gray-600">Our gold journey begins with responsible mining practices, ensuring ethical sourcing from certified mines worldwide.</p>
                  </div>
                </div>
              </div>
              
              {/* 3D Refinery Card */}
              <div className="relative group perspective-1000 animate-on-scroll">
                <div className="relative h-full group-hover:rotate-x-5 transition-transform duration-500">
                  {/* Card background with depth effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-dark to-primary transform translate-z-[-50px] group-hover:translate-z-[-60px] transition-transform duration-500 opacity-80"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white rounded-2xl shadow-xl p-8 h-full z-10 transform group-hover:translate-z-[10px] transition-transform duration-500 border border-accent/20">
                    <div className="h-48 mb-6 relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-accent animate-float-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      {/* Gold shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 animate-shine"></div>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">2. Refining Process</h3>
                    <p className="text-gray-600">Gold undergoes rigorous refining to achieve 99.9% purity (24K), meeting international standards for investment-grade gold.</p>
                  </div>
                </div>
              </div>
              
              {/* 3D Digital Card */}
              <div className="relative group perspective-1000 animate-on-scroll">
                <div className="relative h-full group-hover:rotate-x-5 transition-transform duration-500">
                  {/* Card background with depth effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-dark to-primary transform translate-z-[-50px] group-hover:translate-z-[-60px] transition-transform duration-500 opacity-80"></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white rounded-2xl shadow-xl p-8 h-full z-10 transform group-hover:translate-z-[10px] transition-transform duration-500 border border-accent/20">
                    <div className="h-48 mb-6 relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-accent animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                      </div>
                      {/* Gold shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 animate-shine"></div>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">3. Digital Transformation</h3>
                    <p className="text-gray-600">Your physical gold is digitized and stored securely, with each gram backed by actual gold in our insured vaults.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Gold Bar Animation */}
            <div className="mt-20 relative w-full h-48 md:h-64 max-w-2xl mx-auto perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-20 transform rotate-x-10 animate-float-slow">
                  {/* Gold bar with 3D effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-accent-light to-accent rounded-lg shadow-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                  <div className="absolute inset-1 border-2 border-accent/50 rounded-md"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary-dark font-bold text-lg">NeoGold</span>
                  </div>
                </div>
              </div>
              
              {/* Circular platform with shadow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-10 bg-gradient-to-r from-gray-300/50 via-gray-200/60 to-gray-300/50 rounded-full blur-sm"></div>
            </div>
            
            <div className="mt-16 text-center">
              <Link
                href="/how-it-works"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
              >
                <span>Explore the Full Process</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Thousands of investors trust NeoGold for their digital gold investments.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">"I've been investing in gold for years, but NeoGold has made it so much more accessible and transparent. I love being able to buy small amounts regularly."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">RP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Rahul Patel</h4>
                  <p className="text-sm text-gray-500">Investor since 2022</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">"The ability to invest with as little as ₹1 has allowed me to start building my gold portfolio despite having a limited budget. The app is incredibly easy to use!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Anita Sharma</h4>
                  <p className="text-sm text-gray-500">Investor since 2023</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">"What I appreciate most about NeoGold is the transparency. I know exactly what I'm paying for and can track my investments easily. The customer service is exceptional too."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">VK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Vikram Kumar</h4>
                  <p className="text-sm text-gray-500">Investor since 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Performance Tracker - 3D data visualization with gradients */}
      <section className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 to-accent/5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Track Gold Performance</h2>
            <p className="text-gray-600 text-lg">Monitor gold's historical performance and make data-driven investment decisions.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 3D Chart Visualization */}
            <div className="relative perspective-1000 h-80 animate-on-scroll">
              {/* 3D Chart Container */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-x-2 group-hover:rotate-x-5 transition-all duration-500">
                {/* Chart Background with grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }}></div>
                
                {/* Gold price chart representation */}
                <div className="absolute bottom-10 left-10 right-10 h-40">
                  {/* Chart line with gradient */}
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 193, 7, 0.5)" />
                        <stop offset="100%" stopColor="rgba(255, 193, 7, 0)" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0,35 L10,30 L20,32 L30,25 L40,28 L50,20 L60,15 L70,18 L80,10 L90,5 L100,8 L100,40 L0,40 Z" 
                      fill="url(#chartGradient)" 
                      className="transform origin-bottom transition-all duration-1000"
                    />
                    <path 
                      d="M0,35 L10,30 L20,32 L30,25 L40,28 L50,20 L60,15 L70,18 L80,10 L90,5 L100,8" 
                      stroke="#FFC107" 
                      strokeWidth="1.5" 
                      fill="none" 
                      className="transform origin-bottom transition-all duration-1000"
                    />
                    
                    {/* Current point indicator */}
                    <circle cx="100" cy="8" r="2" fill="#FFC107" stroke="#fff" strokeWidth="1" className="animate-pulse-slow" />
                  </svg>
                </div>
                
                {/* Chart labels */}
                <div className="absolute bottom-4 left-10 right-10 flex justify-between text-xs text-gray-500">
                  <span>1Y</span>
                  <span>2Y</span>
                  <span>3Y</span>
                  <span>4Y</span>
                  <span>5Y</span>
                </div>
                
                {/* Chart title */}
                <div className="absolute top-8 left-10 right-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-primary">Gold Price Trend</h3>
                      <p className="text-sm text-gray-500">Last 5 years</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">+24.6%</div>
                      <p className="text-sm text-green-500">↑ 5.2% this year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance stats with animation */}
            <div className="space-y-8 animate-on-scroll">
              <h3 className="text-2xl font-bold text-primary">Why Gold Performs Well</h3>
              <p className="text-gray-600">Gold has proven to be a reliable store of value over centuries, often performing well during economic uncertainty and market volatility.</p>
              
              {/* Interactive stats cards */}
              <div className="space-y-4">
                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent-light group-hover:w-2 transition-all duration-300"></div>
                  <div className="p-5 pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-primary">Inflation Hedge</h4>
                      <div className="text-lg font-bold text-accent">+8.5%</div>
                    </div>
                    <p className="text-sm text-gray-600">Gold often rises when inflation erodes the value of paper currencies</p>
                    
                    {/* Progress bar with animation */}
                    <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-[0.85] origin-left animate-on-scroll"></div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent-light group-hover:w-2 transition-all duration-300"></div>
                  <div className="p-5 pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-primary">Market Volatility</h4>
                      <div className="text-lg font-bold text-accent">+12.3%</div>
                    </div>
                    <p className="text-sm text-gray-600">Gold provides stability during periods of stock market volatility</p>
                    
                    {/* Progress bar with animation */}
                    <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-[0.92] origin-left animate-on-scroll"></div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent-light group-hover:w-2 transition-all duration-300"></div>
                  <div className="p-5 pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-primary">Long-term Growth</h4>
                      <div className="text-lg font-bold text-accent">+187%</div>
                    </div>
                    <p className="text-sm text-gray-600">Gold has shown significant growth over the past 20 years</p>
                    
                    {/* Progress bar with animation */}
                    <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-[0.78] origin-left animate-on-scroll"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  href="/calculator"
                  className="inline-flex items-center bg-white border border-primary text-primary px-5 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm"
                >
                  <span>Try Investment Calculator</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with gradient and effects */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl"></div>
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Gold Investment Journey Today</h2>
            <p className="text-white/90 text-lg mb-10">
              Join thousands of investors who trust NeoGold for their digital gold investments.
              Secure your financial future with as little as ₹1.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-accent text-primary px-8 py-4 rounded-lg font-medium text-lg inline-block hover:bg-accent-light transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                Create Account
              </Link>
              <Link
                href="/how-it-works"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-medium text-lg inline-block hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
