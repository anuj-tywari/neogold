"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "../context";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-lg' : 'bg-primary/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-10 mr-2">
              <Image 
                src="/logo.svg" 
                alt="NeoGold Logo" 
                width={40} 
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-bold text-accent group-hover:text-accent-light transition-colors duration-300">
              NeoGold
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent ${
                isActive('/') 
                  ? 'text-accent after:scale-x-100' 
                  : 'text-white hover:text-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left'
              } after:transition-transform after:duration-300`}
            >
              Home
            </Link>
            <Link
              href="/buy"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent ${
                isActive('/buy') 
                  ? 'text-accent after:scale-x-100' 
                  : 'text-white hover:text-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left'
              } after:transition-transform after:duration-300`}
            >
              Buy
            </Link>
            <Link
              href="/sell"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent ${
                isActive('/sell') 
                  ? 'text-accent after:scale-x-100' 
                  : 'text-white hover:text-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left'
              } after:transition-transform after:duration-300`}
            >
              Sell
            </Link>
            <Link
              href="/redeem"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent ${
                isActive('/redeem') 
                  ? 'text-accent after:scale-x-100' 
                  : 'text-white hover:text-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left'
              } after:transition-transform after:duration-300`}
            >
              Redeem
            </Link>
            <Link
              href="/rates"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent ${
                isActive('/rates') 
                  ? 'text-accent after:scale-x-100' 
                  : 'text-white hover:text-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left'
              } after:transition-transform after:duration-300`}
            >
              Gold Rates
            </Link>
            <Link
              href="/calculator"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent ${
                isActive('/calculator') 
                  ? 'text-accent after:scale-x-100' 
                  : 'text-white hover:text-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left'
              } after:transition-transform after:duration-300`}
            >
              Gold Calculator
            </Link>
          </div>
          
          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-white hover:text-accent px-3 py-2 text-sm font-medium transition-colors duration-300">
                  <span>{user.name || user.email}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-1">
                    <Link 
                      href="/dashboard" 
                      className={`block px-4 py-2 text-sm ${isActive('/dashboard') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary hover:text-white'} transition-colors duration-200`}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className={`block px-4 py-2 text-sm ${isActive('/profile') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary hover:text-white'} transition-colors duration-200`}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${isActive('/login') ? 'text-accent' : 'text-white hover:text-accent'}`}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:shadow-lg ${
                    isActive('/register') 
                      ? 'bg-accent-light text-primary-dark' 
                      : 'bg-accent text-primary hover:bg-accent-light'
                  }`}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fadeIn bg-primary border-t border-primary-light">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/') ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/buy"
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/buy') ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Buy
            </Link>
            <Link
              href="/sell"
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/sell') ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sell
            </Link>
            <Link
              href="/redeem"
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/redeem') ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Redeem
            </Link>
            <Link
              href="/rates"
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/rates') ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gold Rates
            </Link>
            <Link
              href="/calculator"
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/calculator') ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gold Calculator
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-primary-light">
            {user ? (
              <div className="px-2 space-y-1">
                <Link
                  href="/dashboard"
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/dashboard') ? 'text-accent' : 'text-white hover:text-accent'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/profile') ? 'text-accent' : 'text-white hover:text-accent'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-accent transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  href="/login"
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive('/login') ? 'text-accent' : 'text-white hover:text-accent'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className={`block px-3 py-2 text-base font-medium bg-accent text-primary hover:bg-accent-light transition-colors duration-200 rounded mt-1 ${isActive('/register') ? 'bg-accent-light' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 