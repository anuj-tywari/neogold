"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case "name":
        return value.toString().trim() === "" ? "Name is required" : 
               value.toString().length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value.toString().trim() === "" ? "Email is required" : 
               !emailRegex.test(value.toString()) ? "Please enter a valid email address" : "";
      case "password":
        return value.toString().trim() === "" ? "Password is required" : 
               value.toString().length < 8 ? "Password must be at least 8 characters" : 
               !/[A-Z]/.test(value.toString()) ? "Password must contain at least one uppercase letter" : 
               !/[0-9]/.test(value.toString()) ? "Password must contain at least one number" : "";
      case "confirmPassword":
        return value.toString().trim() === "" ? "Please confirm your password" : 
               value !== formData.password ? "Passwords do not match" : "";
      case "agreeTerms":
        return value === false ? "You must agree to the terms and conditions" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    // Validate on change and update field error
    const error = validateField(name, fieldValue);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: {[key: string]: string} = {};
    let hasErrors = false;
    
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    setApiError("");
    setIsLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
    } catch (error: any) {
      setApiError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-gradient-to-tr from-primary via-primary-light to-gold animate-fadeIn">
      <div className="mx-auto w-full max-w-xl lg:max-w-2xl px-4">
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
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-white/80">
          Join NeoGold and start investing in digital gold
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-xl lg:max-w-2xl px-4">
        <div className="bg-white py-8 px-6 shadow-2xl sm:rounded-lg sm:px-10 transform transition-all duration-300 hover:shadow-gold backdrop-blur-sm bg-white/95">
          {apiError && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded animate-fadeIn" role="alert">
              <div className="flex">
                <div className="py-1">
                  <svg className="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{apiError}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name and Email in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="transform transition-all duration-300 hover:scale-101">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required={false}
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold transition-all duration-200`}
                    placeholder="John Doe"
                    onBlur={(e) => {
                      const error = validateField('name', e.target.value);
                      setErrors({...errors, name: error});
                    }}
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

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
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold transition-all duration-200`}
                    placeholder="you@example.com"
                    onBlur={(e) => {
                      const error = validateField('email', e.target.value);
                      setErrors({...errors, email: error});
                    }}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
            </div>

            {/* Password and Confirm Password in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="transform transition-all duration-300 hover:scale-101">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required={false}
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold transition-all duration-200`}
                    placeholder="Minimum 8 characters"
                    onBlur={(e) => {
                      const error = validateField('password', e.target.value);
                      setErrors({...errors, password: error});
                    }}
                  />
                </div>
                {errors.password ? 
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p> :
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters with 1 uppercase letter and 1 number</p>
                }
              </div>

              <div className="transform transition-all duration-300 hover:scale-101">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required={false}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold transition-all duration-200`}
                    placeholder="Re-enter your password"
                    onBlur={(e) => {
                      const error = validateField('confirmPassword', e.target.value);
                      setErrors({...errors, confirmPassword: error});
                    }}
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-center transform transition-all duration-300 hover:scale-101 pt-2">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required={false}
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={`h-4 w-4 text-gold focus:ring-gold ${errors.agreeTerms ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              <label
                htmlFor="agreeTerms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-primary hover:text-gold transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-primary hover:text-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeTerms && <p className="mt-1 text-xs text-red-600">{errors.agreeTerms}</p>}

            <div className="pt-2">
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
                    Creating account...
                  </div>
                ) : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
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