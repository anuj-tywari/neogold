"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): string => {
    if (email.trim() === "") {
      return "Email is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API endpoint to send a password reset email
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-gradient-to-tr from-primary via-primary-light to-gold animate-fadeIn">
      <div className="mx-auto w-full max-w-md lg:max-w-lg px-4">
        <div className="flex justify-center mb-6">
          <div className="relative h-16 w-16 bg-white p-2 rounded-full shadow-lg">
            <Image 
              src="/logo.svg" 
              alt="NeoGold Logo" 
              width={64} 
              height={64}
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold text-white">
          Forgot Your Password?
        </h2>
        <p className="mt-2 text-center text-white/80">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-md lg:max-w-lg px-4">
        <div className="bg-white py-8 px-6 shadow-2xl sm:rounded-lg sm:px-10 transform transition-all duration-300 hover:shadow-gold backdrop-blur-sm bg-white/95">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded animate-fadeIn" role="alert">
              <div className="flex">
                <div className="py-1">
                  <svg className="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Reset Link Sent</h3>
              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>. Please check your email inbox and follow the instructions to reset your password.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-gold transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="transform transition-all duration-300 hover:scale-101">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required={false}
                    value={email}
                    onChange={handleEmailChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold transition-all duration-200`}
                    placeholder="you@example.com"
                    onBlur={() => {
                      const validationError = validateEmail(email);
                      setEmailError(validationError);
                    }}
                  />
                </div>
                {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-black bg-gradient-to-r from-yellow-400 via-gold to-yellow-500 hover:from-yellow-500 hover:via-gold hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : "Send Reset Link"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-gold transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 