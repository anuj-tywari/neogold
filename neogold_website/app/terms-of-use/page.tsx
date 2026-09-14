"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with enhanced design */}
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Use</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            Guidelines for using our platform and services
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
              Welcome to NeoGold. These Terms of Use govern your access to and use of our website, mobile application, and services. By accessing or using NeoGold, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not access or use our services.
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Acceptance of Terms</h2>
              
              <p className="mb-6">
                By accessing or using the NeoGold platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use, our Privacy Policy, and any other terms or policies referenced herein. These Terms of Use constitute a legally binding agreement between you and NeoGold.
              </p>
              
              <p className="mb-6">
                We reserve the right to modify these Terms of Use at any time. Any changes will be effective immediately upon posting on our platform. Your continued use of NeoGold after any such changes constitutes your acceptance of the new Terms of Use.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-90" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Eligibility</h2>
              
              <p className="mb-6">
                To use NeoGold, you must:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Reside in a jurisdiction where our services are available</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              
              <p className="mb-6">
                We reserve the right to refuse access to our services to anyone for any reason at our sole discretion.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-180" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">User Accounts</h2>
              
              <p className="mb-6">
                To access certain features of our platform, you may need to create an account. When you create an account, you agree to:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
                <li>Be solely responsible for all activities that occur under your account</li>
              </ul>
              
              <p className="mb-6">
                We may suspend or terminate your account if we determine, in our sole discretion, that you have violated these Terms of Use or if your account has been compromised.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">Prohibited Activities</h2>
              
              <p className="mb-6">
                When using NeoGold, you agree not to:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Use our platform for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to any part of our platform or its systems</li>
                <li>Interfere with or disrupt the integrity or performance of our platform</li>
                <li>Attempt to bypass any security measures we implement</li>
                <li>Use any automated means to access or interact with our platform</li>
                <li>Create multiple accounts for fraudulent or abusive purposes</li>
                <li>Impersonate another person or entity</li>
                <li>Engage in any activity that could damage, disable, or impair our platform</li>
                <li>Use our platform to transmit any malware, viruses, or harmful code</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">Intellectual Property</h2>
              
              <p className="mb-6">
                All content on our platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of NeoGold or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              
              <p className="mb-6">
                You may not use, reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content from our platform without our express written consent.
              </p>
              
              <p className="mb-6">
                The NeoGold name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of NeoGold or its affiliates. You may not use such marks without our prior written consent.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">Disclaimers and Limitations of Liability</h2>
              
              <p className="mb-6">
                Our platform and services are provided "as is" and "as available" without any warranties of any kind, either express or implied. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              
              <p className="mb-6">
                We do not warrant that our platform will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected. We do not warrant that the results obtained from the use of our platform will be accurate or reliable.
              </p>
              
              <p className="mb-6">
                In no event shall NeoGold, its directors, officers, employees, agents, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your use of our platform or services.
              </p>
              
              <p className="mb-6">
                Our total liability for any claims relating to these Terms of Use or your use of our platform shall not exceed the amount you paid to us, if any, in the six months preceding the date of the claim.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-primary mb-4">Indemnification</h2>
              
              <p className="mb-6">
                You agree to indemnify, defend, and hold harmless NeoGold, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Your use of our platform or services</li>
                <li>Your violation of these Terms of Use</li>
                <li>Your violation of any rights of another person or entity</li>
                <li>Your conduct in connection with our platform</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-10 shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
                <Image src="/images/policy-graphics.svg" alt="" width={200} height={200} className="w-full opacity-10 transform rotate-270" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
              
              <p className="mb-6">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              
              <div className="bg-white p-6 rounded-lg mb-8 shadow-sm border border-gray-100">
                <p className="mb-2"><strong>Email:</strong> legal@neogold.com</p>
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