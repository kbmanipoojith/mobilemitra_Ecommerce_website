'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check authentication status when component mounts
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Clear authentication tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Update UI state
      setIsLoggedIn(false);
      setIsProfileDropdownOpen(false);

      // Redirect to landing page
      router.push('/');
      
      // Force a page refresh to clear any cached states
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      router.push('/auth/user/login');
      return;
    }
    toggleProfileDropdown();
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-blue-500 text-2xl font-bold">
              MobileMitra
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/brands" className="text-gray-300 hover:text-white transition-colors">
                Brands
              </Link>
              <Link href="/models" className="text-gray-300 hover:text-white transition-colors">
                Models
              </Link>
              <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/repair-guide" className="text-gray-300 hover:text-white transition-colors">
                Repair Guide
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-1 pr-8 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <FaSearch className="absolute right-3 top-2 text-gray-400" />
              </div>
            </div>

            {isLoggedIn && (
              <Link 
                href="/user/cart" 
                className="text-gray-300 hover:text-white transition-colors relative"
              >
                <FaShoppingCart className="h-6 w-6" />
              </Link>
            )}

            {isLoggedIn && (
              <Link 
                href="/user/wishlist" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaHeart className="h-6 w-6" />
              </Link>
            )}

            <div className="relative">
              <button
                ref={buttonRef}
                onClick={handleProfileClick}
                className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none"
              >
                <FaUser className="h-6 w-6" />
              </button>

              {isLoggedIn && isProfileDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 