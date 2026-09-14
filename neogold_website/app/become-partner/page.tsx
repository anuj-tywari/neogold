"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BecomePartnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Become a NeoGold Partner</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            Join forces with India's fastest-growing digital gold platform and unlock new revenue streams for your business.
          </p>
        </div>
      </section>
      
      {/* Partnership Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Why Partner With Us?</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              NeoGold offers compelling partnership opportunities for businesses across various sectors. 
              Here's why you should consider joining our partner network.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Additional Revenue Streams</h3>
              <p className="text-gray-600">
                Earn attractive commissions on every transaction made through your platform or referral. Our tiered commission 
                structure rewards higher volumes with better rates.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Enhanced Customer Value</h3>
              <p className="text-gray-600">
                Offer your customers a valuable new service that helps them build wealth. Enhance customer loyalty and 
                engagement by providing innovative financial solutions.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Trusted Platform</h3>
              <p className="text-gray-600">
                Partner with a reputable platform that ensures 100% security, transparency, and compliance with all regulatory 
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partnership Models */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Partnership Models</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We offer flexible partnership models tailored to different business types and requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">API Integration</h3>
              <p className="text-gray-600 mb-4">
                Seamlessly integrate NeoGold's digital gold services into your existing platform or app.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full API documentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technical support</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>White-label options</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="#partner-form" className="text-primary font-medium hover:text-primary-dark transition-colors">
                  Learn more →
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Referral Program</h3>
              <p className="text-gray-600 mb-4">
                Earn commissions by referring customers to NeoGold through your unique referral link or code.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tiered commission structure</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time tracking dashboard</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Marketing materials provided</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="#partner-form" className="text-primary font-medium hover:text-primary-dark transition-colors">
                  Learn more →
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Corporate Partnership</h3>
              <p className="text-gray-600 mb-4">
                Custom partnership arrangements for larger businesses and corporations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tailored revenue models</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated relationship manager</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom integration support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="#partner-form" className="text-primary font-medium hover:text-primary-dark transition-colors">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partner Success Stories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Success Stories</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              See how other businesses have thrived through their partnership with NeoGold.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 relative mr-4 bg-primary rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary">FinApp Solutions</h3>
                  <p className="text-gray-600">Financial Technology Provider</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Integrating NeoGold's digital gold offering into our financial app increased user engagement by 32% and 
                boosted our revenue significantly. The technical support was excellent, and our customers love the new 
                investment option."
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Results:</span> 32% increase in user engagement, 28% revenue growth
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 relative mr-4 bg-primary rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary">MegaRetail</h3>
                  <p className="text-gray-600">Retail Chain</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "As a retail business, partnering with NeoGold has allowed us to offer an innovative savings product to 
                our customers. The referral program has generated substantial additional income for our business while 
                providing real value to our customers."
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Results:</span> New revenue stream, improved customer loyalty
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partner Form */}
      <section id="partner-form" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">Apply to Become a Partner</h2>
              <p className="text-gray-700">
                Fill out the form below to express your interest in partnering with NeoGold. Our partnership team will 
                get back to you within 48 hours.
              </p>
            </div>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Application Received!</h3>
                <p className="text-green-700 mb-6">
                  Thank you for your interest in partnering with NeoGold. Our team will review your application and get back to you within 48 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="https://"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Tell us about your business and partnership interests*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to NeoGold's <Link href="/terms" className="text-primary hover:text-primary-dark underline">Terms & Conditions</Link> and <Link href="/privacy-policy" className="text-primary hover:text-primary-dark underline">Privacy Policy</Link>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Here are answers to some common questions about our partnership program.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">What businesses qualify for the partnership program?</h3>
              <p className="text-gray-700">
                Our partnership program is open to various businesses, including financial service providers, retailers, 
                e-commerce platforms, and more. The ideal partner already has an established customer base and is looking 
                to add value through digital gold offerings.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">How much commission can I earn?</h3>
              <p className="text-gray-700">
                Commission rates vary based on the partnership model and volume of transactions. Our referral program offers 
                up to 25% of the transaction fee, while API integration partners can earn higher rates based on volumes.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">How long does the integration process take?</h3>
              <p className="text-gray-700">
                For API integration, the typical timeline is 2-4 weeks, depending on the complexity of the integration and 
                your technical resources. Referral partnerships can be set up within 1-2 business days.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Do you provide marketing support?</h3>
              <p className="text-gray-700">
                Yes, we provide comprehensive marketing support, including digital assets, promotional materials, and campaign 
                ideas. Our partner success team works closely with you to maximize customer engagement and conversions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 