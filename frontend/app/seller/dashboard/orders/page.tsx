'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  id: number;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  user_name: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  status_display: string;
  shipping_address: string;
  created_at: string;
}

export default function SellerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const url = statusFilter
      ? `http://localhost:8000/api/seller/orders/?status=${statusFilter}`
      : 'http://localhost:8000/api/seller/orders/';

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setOrders(data);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load orders');
      setLoading(false);
    });
  }, [statusFilter]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8000/api/seller/orders/${orderId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(order =>
          order.id === orderId ? updatedOrder : order
        ));
      } else {
        setError('Failed to update order status');
      }
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-700 text-white rounded-md px-4 py-2"
        >
          <option value="">All Orders</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    Total: ₹{order.total_amount}
                  </p>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`mt-2 px-3 py-1 rounded text-sm ${
                      order.status === 'PENDING' ? 'bg-yellow-500' :
                      order.status === 'CONFIRMED' ? 'bg-blue-500' :
                      order.status === 'SHIPPED' ? 'bg-purple-500' :
                      order.status === 'DELIVERED' ? 'bg-green-500' :
                      'bg-red-500'
                    }`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-white font-semibold mb-2">Customer</h4>
                <p className="text-gray-400">{order.user_name}</p>
                <p className="text-gray-400 whitespace-pre-line">
                  {order.shipping_address}
                </p>
              </div>

              <div className="border-t border-gray-700 mt-4 pt-4">
                <h4 className="text-white font-semibold mb-4">Order Items</h4>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      {item.product_image && (
                        <img
                          src={`http://localhost:8000${item.product_image}`}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-white">{item.product_name}</p>
                        <p className="text-gray-400">
                          {item.quantity} x ₹{item.price}
                        </p>
                      </div>
                      <p className="text-white font-semibold">
                        ₹{item.quantity * item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 