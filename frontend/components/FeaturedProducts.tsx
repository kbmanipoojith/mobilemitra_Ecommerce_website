'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'Samsung Galaxy S21 Battery',
    price: 29.99,
    image: '/assets/batteries/battery1.jpeg',
    brand: 'Samsung',
    model: 'Galaxy S21',
    rating: 4.5,
    reviews: 128,
    inStock: true
  },
  {
    id: 2,
    name: 'iPhone 13 Screen',
    price: 149.99,
    image: '/assets/Screens&Displays/Screens&Displays1.jpeg',
    brand: 'Apple',
    model: 'iPhone 13',
    rating: 4.8,
    reviews: 256,
    inStock: true
  },
  {
    id: 3,
    name: 'Oppo Find X3 Back Cover',
    price: 19.99,
    image: '/assets/Power&VolumeButtons/Power&VolumeButtons1.png',
    brand: 'Oppo',
    model: 'Find X3',
    rating: 4.3,
    reviews: 89,
    inStock: false
  },
  {
    id: 4,
    name: 'Xiaomi Mi 11 Camera Module',
    price: 79.99,
    image: '/assets/Cameras&Lens/cameras&lens1.jpeg',
    brand: 'Xiaomi',
    model: 'Mi 11',
    rating: 4.6,
    reviews: 167,
    inStock: true
  },
  {
    id: 5,
    name: 'OnePlus 9 Pro Charging Port',
    price: 24.99,
    image: '/assets/ChargingPorts&cables/ChargingPorts&cables2.jpeg',
    brand: 'OnePlus',
    model: '9 Pro',
    rating: 4.7,
    reviews: 143,
    inStock: true
  },
  {
    id: 6,
    name: 'Galaxy S23 Speaker Unit',
    price: 34.99,
    image: '/assets/Speakers&AudioParts/speakers&AudioParts3.jpeg',
    brand: 'Samsung',
    model: 'Galaxy S23',
    rating: 4.4,
    reviews: 92,
    inStock: true
  },
  {
    id: 7,
    name: 'iPhone 14 Pro Battery',
    price: 45.99,
    image: '/assets/batteries/battery4.jpeg',
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    rating: 4.9,
    reviews: 215,
    inStock: true
  },
  {
    id: 8,
    name: 'Pixel 7 Display Assembly',
    price: 189.99,
    image: '/assets/Screens&Displays/Screens&Displays5.jpeg',
    brand: 'Google',
    model: 'Pixel 7',
    rating: 4.7,
    reviews: 178,
    inStock: true
  }
];

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Popular mobile parts from top brands
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <FaHeart 
                  className={`w-5 h-5 ${
                    wishlist.includes(product.id) 
                      ? 'text-red-500' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                />
              </button>

              {/* Product Image */}
              <div className="w-full h-64 relative group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {product.brand}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      product.inStock
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                    } transition-colors duration-300`}
                    disabled={!product.inStock}
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 