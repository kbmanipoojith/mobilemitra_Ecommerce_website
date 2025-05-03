'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaShoppingCart, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  image: string;
  stock: number;
  category_name: string;
  model_name: string;
  brand_name: string;
}

const getCategoryImage = (category: string, modelName: string, index: number = 1): string => {
  // Map the backend category names to the exact folder names
  const categoryMap: { [key: string]: string } = {
    'Battery Replacement Parts': 'batteries',
    'Screen & Display Assemblies': 'Screens&Displays',
    'Charging Port & Cable Modules': 'ChargingPorts&cables',
    'Camera & Lens Assemblies': 'Cameras&Lens',
    'Power & Volume Button Modules': 'Power&VolumeButtons',
    'Speaker & Audio Components': 'Speakers&AudioParts',
    // Add fallback mappings for shorter names
    'battery': 'batteries',
    'screen': 'Screens&Displays',
    'charging': 'ChargingPorts&cables',
    'camera': 'Cameras&Lens',
    'button': 'Power&VolumeButtons',
    'speaker': 'Speakers&AudioParts'
  };

  // First try to get the exact match, then try lowercase, then use the original category
  const folderName = categoryMap[category] || categoryMap[category.toLowerCase()] || category;
  
  // Ensure the index is within bounds
  const safeIndex = Math.max(1, Math.min(index, 5)); // Limit to 5 images maximum
  
  // Construct the path based on the category
  const basePath = `/assets/${folderName}`;
  
  // Try different image formats based on the category
  switch(folderName) {
    case 'phones':
      // For phones, use the model name in the image path
      const formattedModelName = modelName.replace(/\s+/g, '_').toUpperCase();
      return `${basePath}/${formattedModelName}.png`;
    case 'Power&VolumeButtons':
      // Special case: Power&VolumeButtons has mixed extensions (1 and 5 are PNG)
      return `${basePath}/Power&VolumeButtons${safeIndex}${safeIndex === 1 || safeIndex === 5 ? '.png' : '.jpeg'}`;
    case 'Cameras&Lens':
      return `${basePath}/cameras&lens${safeIndex}.jpeg`;
    case 'ChargingPorts&cables':
      return `${basePath}/ChargingPorts&cables${safeIndex}.jpeg`;
    case 'Screens&Displays':
      return `${basePath}/Screens&Displays${safeIndex}.jpeg`;
    case 'Speakers&AudioParts':
      return `${basePath}/Speakers&AudioParts${safeIndex}.jpeg`;
    case 'batteries':
      return `${basePath}/battery${safeIndex}.jpeg`;
    default:
      // Fallback to a default image if category is unknown
      return `/assets/mobilemitralogo.png`;
  }
};

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const maxImages = 2; // We'll show 2 images per product

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`http://localhost:8000/api/products/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!product) return;
    
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // For logged-in users, add to server cart
        const response = await fetch('http://localhost:8000/api/cart/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            product: product.id,
            quantity: quantity
          })
        });

        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }

        // Dispatch cart updated event for logged-in users
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      } else {
        // For non-logged in users, add to localStorage cart
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((item: any) => item.product === product.id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({
            product: product.id,
            quantity: quantity,
            name: product.name,
            price: product.price,
            image: getCategoryImage(product.category_name, product.model_name, 1),
            brand_name: product.brand_name,
            model_name: product.model_name,
            category_name: product.category_name
          });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Dispatch cart updated event for non-logged-in users
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }

      // Show success message
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const addToWishlist = async () => {
    if (!product) return;
    
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
          product_id: product.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }

      // Show success message
      alert('Product added to wishlist successfully!');
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

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-400 text-red-200 px-4 py-3 rounded-lg">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={getCategoryImage(product.category_name, product.model_name, currentImageIndex)}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/assets/file.svg';
                target.className = 'w-32 h-32 m-auto opacity-50';
              }}
            />
          </div>
          <div className="flex justify-center space-x-4">
            {Array.from({ length: maxImages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i + 1)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  currentImageIndex === i + 1 ? 'border-blue-500 scale-105' : 'border-gray-700 hover:border-blue-400'
                }`}
              >
                <img
                  src={getCategoryImage(product.category_name, product.model_name, i + 1)}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/assets/file.svg';
                    target.className = 'w-8 h-8 m-auto opacity-50';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>
          <p className="text-gray-400">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-white">
              ₹{typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <FaMinus />
              </button>
              <span className="w-12 text-center text-white font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                product.stock === 0
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-1'
              }`}
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={addToWishlist}
              className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <FaHeart className="w-6 h-6" />
            </button>
          </div>

          <div className="border-t border-gray-700 pt-6 mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">Product Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Brand:</span>
                <span className="text-white ml-2">{product.brand_name}</span>
              </div>
              <div>
                <span className="text-gray-400">Model:</span>
                <span className="text-white ml-2">{product.model_name}</span>
              </div>
              <div>
                <span className="text-gray-400">Category:</span>
                <span className="text-white ml-2">{product.category_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 