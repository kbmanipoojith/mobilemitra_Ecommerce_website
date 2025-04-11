'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUpload } from 'react-icons/fa';

interface Brand {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
  brand: number;
}

export default function AddProduct() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    brand: '',
    model: '',
    image: null as File | null,
  });

  useEffect(() => {
    // Fetch brands
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    fetch('http://localhost:8000/api/brands/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setBrands(data))
    .catch(err => setError('Failed to load brands'));
  }, []);

  useEffect(() => {
    // Fetch models when brand is selected
    if (selectedBrand) {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      fetch(`http://localhost:8000/api/models/by_brand/?brand_id=${selectedBrand}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => setError('Failed to load models'));
    } else {
      setModels([]);
    }
  }, [selectedBrand]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('quantity', formData.quantity);
    data.append('category', formData.category);
    data.append('brand', formData.brand);
    data.append('model', formData.model);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:8000/api/seller/products/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data
      });

      if (response.ok) {
        router.push('/seller/dashboard/products');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add product');
      }
    } catch (err) {
      setError('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-300 mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-md p-2 h-32"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-md p-2"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={e => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-md p-2"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-md p-2"
            required
          >
            <option value="">Select Category</option>
            <option value="SPARE_PARTS">Spare Parts</option>
            <option value="TOOLS">Tools</option>
            <option value="ACCESSORIES">Accessories</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Brand</label>
            <select
              value={formData.brand}
              onChange={e => {
                setFormData({ ...formData, brand: e.target.value, model: '' });
                setSelectedBrand(e.target.value);
              }}
              className="w-full bg-gray-700 text-white rounded-md p-2"
              required
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Model</label>
            <select
              value={formData.model}
              onChange={e => setFormData({ ...formData, model: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-md p-2"
              required
              disabled={!selectedBrand}
            >
              <option value="">Select Model</option>
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Product Image</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center justify-center w-32 h-32 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <FaUpload className="text-gray-400 text-2xl" />
              )}
            </label>
            <div className="text-sm text-gray-400">
              Click to upload an image (PNG, JPG up to 5MB)
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
} 