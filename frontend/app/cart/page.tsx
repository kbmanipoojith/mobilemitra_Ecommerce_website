'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

interface CartItem {
  product: number;
  quantity: number;
  name: string;
  price: number | string;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.product === productId) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.product !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('storage'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-400 mb-4">Your cart is empty</p>
          <Link 
            href="/products"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.product}
                className="bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={item.image || '/assets/file.svg'}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/file.svg';
                        target.className = 'w-12 h-12 m-auto opacity-50';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{item.name}</h3>
                    <p className="text-gray-400">₹{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product, item.quantity - 1)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <FaMinus />
                    </button>
                    <span className="w-12 text-center text-white font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product, item.quantity + 1)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => removeItem(item.product)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200 ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 h-fit">
            <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{formatPrice(calculateTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between text-white font-semibold">
                <span>Total</span>
                <span>₹{formatPrice(calculateTotal())}</span>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              onClick={() => alert('Checkout functionality coming soon!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 