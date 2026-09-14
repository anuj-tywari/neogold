"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type FAQItem = {
  question: string;
  answer: React.ReactNode;
  category: string;
};

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What is digital gold?",
      answer: (
        <p>
          Digital gold is gold that you buy, sell, and hold digitally. With NeoGold, each gram of digital gold is backed by 
          physical 24K gold of 99.9% purity stored in secure vaults. You own the gold, but don't have to worry about storage, 
          security, or purity.
        </p>
      ),
      category: "general"
    },
    {
      question: "How do I start investing in digital gold?",
      answer: (
        <p>
          Getting started is simple! Create an account on NeoGold, complete the KYC verification process, add money to your 
          wallet, and you can start buying digital gold for as low as ₹1.
        </p>
      ),
      category: "getting-started"
    },
    {
      question: "Is my gold investment safe?",
      answer: (
        <div>
          <p className="mb-3">
            Absolutely. When you buy digital gold through NeoGold, we ensure:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your gold is 24K with 99.9% purity</li>
            <li>It's stored in secure, insured vaults</li>
            <li>It's backed 1:1 by physical gold</li>
            <li>All transactions are secure and encrypted</li>
          </ul>
        </div>
      ),
      category: "security"
    },
    {
      question: "What is the minimum amount I can invest?",
      answer: (
        <p>
          You can start investing in digital gold on NeoGold with as little as ₹1. This makes gold investment 
          accessible to everyone regardless of budget.
        </p>
      ),
      category: "getting-started"
    },
    {
      question: "How is the price of gold determined?",
      answer: (
        <p>
          The price of gold on NeoGold is based on the current market rate of 24K gold. We update our prices in real-time 
          to reflect the market conditions. Our buy and sell prices include a small spread to cover operational costs.
        </p>
      ),
      category: "transactions"
    },
    {
      question: "Can I convert my digital gold to physical gold?",
      answer: (
        <p>
          Yes! You can redeem your digital gold for physical gold in the form of coins or bars. Simply go to the 'Redeem' 
          section in your account, select the amount you wish to redeem and the product type, and we'll deliver it to your 
          registered address after verification.
        </p>
      ),
      category: "transactions"
    },
    {
      question: "What are the charges for buying and selling digital gold?",
      answer: (
        <p>
          NeoGold operates on a small spread between buy and sell prices, which covers our operational costs. There are 
          no additional transaction fees for buying or selling digital gold. For physical redemption, a nominal minting 
          and delivery charge applies.
        </p>
      ),
      category: "transactions"
    },
    {
      question: "How do I sell my digital gold?",
      answer: (
        <p>
          You can sell your digital gold anytime through your NeoGold account. Simply go to the 'Sell' section, enter the 
          amount you wish to sell, and confirm the transaction. The proceeds will be credited to your linked bank account 
          within 1-2 business days.
        </p>
      ),
      category: "transactions"
    },
    {
      question: "Is digital gold taxable?",
      answer: (
        <p>
          Yes, gains from selling digital gold are subject to capital gains tax in India. For holdings less than 3 years, 
          short-term capital gains tax at your income tax slab rate applies. For holdings more than 3 years, long-term 
          capital gains tax at 20% with indexation benefit applies. We recommend consulting with a tax advisor for 
          your specific situation.
        </p>
      ),
      category: "general"
    },
    {
      question: "What documents do I need for KYC verification?",
      answer: (
        <p>
          For KYC verification, you'll need to provide your PAN card and any one of the following documents: Aadhaar card, 
          Voter ID, Passport, or Driving License. The verification process is digital and usually completed within 24 hours.
        </p>
      ),
      category: "getting-started"
    },
    {
      question: "What happens if I lose my account credentials?",
      answer: (
        <p>
          If you forget your password, you can use the 'Forgot Password' option on the login page to reset it. If you've 
          lost access to your registered email or phone number, please contact our customer support with your KYC details 
          for account recovery.
        </p>
      ),
      category: "security"
    },
    {
      question: "How do I contact customer support?",
      answer: (
        <p>
          You can reach our customer support team through email at support@neogold.com, by phone at +91 1234567890, 
          or through the chat feature in our app/website. Our support team is available from 9 AM to 6 PM IST, Monday 
          through Saturday.
        </p>
      ),
      category: "general"
    }
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "getting-started", name: "Getting Started" },
    { id: "transactions", name: "Transactions" },
    { id: "security", name: "Security" }
  ];

  const filteredFAQs = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
            Find answers to common questions about digital gold investment and NeoGold services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-10 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="mb-10">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for a question..."
                className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors ${
                    activeIndex === index ? "bg-gray-50" : ""
                  }`}
                >
                  <span className="font-medium text-lg text-primary">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-primary transition-transform ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 text-gray-700">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">Still have questions?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            If you couldn't find the answer to your question, our friendly
            customer support team is here to help.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
} 