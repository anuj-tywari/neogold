"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About NeoGold</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            We're on a mission to make gold investment accessible, transparent, and secure for everyone
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                NeoGold was founded in 2022 with a simple vision: to democratize gold investment in India. 
                Traditional gold investment often involves high costs, concerns about purity, and storage hassles.
                We wanted to change that.
              </p>
              <p className="text-gray-700 mb-6">
                Our team of financial experts and technology enthusiasts came together to create a platform that 
                makes investing in 24K gold as simple as a few taps on your phone. We've removed the barriers that 
                prevented many Indians from investing in this precious asset.
              </p>
              <p className="text-gray-700">
                Today, NeoGold serves thousands of customers across India, helping them secure their financial 
                future through digital gold investments.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-full bg-accent/30 blur-xl"></div>
              <div className="relative bg-primary-light rounded-xl overflow-hidden h-96 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-4/5 h-4/5 text-accent/20">
                  <path fill="currentColor" d="M48.8,-52.3C62.1,-38.6,71.7,-19.3,71.1,-0.6C70.6,18.1,60,36.2,46.7,49.8C33.4,63.4,16.7,72.5,-0.2,72.7C-17.1,72.9,-34.1,64.2,-46.2,51.5C-58.3,38.7,-65.5,19.4,-67.6,-1.9C-69.7,-23.2,-66.8,-46.4,-54.7,-60.2C-42.7,-74,-21.3,-78.4,-1.2,-77.1C19,-75.8,35.5,-66,48.8,-52.3Z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, index) => (
                      <div key={index} className="w-10 h-10 md:w-16 md:h-16 bg-primary rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Our Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At NeoGold, our core values guide everything we do. They shape our culture, inform our decisions, 
              and help us deliver the best possible experience to our customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in our operations. From gold purity to pricing, 
                storage to delivery, we keep everything clear and accessible.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Accessibility</h3>
              <p className="text-gray-600">
                We're committed to making gold investment accessible to everyone, regardless of their 
                budget or prior investment experience. Start with as little as ₹1.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to improve our platform and services, leveraging the latest 
                technology to provide a seamless and secure gold investment experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Meet Our Team</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The people behind NeoGold are passionate about making gold investment accessible to everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary">Rajiv Mehta</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary">Priya Sharma</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary">Vikram Patel</h3>
              <p className="text-gray-600">Chief Financial Officer</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary">Anita Desai</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Gold Investment Journey?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust NeoGold for their digital gold investments.
          </p>
          <Link
            href="/register"
            className="bg-accent text-primary px-8 py-4 rounded-lg font-medium text-lg inline-block hover:bg-accent-light transition-all duration-300"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
} 