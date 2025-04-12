'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { generatePrice } from '@/utils/priceGenerator';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  image: string | null;
  stock: number;
  brand_name: string;
  model_name: string;
  category_name: string;
}

// Define product categories with exact backend names and mapping
const PRODUCT_CATEGORIES = [
  { 
    id: 'Batteries',
    name: 'Batteries',
    icon: 'battery',
    backendNames: ['Battery Replacement Parts', 'Battery']
  },
  { 
    id: 'Screens & Displays',
    name: 'Screens & Displays',
    icon: 'screen',
    backendNames: ['Screen & Display Assemblies', 'Screen']
  },
  { 
    id: 'Charging Ports & Cables',
    name: 'Charging Ports & Cables',
    icon: 'charging',
    backendNames: ['Charging Port & Cable Modules', 'Charging Port']
  },
  { 
    id: 'Cameras & Lens',
    name: 'Cameras & Lens',
    icon: 'camera',
    backendNames: ['Camera & Lens Assemblies', 'Camera']
  },
  { 
    id: 'Power & Volume Buttons',
    name: 'Power & Volume Buttons',
    icon: 'button',
    backendNames: ['Power & Volume Button Modules', 'Button']
  },
  { 
    id: 'Speakers & Audio',
    name: 'Speakers & Audio',
    icon: 'speaker',
    backendNames: ['Speaker & Audio Components', 'Speaker']
  }
];

const getModelImageIndex = (modelName: string): number => {
  // Map of model names to image numbers (1-6)
  const modelMap: { [key: string]: number } = {
    'Galaxy S21': 1,
    'Galaxy S22': 2,
    'Galaxy S23': 3,
    'Galaxy S24': 4,
    'iPhone 13': 5,
    'iPhone 14': 6,
    'iPhone 15': 1,
    'iPhone 15 Pro': 2,
    'Edge 40': 3,
    'Find X6': 4,
    'G Stylus': 5,
    'Galaxy A55': 6
  };

  return modelMap[modelName] || Math.floor(Math.random() * 6) + 1;
};

const getCategoryImage = (category: string, modelName: string): string => {
  const categoryMap: { [key: string]: string } = {
    'battery': 'batteries',
    'screen': 'Screens & Displays',
    'charging': 'Charging Ports & cables',
    'camera': 'Cameras & Lens',
    'button': 'Power & Volume Buttons',
    'speaker': 'Speakers & Audio'
  };

  const folderName = categoryMap[category.toLowerCase()] || category;
  const imageNumber = getModelImageIndex(modelName);

  if (folderName === 'Power & Volume Buttons') {
    // Handle the special case for Power & Volume Buttons which has mixed extensions
    return imageNumber === 1 || imageNumber === 5 
      ? `/assets/${folderName}/Power&VolumeButtons${imageNumber}.png`
      : `/assets/${folderName}/Power&VolumeButtons${imageNumber}.jpeg`;
  }

  // Handle other categories
  if (folderName === 'Cameras & Lens') {
    return `/assets/${folderName}/cameras&lens${imageNumber}.jpeg`;
  }

  if (folderName === 'Charging Ports & cables') {
    return `/assets/${folderName}/ChargingPorts&cables${imageNumber}.jpeg`;
  }

  if (folderName === 'Screens & Displays') {
    return `/assets/${folderName}/Screens&Displays${imageNumber}.jpeg`;
  }

  // For batteries and other categories
  return `/assets/${folderName}/battery${imageNumber}.jpeg`;
};

