'use client';

import Link from 'next/link';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    // Listen for cart updates
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(updatedCart.length);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
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
              <form className="relative" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-1 pr-8 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                >
                  <FaSearch className="h-4 w-4" />
                </button>
              </form>
            </div>

            <Link
              href="/cart"
              className="text-gray-300 hover:text-white transition-colors relative"
            >
              <FaShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button className="flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none">
                <FaUser className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 