"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with enhanced graphics */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-1/3 opacity-20">
          <Image src="/images/policy-graphics.svg" alt="" width={600} height={400} className="w-full" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 opacity-20">
          <Image src="/images/policy-graphics.svg" alt="" width={600} height={400} className="w-full transform rotate-180" />
        </div>
        
        {/* Wave background at the bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <Image src="/images/wave-gradient.svg" alt="" width={1440} height={320} className="w-full" />
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Refund Policy</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            Understanding our refund and cancellation terms
          </p>
        </div>
      </section>
      
      {/* Content Section with enhanced styling */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
            </p>

            <p className="mb-8">
              This Refund Policy outlines the terms and conditions for refunds and cancellations related to digital gold purchases and transactions on the NeoGold platform. By using our services, you agree to the terms of this Refund Policy.
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Purchase Transactions</h2>
              
              <p className="mb-6">
                When you purchase digital gold through NeoGold, the following refund terms apply:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>The purchase of digital gold is final and non-refundable once the transaction is completed.</li>
                <li>The purchase price is locked at the time you confirm the transaction and will not be adjusted for subsequent price fluctuations.</li>
                <li>In case of a failed transaction where the amount was debited from your account but gold was not credited, the amount will be automatically refunded within 5-7 business days.</li>
                <li>If the refund is not processed automatically, you can contact our customer support team with your transaction details for assistance.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-90" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Sell Transactions</h2>
              
              <p className="mb-6">
                When you sell your digital gold holdings through NeoGold, the following terms apply:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Sell transactions are final once confirmed and cannot be reversed.</li>
                <li>The sell price is locked at the time you confirm the sell transaction.</li>
                <li>The proceeds from the sale will be credited to your linked bank account within 2-3 business days.</li>
                <li>In case of any delay in receiving the funds, please contact our customer support team.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-180" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Physical Gold Delivery</h2>
              
              <p className="mb-6">
                For physical gold delivery requests, the following terms apply:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Once a physical delivery request is confirmed and processed, it cannot be cancelled or refunded.</li>
                <li>If the physical gold product delivered is damaged, defective, or does not match the description, you may request a replacement within 24 hours of delivery.</li>
                <li>To request a replacement, you must provide clear photographs of the received product along with the original packaging and certificate.</li>
                <li>The making charges and delivery fees associated with physical gold delivery are non-refundable.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-270" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Gift Transactions</h2>
              
              <p className="mb-6">
                For gift transactions of digital gold, the following terms apply:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Once a gift of digital gold is sent and accepted by the recipient, the transaction cannot be reversed or refunded.</li>
                <li>If the gift is not accepted within 7 days, the transaction will be automatically cancelled, and the gold will be returned to your account.</li>
                <li>Any gift transaction fee charged is non-refundable, even if the gift is not accepted by the recipient.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Subscription Plans</h2>
              
              <p className="mb-6">
                For subscription-based gold purchase plans, the following terms apply:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>You may cancel your subscription plan at any time, but we do not provide refunds for the current billing period.</li>
                <li>Upon cancellation, you will continue to own the digital gold accumulated through the subscription up to the cancellation date.</li>
                <li>Any pending subscription payment that has been authorized but not yet processed at the time of cancellation will not be charged.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-90" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              
              <p className="mb-6">
                If you have any questions about our Refund Policy or need assistance with a transaction, please contact our customer support team at:
              </p>
              
              <div className="bg-white p-6 rounded-lg mb-8 shadow-sm border border-gray-100">
                <p className="mb-2"><strong>Email:</strong> support@neogold.com</p>
                <p className="mb-2"><strong>Phone:</strong> +91 1234567890</p>
                <p className="mb-2"><strong>Hours:</strong> Monday to Saturday, 9am - 6pm IST</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="mb-4">Related Policies:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/privacy-policy" 
                  className="px-4 py-2 bg-gray-50 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300 text-gray-700"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="px-4 py-2 bg-gray-50 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300 text-gray-700"
                >
                  Terms & Conditions
                </Link>
                <Link 
                  href="/terms-of-use" 
                  className="px-4 py-2 bg-gray-50 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300 text-gray-700"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 