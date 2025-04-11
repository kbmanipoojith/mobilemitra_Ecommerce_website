'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            About MobileMitra
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Your trusted destination for mobile phones and accessories
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative">
            <Image
              src="/globe.svg"
              alt="Global reach"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              At MobileMitra, we're committed to revolutionizing the mobile phone shopping experience. 
              We connect buyers with trusted sellers, ensuring every transaction is secure, transparent, 
              and satisfactory.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What Sets Us Apart
            </h2>
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
              <li>✓ Verified sellers and authentic products</li>
              <li>✓ Competitive prices and great deals</li>
              <li>✓ Secure payment options</li>
              <li>✓ Expert customer support</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Trust',
                description: 'Building lasting relationships through transparency and reliability'
              },
              {
                title: 'Quality',
                description: 'Ensuring the highest standards in products and service'
              },
              {
                title: 'Innovation',
                description: 'Continuously improving the mobile shopping experience'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 