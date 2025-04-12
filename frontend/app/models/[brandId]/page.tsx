'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Model {
  id: number;
  name: string;
  brand: number;
  brand_name: string;
  image?: string;
}

interface Brand {
  id: number;
  name: string;
}

export default function BrandModelsPage() {
  const params = useParams();
  const brandId = params.brandId as string;
  
  const [models, setModels] = useState<Model[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (brandId) {
      Promise.all([
        fetchBrand(),
        fetchModels()
      ]).finally(() => setLoading(false));
    }
  }, [brandId]);

  const fetchBrand = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/brands/${brandId}/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch brand: ${response.status}`);
      }
      const data = await response.json();
      setBrand(data);
    } catch (err) {
      console.error('Error fetching brand:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch brand');
    }
  };

  const fetchModels = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/models/?brand=${brandId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }
      const data = await response.json();
      setModels(data);
    } catch (err) {
      console.error('Error fetching models:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch models');
      setModels([]);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/brands"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          ← Back to Brands
        </Link>
        <h1 className="text-3xl font-bold text-white">
          {brand?.name} Models
        </h1>
      </div>

      {error && (
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-400 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {models.length === 0 ? (
        <div className="text-center text-gray-400 mt-8 p-8 bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
          No models found for this brand.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <Link
              key={model.id}
              href={`/products?model=${model.id}`}
              className="group bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-6 hover:bg-[#1e293b]/70 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-900 rounded-lg overflow-hidden">
                {model.image ? (
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                {model.name}
              </h3>
              <p className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
                Click to view spare parts
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 