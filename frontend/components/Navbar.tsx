'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const brands = [
  { name: 'Samsung', models: ['Galaxy S21', 'Galaxy S20', 'Galaxy Note 20', 'Galaxy A52'] },
  { name: 'Apple', models: ['iPhone 13', 'iPhone 12', 'iPhone 11', 'iPhone X'] },
  { name: 'Oppo', models: ['Find X3', 'Reno 6', 'A74', 'F19'] },
  { name: 'Xiaomi', models: ['Mi 11', 'Redmi Note 10', 'POCO X3', 'Mi 10T'] }
];

const products = ['Battery', 'Screen', 'Back Cover', 'Camera', 'Charging Port'];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">MobileMitra</span>
            </Link>

            {/* Dropdowns */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Brand Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Brands
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="py-1">
                    {brands.map((brand) => (
                      <button
                        key={brand.name}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                        onClick={() => setSelectedBrand(brand.name)}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Models Dropdown */}
              {selectedBrand && (
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Models
                  </button>
                  <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="py-1">
                      {brands.find(b => b.name === selectedBrand)?.models.map((model) => (
                        <button
                          key={model}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Products Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Products
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="py-1">
                    {products.map((product) => (
                      <button
                        key={product}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  className="w-64 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/auth/login" className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Login
              </Link>
              <Link href="/auth/register" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 