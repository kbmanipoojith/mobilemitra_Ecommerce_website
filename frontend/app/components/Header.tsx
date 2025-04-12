'use client';

import Link from 'next/link';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

export default function Header({ isLoggedIn, handleLogout }: HeaderProps) {
  return (
    <header className="bg-[#1e293b]/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50">
      <nav className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
          MobileMitra
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/brands" className="text-gray-300 hover:text-white transition-colors">Brands</Link>
          <Link href="/models" className="text-gray-300 hover:text-white transition-colors">Models</Link>
          <Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
          <Link href="/repair-guide" className="text-gray-300 hover:text-white transition-colors">Repair Guide</Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/cart">
                <div className="text-gray-300 hover:text-white transition-colors">
                  <FaShoppingCart className="h-6 w-6" />
                </div>
              </Link>
              <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors">
                <FaSignOutAlt className="h-6 w-6" />
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
              <FaSignInAlt className="h-6 w-6" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
} 