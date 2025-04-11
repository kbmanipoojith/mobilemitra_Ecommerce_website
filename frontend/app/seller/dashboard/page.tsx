'use client';

import { useEffect, useState } from 'react';
import { FaBox, FaExclamationTriangle, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

interface DashboardStats {
  seller: {
    business_name: string;
    phone: string;
    address: string;
  };
  statistics: {
    total_products: number;
    out_of_stock: number;
    low_stock: number;
    recent_orders_count: number;
    monthly_revenue: number;
  };
  recent_orders: Array<{
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
  }>;
}

export default function SellerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    fetch('http://localhost:8000/api/seller/dashboard/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setStats(data);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load dashboard data');
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stats) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Welcome, {stats.seller.business_name}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-white">{stats.statistics.total_products}</p>
            </div>
            <FaBox className="text-blue-500 text-3xl" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Out of Stock</p>
              <p className="text-2xl font-bold text-red-500">{stats.statistics.out_of_stock}</p>
            </div>
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Recent Orders</p>
              <p className="text-2xl font-bold text-white">{stats.statistics.recent_orders_count}</p>
            </div>
            <FaShoppingCart className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">₹{stats.statistics.monthly_revenue}</p>
            </div>
            <FaDollarSign className="text-yellow-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_orders.map(order => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.status === 'PENDING' ? 'bg-yellow-500' :
                      order.status === 'CONFIRMED' ? 'bg-blue-500' :
                      order.status === 'SHIPPED' ? 'bg-purple-500' :
                      order.status === 'DELIVERED' ? 'bg-green-500' :
                      'bg-red-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">₹{order.total_amount}</td>
                  <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 