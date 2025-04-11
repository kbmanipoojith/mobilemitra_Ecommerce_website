'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { FaUser, FaShoppingCart, FaHeart, FaStore, FaSignOutAlt, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'user' | 'seller' | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initial auth check and listen for auth changes
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('accessToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          const userData = JSON.parse(user);
          setIsAuthenticated(true);
          setUserType(userData.user_type);
        } else {
          setIsAuthenticated(false);
          setUserType(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
        setUserType(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    
    // Listen for auth changes
    window.addEventListener('authChange', initializeAuth);
    window.addEventListener('storage', initializeAuth);
    
    return () => {
      window.removeEventListener('authChange', initializeAuth);
      window.removeEventListener('storage', initializeAuth);
    };
  }, []);

  // Check auth status on route changes
  useEffect(() => {
    const checkProtectedRoute = () => {
      const token = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');
      
      if ((!token || !user) && (pathname?.includes('/user/') || pathname?.includes('/seller/'))) {
        router.push('/auth/user/login');
      }
    };

    checkProtectedRoute();
  }, [pathname, router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUserType(null);
      setShowDropdown(false);
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Don't render anything while checking initial auth status
  if (isLoading) {
    return null;
  }

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="text-xl font-bold text-blue-500">MobileMitra</div>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link href="/brands" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Brands
                </Link>
                <Link href="/models" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Models
                </Link>
                <Link href="/products" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </Link>
                <Link href="/repair-guide" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Repair Guide
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md flex items-center"
              >
                <FaSearch className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && userType ? (
              <>
                {userType === 'user' && (
                  <>
                    <Link 
                      href="/user/cart" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-full"
                      title="Cart"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                    </Link>
                    <Link 
                      href="/user/wishlist" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-full"
                      title="Wishlist"
                    >
                      <FaHeart className="h-5 w-5" />
                    </Link>
                  </>
                )}
                {userType === 'seller' && (
                  <Link 
                    href="/seller/dashboard" 
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-full"
                    title="Dashboard"
                  >
                    <FaStore className="h-5 w-5" />
                  </Link>
                )}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-full"
                    title="Profile"
                  >
                    <FaUser className="h-5 w-5" />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href={`/${userType}/profile`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          Profile
                        </Link>
                        {userType === 'seller' && (
                          <Link
                            href="/seller/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/user/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/user/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 