// Sample spare parts data
const SAMPLE_SPARE_PARTS: Product[] = [
  // Battery Products
  {
    id: 1,
    name: 'Samsung S23 Battery',
    description: 'Original battery replacement with 4000mAh capacity',
    price: 2499.99,
    image: '/assets/batteries/battery2.jpeg',
    stock: 15,
    brand_name: 'Samsung',
    model_name: 'Galaxy S23',
    category_name: 'battery'
  },
  {
    id: 2,
    name: 'iPhone 15 Battery',
    description: 'Genuine Apple battery replacement',
    price: 3999.99,
    image: '/assets/batteries/battery3.jpeg',
    stock: 12,
    brand_name: 'Apple',
    model_name: 'iPhone 15',
    category_name: 'battery'
  },
  // Screen Products
  {
    id: 3,
    name: 'S23 AMOLED Display',
    description: 'Original Samsung AMOLED screen with installation kit',
    price: 12999.99,
    image: '/assets/Screens &Displays/Screens&Displays2.jpeg',
    stock: 10,
    brand_name: 'Samsung',
    model_name: 'Galaxy S23',
    category_name: 'screen'
  },
  {
    id: 4,
    name: 'iPhone 15 Pro OLED',
    description: 'Genuine Apple OLED display with True Tone',
    price: 15999.99,
    image: '/assets/Screens &Displays/Screens&Displays3.jpeg',
    stock: 8,
    brand_name: 'Apple',
    model_name: 'iPhone 15 Pro',
    category_name: 'screen'
  },
  // Charging Port Products
  {
    id: 5,
    name: 'S23 USB-C Port',
    description: 'Original charging port with flex cable',
    price: 1499.99,
    image: '/assets/Charging Ports & cables/ChargingPorts&cables1.jpeg',
    stock: 20,
    brand_name: 'Samsung',
    model_name: 'Galaxy S23',
    category_name: 'charging'
  },
  {
    id: 6,
    name: 'iPhone Lightning Port',
    description: 'Genuine Apple lightning port assembly',
    price: 2499.99,
    image: '/assets/Charging Ports & cables/ChargingPorts&cables2.jpeg',
    stock: 15,
    brand_name: 'Apple',
    model_name: 'iPhone 15',
    category_name: 'charging'
  },
  // Camera Products
  {
    id: 7,
    name: 'S23 Main Camera',
    description: '200MP main camera module with OIS',
    price: 8999.99,
    image: '/assets/Cameras & Lens/cameras&lens1.jpeg',
    stock: 8,
    brand_name: 'Samsung',
    model_name: 'Galaxy S23',
    category_name: 'camera'
  },
  {
    id: 8,
    name: 'iPhone 15 Pro Camera',
    description: '48MP main camera with LiDAR',
    price: 9999.99,
    image: '/assets/Cameras & Lens/cameras&lens2.jpeg',
    stock: 6,
    brand_name: 'Apple',
    model_name: 'iPhone 15 Pro',
    category_name: 'camera'
  },
  // Button Products
  {
    id: 9,
    name: 'S23 Button Set',
    description: 'Complete button set with flex cables',
    price: 999.99,
    image: '/assets/Power & Volume Buttons/Power&VolumeButtons1.png',
    stock: 25,
    brand_name: 'Samsung',
    model_name: 'Galaxy S23',
    category_name: 'button'
  },
  {
    id: 10,
    name: 'iPhone Button Kit',
    description: 'Full button replacement set',
    price: 1299.99,
    image: '/assets/Power & Volume Buttons/Power&VolumeButtons2.jpeg',
    stock: 20,
    brand_name: 'Apple',
    model_name: 'iPhone 15',
    category_name: 'button'
  }
];

// Add interface for grouped products
interface GroupedProducts {
  [category: string]: Product[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const modelId = searchParams.get('model');
  const brandId = searchParams.get('brand');
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const getPageTitle = () => {
    return 'All Spare Parts';
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      let url = 'http://localhost:8000/api/products/';
      const params = new URLSearchParams();
      
      // Add search query if present
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      // Add other filters
      if (modelId && modelId !== 'all') {
        params.append('model_id', modelId);
      }
      if (brandId && brandId !== 'all') {
        params.append('brand_id', brandId);
      }
      if (category && category !== 'all') {
        params.append('category', category);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log('Fetching products from:', url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received products:', data);
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Parameters changed:', { modelId, brandId, category, searchQuery });
    fetchProducts();
  }, [modelId, brandId, category, searchQuery]);

  const addToCart = async (productId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Please login to add items to cart');
      }

      const response = await fetch('http://localhost:8000/api/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      // Show success message or update UI
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Please login to add items to wishlist');
      }

      const response = await fetch('http://localhost:8000/api/wishlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }

      // Show success message or update UI
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">Spare Parts</h1>
      <h2 className="text-xl text-gray-400 mb-6">{getPageTitle()}</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {PRODUCT_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.name}`}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              category === cat.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center text-gray-400 mt-8 p-8 bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
          No spare parts found for the selected filters or search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[#1e293b]/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-800 overflow-hidden">
                {product.image ? (
                  <img
                    src={getCategoryImage(product.category_name, product.model_name)}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/assets/placeholder.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {product.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    ₹{typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToWishlist(product.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-full transition-all duration-300 transform hover:scale-110"
                      title="Add to Wishlist"
                    >
                      <FaHeart className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 rounded-full transition-all duration-300 transform hover:scale-110"
                      title="Add to Cart"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}