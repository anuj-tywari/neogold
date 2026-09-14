"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms & Conditions</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            Our legal agreement for using NeoGold services
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
              Welcome to NeoGold. Please read these Terms and Conditions carefully before using our services. By accessing or using the NeoGold platform, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Definitions</h2>
              
              <p className="mb-6">
                Throughout these Terms and Conditions, the following terms shall have the meanings as defined below:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>"NeoGold", "we", "us", "our"</strong> refers to NeoGold and its affiliates, officers, directors, employees, and agents.</li>
                <li><strong>"Platform"</strong> refers to our website, mobile application, and other digital interfaces provided by NeoGold.</li>
                <li><strong>"Services"</strong> refers to all digital gold investment, trading, storage, and redemption services offered through the Platform.</li>
                <li><strong>"User", "you", "your"</strong> refers to individuals who access or use our Platform and Services.</li>
                <li><strong>"Digital Gold"</strong> refers to the electronic representation of physical gold maintained in secure vaults on your behalf.</li>
              </ul>
            </div>
            
            {/* Continue updating similar sections with enhanced styling */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-90" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Service Description</h2>
              
              <p className="mb-6">
                NeoGold provides a platform that enables you to:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Purchase and sell digital gold at transparent pricing</li>
                <li>Store your gold securely with insured custody</li>
                <li>Request physical delivery of your gold (subject to minimum quantity requirements)</li>
                <li>Track your gold investments and performance over time</li>
                <li>Gift digital gold to friends and family</li>
              </ul>
              
              <p className="mb-6">
                The actual physical gold corresponding to your digital gold holdings is stored securely in professional vaults, fully insured and audited regularly by independent authorities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-180" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Account Registration</h2>
              
              <p className="mb-6">
                To use our Services, you must create an account by providing accurate and complete information, including:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Your full legal name</li>
                <li>A valid email address and mobile number</li>
                <li>Residential address</li>
                <li>Date of birth</li>
                <li>Identity and address verification documents as required by regulations</li>
              </ul>
              
              <p className="mb-6">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other security breach.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-270" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Pricing and Fees</h2>
              
              <p className="mb-6">
                The pricing of digital gold on our Platform includes:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>The spot price of gold</li>
                <li>A premium that covers custody, insurance, and platform costs</li>
                <li>Applicable taxes such as GST</li>
              </ul>
              
              <p className="mb-6">
                All fees associated with our Services are transparently displayed before you confirm any transaction. These fees may include:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Transaction fees for buying and selling digital gold</li>
                <li>Storage fees (if applicable)</li>
                <li>Physical delivery fees (for redemption of physical gold)</li>
                <li>Payment processing fees</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
              
              <p className="mb-6">
                If you have any questions or concerns about these Terms and Conditions, please contact us at:
              </p>
              
              <div className="bg-white p-6 rounded-lg mb-8 shadow-sm border border-gray-100">
                <p className="mb-2"><strong>Email:</strong> legal@neogold.com</p>
                <p className="mb-2"><strong>Phone:</strong> +91 1234567890</p>
                <p className="mb-2"><strong>Address:</strong> 1st Floor, The Circle, Unitech Trade Center, Sushant Lok Phase I, Block D, Gurugram, Haryana 122002</p>
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
                  href="/terms-of-use" 
                  className="px-4 py-2 bg-gray-50 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300 text-gray-700"
                >
                  Terms of Use
                </Link>
                <Link 
                  href="/refund-policy" 
                  className="px-4 py-2 bg-gray-50 rounded-md hover:bg-primary-light hover:text-white transition-colors duration-300 text-gray-700"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}