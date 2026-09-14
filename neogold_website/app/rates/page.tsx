"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GoldRatesPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [historyData, setHistoryData] = useState({
    daily: [
      { date: '2023-07-10', buy: 6245, sell: 6165 },
      { date: '2023-07-09', buy: 6230, sell: 6150 },
      { date: '2023-07-08', buy: 6215, sell: 6135 },
      { date: '2023-07-07', buy: 6260, sell: 6180 },
      { date: '2023-07-06', buy: 6265, sell: 6185 },
      { date: '2023-07-05', buy: 6250, sell: 6170 },
      { date: '2023-07-04', buy: 6240, sell: 6160 },
      { date: '2023-07-03', buy: 6225, sell: 6145 },
      { date: '2023-07-02', buy: 6210, sell: 6130 },
      { date: '2023-07-01', buy: 6200, sell: 6120 },
      { date: '2023-06-30', buy: 6190, sell: 6110 },
      { date: '2023-06-29', buy: 6180, sell: 6100 },
      { date: '2023-06-28', buy: 6170, sell: 6090 },
      { date: '2023-06-27', buy: 6160, sell: 6080 },
    ],
    monthly: [
      { date: 'Jul 2023', buy: 6245, sell: 6165 },
      { date: 'Jun 2023', buy: 6190, sell: 6110 },
      { date: 'May 2023', buy: 6150, sell: 6070 },
      { date: 'Apr 2023', buy: 6100, sell: 6020 },
      { date: 'Mar 2023', buy: 6050, sell: 5970 },
      { date: 'Feb 2023', buy: 6000, sell: 5920 },
      { date: 'Jan 2023', buy: 5950, sell: 5870 },
      { date: 'Dec 2022', buy: 5900, sell: 5820 },
      { date: 'Nov 2022', buy: 5850, sell: 5770 },
      { date: 'Oct 2022', buy: 5800, sell: 5720 },
      { date: 'Sep 2022', buy: 5750, sell: 5670 },
      { date: 'Aug 2022', buy: 5700, sell: 5620 },
    ],
    yearly: [
      { date: '2023', buy: 6050, sell: 5970 },
      { date: '2022', buy: 5800, sell: 5720 },
      { date: '2021', buy: 5400, sell: 5320 },
      { date: '2020', buy: 5100, sell: 5020 },
      { date: '2019', buy: 4800, sell: 4720 },
      { date: '2018', buy: 4500, sell: 4420 },
      { date: '2017', buy: 4200, sell: 4120 },
      { date: '2016', buy: 3900, sell: 3820 },
      { date: '2015', buy: 3600, sell: 3520 },
      { date: '2014', buy: 3300, sell: 3220 },
    ],
  });

  // Current gold rates
  const currentRates = {
    buy: 6245,
    sell: 6165,
    change: 0.8, // percentage change
    direction: 'up', // 'up' or 'down'
  };

  const formatDate = (dateStr: string): string => {
    // For different tab formats
    if (activeTab === 'daily') {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return dateStr;
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Gold Rates
          </h1>
          <p className="text-gray-600 mb-10">
            Track current and historical gold rates to make informed investment decisions. 
            All rates are for 24K, 99.9% pure gold per gram.
          </p>
          
          {/* Current Rates Card */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl shadow-2xl p-8 mb-12 text-white overflow-hidden relative">
            {/* Gold coin decorative element */}
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-12.95L16.95 12 12 16.95 7.05 12 12 7.05z" />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
              <div>
                <h2 className="text-xl font-bold text-accent mb-4">Current Gold Rate</h2>
                
                <div className="flex flex-col sm:flex-row sm:items-end gap-8 mb-5">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm transition-transform hover:scale-105">
                    <span className="text-sm text-white/70 uppercase tracking-wider">Buy</span>
                    <p className="text-4xl font-bold mt-1">₹{currentRates.buy}</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm transition-transform hover:scale-105">
                    <span className="text-sm text-white/70 uppercase tracking-wider">Sell</span>
                    <p className="text-4xl font-bold mt-1">₹{currentRates.sell}</p>
                  </div>
                  
                  <div className={`flex flex-col justify-center px-4 py-2 rounded-lg ${currentRates.direction === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <div className="flex items-center">
                      {currentRates.direction === 'up' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className={`ml-1 text-lg font-semibold ${currentRates.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {currentRates.change}%
                      </span>
                    </div>
                    <span className="text-xs text-white/70 mt-1">24h Change</span>
                  </div>
                </div>
                
                <div className="flex items-center text-white/70 text-sm mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated: Today, 10:30 AM
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <Link
                  href="/buy"
                  className="flex items-center bg-accent hover:bg-accent-light text-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Buy Gold
                </Link>
                <Link
                  href="/sell"
                  className="flex items-center mt-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Sell Gold
                </Link>
              </div>
            </div>
          </div>
          
          {/* Historical Rates */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-primary">Historical Gold Rates</h2>
              
              {/* Tabs */}
              <div className="flex space-x-4 mt-4">
                <button
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === 'daily' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('daily')}
                >
                  Daily
                </button>
                <button
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === 'monthly' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === 'yearly' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('yearly')}
                >
                  Yearly
                </button>
              </div>
            </div>
            
            {/* Rate Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Buy Rate (₹/g)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sell Rate (₹/g)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {historyData[activeTab].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.buy.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.sell.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{(item.buy - item.sell).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Gold Rate Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Factors Affecting Gold Rates</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Global Markets</span>
                    <p className="text-sm text-gray-600">International gold prices and exchange rates</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Economic Indicators</span>
                    <p className="text-sm text-gray-600">Inflation rates, interest rates, and GDP growth</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Currency Fluctuations</span>
                    <p className="text-sm text-gray-600">Strength of the Indian Rupee against US Dollar</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Government Policies</span>
                    <p className="text-sm text-gray-600">Import duties, taxes, and regulations on gold</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Gold Investment Tips</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Diversify Your Portfolio</span>
                    <p className="text-sm text-gray-600">Allocate 5-10% of your investment portfolio to gold</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Systematic Investment</span>
                    <p className="text-sm text-gray-600">Buy gold regularly instead of timing the market</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Long-term Perspective</span>
                    <p className="text-sm text-gray-600">Gold is best as a long-term investment (3-5 years)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Track Seasonal Patterns</span>
                    <p className="text-sm text-gray-600">Gold prices often fluctuate during festival seasons</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-primary-light rounded-lg shadow-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Invest in Gold?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Start investing in digital gold today with as little as ₹1. Our platform offers you the best rates, secure storage, and easy liquidity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/buy"
                className="bg-accent hover:bg-accent-light text-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Buy Gold
              </Link>
              <Link
                href="/register"
                className="border border-accent text-accent hover:bg-accent/10 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 