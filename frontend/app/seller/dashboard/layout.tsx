'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBox, FaClipboardList, FaPlus, FaChartLine } from 'react-icons/fa';

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is a seller
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetch('http://localhost:8000/api/auth/profile/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (!data.is_seller) {
        router.push('/');
      }
      setIsLoading(false);
    })
    .catch(() => {
      router.push('/auth/login');
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Seller Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/seller/dashboard" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700">
            <FaChartLine />
            <span>Overview</span>
          </Link>
          <Link href="/seller/dashboard/products" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700">
            <FaBox />
            <span>Products</span>
          </Link>
          <Link href="/seller/dashboard/orders" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700">
            <FaClipboardList />
            <span>Orders</span>
          </Link>
          <Link href="/seller/dashboard/products/add" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700">
            <FaPlus />
            <span>Add Product</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
} 