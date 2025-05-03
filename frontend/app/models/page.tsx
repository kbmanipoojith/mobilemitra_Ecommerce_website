'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
  models: Model[];
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const brandId = searchParams.get('brand');

  const getModelImage = (modelName: string, brandName: string) => {
    // Format the brand name and model name to match the image filenames
    const formattedBrandName = brandName.toUpperCase();
    const formattedModelName = modelName.replace(/\s+/g, '_');
    
    // Try both formats (with and without brand prefix)
    return `/assets/phones/${formattedBrandName}_${formattedModelName}.jpg`;
  };

  useEffect(() => {
    fetchModels();
  }, [brandId]);

  const fetchModels = async () => {
    try {
      setLoading(true);
      setError('');

      let url = 'http://localhost:8000/api/models/';
      if (brandId) {
        url += `?brand=${brandId}`;
      }

      console.log('Fetching models from:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received models:', data);
      setModels(data);
    } catch (err) {
      console.error('Error fetching models:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch models');
      setModels([]);
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold text-white mb-8">Mobile Models</h1>

      {error && (
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-400 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {models.length === 0 ? (
        <div className="text-center text-gray-400 mt-8 p-8 bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
          No models found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <Link
              key={model.id}
              href={`/products?model=${model.id}`}
              className="group bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-4 hover:bg-[#1e293b]/70 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="aspect-w-16 aspect-h-9 mb-2 bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={getModelImage(model.name, model.brand_name)}
                  alt={model.name}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const brandName = model.brand_name?.toUpperCase() || '';
                    const modelName = model.name.replace(/\s+/g, '_');
                    
                    // Try different formats
                    const formats = [
                      `/assets/phones/${modelName}.jpg`,  // Try without brand name
                      `/assets/phones/${brandName}_${modelName}.png`,  // Try PNG format
                      `/assets/phones/${modelName}.png`,  // Try PNG without brand name
                      `/assets/phones/${model.name}.jpg`,  // Try with spaces
                      `/assets/phones/${model.name}.png`,  // Try with spaces PNG
                      // Try with brand name variations
                      `/assets/phones/${model.brand_name}_${modelName}.jpg`,
                      `/assets/phones/${model.brand_name}_${modelName}.png`,
                      `/assets/phones/${model.brand_name}_${model.name}.jpg`,
                      `/assets/phones/${model.brand_name}_${model.name}.png`
                    ];
                    
                    let currentFormat = 0;
                    const tryNextFormat = () => {
                      currentFormat++;
                      if (currentFormat < formats.length) {
                        console.log('Trying format:', formats[currentFormat]); // Debug log
                        target.src = formats[currentFormat];
                        target.onerror = tryNextFormat;
                      } else {
                        console.log('All formats failed, using fallback image'); // Debug log
                        target.src = '/assets/file.svg';
                        target.className = 'w-16 h-16 m-auto opacity-50';
                        target.onerror = null; // Prevent further retries
                      }
                    };
                    
                    target.onerror = tryNextFormat;
                    target.src = formats[0];
                  }}
                />
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
                {model.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Click to view spare parts
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 