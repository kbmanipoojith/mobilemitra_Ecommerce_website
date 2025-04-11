'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FaUpload, FaSpinner } from 'react-icons/fa';

interface ProductFormData {
  brand: string;
  model: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  payment_methods: string[];
  image: File | null;
}

interface Brand {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
  brand: number;
}

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    brand: '',
    model: '',
    name: '',
    description: '',
    stock: 0,
    price: 0,
    payment_methods: ['online'],
    image: null,
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | Record<string, string>>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  // Fetch brands when component mounts
  useEffect(() => {
    fetchBrands();
  }, []);

  // Fetch models when brand changes
  useEffect(() => {
    if (formData.brand) {
      fetchModels(formData.brand);
    }
  }, [formData.brand]);

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/api/brands/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch brands');
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      setError('Failed to load brands');
    }
  };

  const fetchModels = async (brandId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/api/brands/${brandId}/models/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch models');
      const data = await response.json();
      setModels(data);
    } catch (err) {
      setError('Failed to load models');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const methods = [...formData.payment_methods];
      if (checkbox.checked) {
        methods.push(checkbox.value);
      } else {
        const index = methods.indexOf(checkbox.value);
        if (index > -1) methods.splice(index, 1);
      }
      setFormData(prev => ({ ...prev, payment_methods: methods }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/seller/login');
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'payment_methods') {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (key === 'image' && value) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      const response = await fetch('http://localhost:8000/api/products/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === 'object' && data !== null) {
          setError(data);
        } else {
          throw new Error(data.detail || 'Failed to add product');
        }
        return;
      }

      router.push('/seller/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while adding the product');
    } finally {
      setLoading(false);
    }
  };

  const renderError = () => {
    if (!error) return null;
    
    if (typeof error === 'string') {
      return (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      );
    }

    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
        <ul className="list-disc list-inside">
          {Object.entries(error).map(([key, value]) => (
            <li key={key}>{Array.isArray(value) ? value[0] : value}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-white mb-8">Add New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderError()}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-300">
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.brand}
                  onChange={handleChange}
                >
                  <option value="">Select a brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-300">
                  Model
                </label>
                <select
                  id="model"
                  name="model"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.model}
                  onChange={handleChange}
                >
                  <option value="">Select a model</option>
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-300">
                  Stock Available
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  required
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Methods
                </label>
                <div className="space-y-2">
                  <label className="inline-flex items-center mr-6">
                    <input
                      type="checkbox"
                      name="payment_methods"
                      value="cod"
                      checked={formData.payment_methods.includes('cod')}
                      onChange={handleChange}
                      className="form-checkbox h-4 w-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-300">Cash on Delivery</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="payment_methods"
                      value="online"
                      checked={formData.payment_methods.includes('online')}
                      onChange={handleChange}
                      className="form-checkbox h-4 w-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-300">Online Payment</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative w-full h-64">
                        <Image
                          src={imagePreview}
                          alt="Product preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaUpload className="h-12 w-12 text-gray-400" />
                        <p className="text-gray-300 mt-2">
                          <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
                            Upload an image
                          </span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      required
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="inline-block mr-2 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 