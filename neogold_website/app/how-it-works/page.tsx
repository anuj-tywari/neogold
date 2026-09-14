"use client";

import Image from "next/image";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How NeoGold Works</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            Investing in digital gold with NeoGold is simple, secure, and convenient. Here's everything you need to know.
          </p>
        </div>
      </section>
      
      {/* Process Overview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">The Process</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Investing in digital gold with NeoGold is a simple 4-step process. Here's how it works.
            </p>
          </div>
          
          <div className="relative md:py-12">
            {/* Horizontal line with better positioning */}
            <div className="hidden md:block absolute h-0.5 bg-accent/30 left-0 right-0" style={{ top: "calc(50% - 24px)" }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="relative text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-3xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Create an Account</h3>
                <p className="text-gray-600">
                  Sign up in under 2 minutes with a simple KYC verification process. All you need is your phone number, 
                  email, and basic identity information.
                </p>
              </div>
              
              <div className="relative text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-3xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Buy Digital Gold</h3>
                <p className="text-gray-600">
                  Purchase 24K digital gold with as little as ₹1. We offer transparent pricing, with live market rates 
                  and no hidden fees.
                </p>
              </div>
              
              <div className="relative text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-3xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Secure Storage</h3>
                <p className="text-gray-600">
                  Your gold is stored in secure, insured vaults and is backed 1:1 by physical gold. We provide 24/7 
                  monitoring and complete transparency.
                </p>
              </div>
              
              <div className="relative text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent relative z-10 shadow-lg">
                  <span className="text-primary font-bold text-3xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Sell or Redeem</h3>
                <p className="text-gray-600">
                  Sell your gold at any time at current market rates, or request physical delivery in the form of coins 
                  or jewelry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Detailed Steps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Detailed Guide</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Let's break down each step of the process in more detail.
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <div className="absolute inset-0 -m-4 rounded-full bg-accent/20 blur-xl"></div>
                <div className="relative bg-primary rounded-xl overflow-hidden h-64 md:h-80 flex items-center justify-center p-6">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-accent/30 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="w-48 h-10 bg-white/10 rounded-lg mb-3 flex items-center px-3">
                      <div className="h-2.5 w-full bg-white/20 rounded-full"></div>
                    </div>
                    <div className="w-48 h-10 bg-white/10 rounded-lg mb-3 flex items-center px-3">
                      <div className="h-2.5 w-full bg-white/20 rounded-full"></div>
                    </div>
                    <div className="w-48 h-10 bg-white/10 rounded-lg mb-3 flex items-center px-3">
                      <div className="h-2.5 w-full bg-white/20 rounded-full"></div>
                    </div>
                    <div className="w-32 h-10 bg-accent/70 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Create Account</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">1</div>
                <h3 className="text-2xl font-bold text-primary mb-4">Creating Your Account</h3>
                <p className="text-gray-700 mb-4">
                  Getting started with NeoGold is simple. Our streamlined registration process takes less than 2 minutes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Enter your mobile number and verify via OTP</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Provide basic information like name, email, and date of birth</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Complete KYC by submitting your PAN card and Aadhaar details</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Set up your account with a secure password</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">2</div>
                <h3 className="text-2xl font-bold text-primary mb-4">Buying Digital Gold</h3>
                <p className="text-gray-700 mb-4">
                  Purchasing gold on NeoGold is flexible and transparent. You can buy based on either the amount you want to invest or the weight of gold you want to purchase.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Enter the amount you wish to invest (minimum ₹1) or the weight of gold (in grams)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>View live market rates that are updated in real-time</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Make payment using UPI, net banking, credit/debit card, or other payment methods</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Receive instant confirmation once your purchase is complete</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 -m-4 rounded-full bg-accent/20 blur-xl"></div>
                <div className="relative bg-primary rounded-xl overflow-hidden h-64 md:h-80 flex items-center justify-center p-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 w-full max-w-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="h-3 w-20 bg-white/20 rounded-full mb-2"></div>
                        <div className="h-3 w-16 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 bg-white/20 rounded-lg w-full"></div>
                      <div className="h-10 bg-white/20 rounded-lg w-full"></div>
                      <div className="h-10 bg-accent/70 rounded-lg w-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Buy Gold</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <div className="absolute inset-0 -m-4 rounded-full bg-accent/20 blur-xl"></div>
                <div className="relative bg-primary rounded-xl overflow-hidden h-64 md:h-80 flex items-center justify-center p-6">
                  <div className="relative w-56 h-56">
                    <div className="absolute inset-0 bg-accent/20 rounded-full"></div>
                    <div className="absolute inset-6 bg-accent/40 rounded-full"></div>
                    <div className="absolute inset-12 bg-accent/60 rounded-full"></div>
                    <div className="absolute inset-18 bg-accent/80 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">3</div>
                <h3 className="text-2xl font-bold text-primary mb-4">Secure Storage</h3>
                <p className="text-gray-700 mb-4">
                  Your digital gold is backed by physical 24K gold stored in secure, insured vaults. We take every measure to ensure its safety.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>All gold is 99.9% pure 24K gold with certification</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Stored in high-security vaults managed by trusted custodians</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fully insured against theft, damage, or loss</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Regular audits and verification to ensure 1:1 backing</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">4</div>
                <h3 className="text-2xl font-bold text-primary mb-4">Selling or Redeeming</h3>
                <p className="text-gray-700 mb-4">
                  We offer flexible options for liquidating your gold investment or converting it to physical gold.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Sell your gold at current market rates at any time</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Receive funds directly in your bank account within 24-48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Request physical delivery in the form of coins or jewelry (minimum 1 gram)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Track your delivery and receive your physical gold safely at your doorstep</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 -m-4 rounded-full bg-accent/20 blur-xl"></div>
                <div className="relative bg-primary rounded-xl overflow-hidden h-64 md:h-80 flex items-center justify-center p-6">
                  <div className="flex flex-col items-center space-y-8">
                    <div className="rounded-xl bg-accent/30 p-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-accent animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <div className="rounded-xl bg-white/10 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Here are answers to some common questions about investing in digital gold with NeoGold.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Is digital gold the same as physical gold?</h3>
              <p className="text-gray-700">
                Digital gold represents ownership of physical gold stored in secure vaults. Each gram of digital gold you purchase 
                is backed by an equivalent amount of 99.9% pure physical gold.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">What are the advantages of digital gold over physical gold?</h3>
              <p className="text-gray-700">
                Digital gold offers several advantages: no storage concerns, 100% purity guarantee, no making charges, 
                ability to buy in small amounts, easy liquidity, and transparent pricing.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Is there a minimum investment amount?</h3>
              <p className="text-gray-700">
                You can start investing with as little as ₹1, making gold investment accessible to everyone.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">How is the price of gold determined?</h3>
              <p className="text-gray-700">
                The price of gold on NeoGold is based on the international market rate, converted to Indian Rupees, 
                and updated in real-time.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Can I convert my digital gold to physical gold?</h3>
              <p className="text-gray-700">
                Yes, you can request physical delivery of your gold in the form of coins or jewelry. The minimum quantity 
                for conversion is 1 gram.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start Investing in Digital Gold Today</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust NeoGold for their digital gold investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-accent text-primary px-8 py-4 rounded-lg font-medium text-lg inline-block hover:bg-accent-light transition-all duration-300"
            >
              Create Account
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-medium text-lg inline-block hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 