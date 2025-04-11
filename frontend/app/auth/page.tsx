'use client';

import Link from 'next/link';
import { FaUser, FaStore } from 'react-icons/fa';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            Choose Your Account Type
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* User Account Card */}
          <div className="relative group">
            <div className="relative bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden transform transition-all duration-200 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-blue-500 bg-opacity-10 rounded-full">
                    <FaUser className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-2">
                  User Account
                </h3>
                <p className="text-gray-300 text-center mb-8">
                  Buy mobile parts and access repair guides for your devices
                </p>
                <div className="space-y-4">
                  <Link
                    href="/auth/user/login"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Login as User
                  </Link>
                  <Link
                    href="/auth/user/register"
                    className="w-full flex justify-center py-2 px-4 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Register as User
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Account Card */}
          <div className="relative group">
            <div className="relative bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden transform transition-all duration-200 hover:scale-105">
              <div className="px-6 py-8">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-green-500 bg-opacity-10 rounded-full">
                    <FaStore className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-2">
                  Seller Account
                </h3>
                <p className="text-gray-300 text-center mb-8">
                  List and sell mobile parts to customers across the platform
                </p>
                <div className="space-y-4">
                  <Link
                    href="/auth/seller/login"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Login as Seller
                  </Link>
                  <Link
                    href="/auth/seller/register"
                    className="w-full flex justify-center py-2 px-4 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-500 bg-transparent hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Register as Seller
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 