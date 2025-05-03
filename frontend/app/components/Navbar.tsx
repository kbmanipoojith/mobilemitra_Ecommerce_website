'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Get cart count from localStorage
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    // Initial cart count
    updateCartCount();

    // Listen for cart updates
    const handleStorageChange = () => {
      updateCartCount();
    };

    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400';
  };

  return (
    <nav className="bg-[#1e293b]/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              MobileMitra
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                href="/brands"
                className={`${isActive('/brands')} transition-colors duration-300 font-medium`}
              >
                Brands
              </Link>
              <Link
                href="/models"
                className={`${isActive('/models')} transition-colors duration-300 font-medium`}
              >
                Models
              </Link>
              <Link
                href="/products"
                className={`${isActive('/products')} transition-colors duration-300 font-medium`}
              >
                Products
              </Link>
              <Link
                href="/repair-guide"
                className={`${isActive('/repair-guide')} transition-colors duration-300 font-medium`}
              >
                Repair Guide
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/search"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
            <Link
              href="/cart"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 relative"
            >
              <FaShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 