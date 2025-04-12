'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Brand {
  id: number;
  name: string;
}

const MOBILE_BRANDS = [
  'SAMSUNG', 'vivo', 'Xiaomi', 'Apple', 'realme', 'OPPO', 'MOTOROLA', 'ONEPLUS',
  'NOKIA', 'LG', 'HUAWEI', 'Infinix', 'Micromax', 'Lenovo', 'TECNO Mobile', 'HTC',
  'LAVA', 'INTEX', 'Karbonn', 'ZTE', 'ASUS', 'HONOR', 'Alcatel', 'BLU Smartphones',
  'SPICE', 'Swing Telecom', 'SONY', 'Celkon', 'Swipe', 'Google', 'iBall', 'itel',
  'Videocon', 'Panasonic', 'GIONEE', 'Microsoft', 'Acer', 'Cubot', 'WIKO', 'Blackview',
  'uleFone', 'MEIZU', 'DOOGEE', 'ZEN', 'XOLO', 'BlackBerry', 'Allview', 'IKALL',
  'Coolpad', 'MAXX', 'UMIDIGI', 'SIEMENS', 'ZOPO', 'rage', 'SANSUI', 'Nothing',
  'fly', 'OUKITEL', 'HITECH', 'TCL'
];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/brands/');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
        const sampleBrands = MOBILE_BRANDS.map((name, index) => ({
          id: index + 1,
          name
        }));
        setBrands(sampleBrands);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Mobile Phone Brands
            </span>
          </h1>
          <p className="text-center text-gray-400 mb-8">Select a brand to view available spare parts</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-[#1e293b]/50 backdrop-blur-sm rounded-xl shadow-lg p-4 animate-pulse">
                <div className="h-6 bg-[#334155] rounded-lg w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Mobile Phone Brands
          </span>
        </h1>
        <p className="text-center text-gray-400 mb-8">Select a brand to view available spare parts</p>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1e293b]/50 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 group-hover:bg-[#1e293b]/70"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBrands.map((brand) => (
            <Link
              href={`/models/${brand.id}`}
              key={brand.id}
              className="group relative"
            >
              <div className="bg-[#1e293b]/50 backdrop-blur-sm rounded-xl shadow-lg p-4 transition-all duration-300 group-hover:bg-[#1e293b] group-hover:shadow-blue-500/20 group-hover:scale-105 border border-gray-700/50 group-hover:border-blue-500/50">
                <div className="text-base font-medium text-center text-gray-200 transition-colors duration-300 group-hover:text-blue-400">
                  {brand.name}
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center text-gray-400 mt-8 p-8 bg-[#1e293b]/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
            No brands found matching your search.
          </div>
        )}
      </div>
    </div>
  );
} 