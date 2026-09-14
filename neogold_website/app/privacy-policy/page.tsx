"use client";

import React from 'react';
import Image from 'next/image';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with enhanced gradient and wave */}
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            We value your privacy and are committed to protecting your personal information
          </p>
        </div>
      </section>
      
      {/* Content Section with enhanced styling */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
            </p>

            <p className="mb-6">
              NeoGold ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by NeoGold.
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
              
              <p className="mb-4">We collect information that you provide directly to us, such as when you:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Create an account</li>
                <li>Make a purchase or transaction</li>
                <li>Contact customer support</li>
                <li>Sign up for our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <p className="mb-4">This information may include:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Authentication information (password, security questions)</li>
                <li>Financial information (bank account details, payment information)</li>
                <li>Identity verification information (PAN, Aadhaar, or other government IDs)</li>
                <li>Transaction information (purchase history, account balances)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-90" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h2>
              
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Send technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and promotions</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-180" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Information Sharing and Disclosure</h2>
              
              <p className="mb-6">
                We may share your personal information with:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Financial institutions and payment processors to facilitate transactions</li>
                <li>Professional advisors, such as lawyers, auditors, and insurers</li>
                <li>Government authorities when required by law or to protect our rights</li>
                <li>Business partners with your consent</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-270" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Data Security</h2>
              
              <p className="mb-6">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform scale-x-[-1]" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
              
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information in certain circumstances</li>
                <li>Restrict or object to our processing of your information</li>
                <li>Data portability (receiving your data in a structured, commonly used format)</li>
                <li>Withdraw consent at any time where we rely on consent to process your information</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Cookies and Tracking Technologies</h2>
              
              <p className="mb-6">
                We use cookies and similar tracking technologies to track activity on our website and to hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-90" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Changes to This Privacy Policy</h2>
              
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-180" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              
              <div className="bg-white p-6 rounded-lg mb-8 shadow-sm border border-gray-100">
                <p className="mb-2"><strong>Email:</strong> privacy@neogold.com</p>
                <p className="mb-2"><strong>Phone:</strong> +91 1234567890</p>
                <p><strong>Address:</strong> 123 Street, Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 