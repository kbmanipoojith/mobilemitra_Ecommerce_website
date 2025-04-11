'use client';

import Image from 'next/image';

const userServices = [
  {
    title: 'Verified Products',
    description: 'Access to genuine mobile phones and parts with authenticity verification.',
    icon: '🛡️',
  },
  {
    title: 'Secure Payments',
    description: 'Multiple secure payment options with buyer protection guarantee.',
    icon: '💳',
  },
  {
    title: 'Price Comparison',
    description: 'Compare prices across different sellers to get the best deals.',
    icon: '💰',
  },
  {
    title: 'Expert Support',
    description: '24/7 customer support to assist with your purchases and queries.',
    icon: '🎯',
  },
  {
    title: 'Easy Returns',
    description: 'Hassle-free return policy with quick refunds.',
    icon: '🔄',
  },
  {
    title: 'Product Reviews',
    description: 'Authentic reviews from verified buyers to make informed decisions.',
    icon: '⭐',
  }
];

const sellerServices = [
  {
    title: 'Business Dashboard',
    description: 'Comprehensive dashboard to manage products, orders, and analytics.',
    icon: '📊',
  },
  {
    title: 'Marketing Tools',
    description: 'Built-in marketing tools to promote your products effectively.',
    icon: '📢',
  },
  {
    title: 'Secure Payments',
    description: 'Timely and secure payment processing with detailed transaction history.',
    icon: '💰',
  },
  {
    title: 'Inventory Management',
    description: 'Advanced tools to manage your inventory and track stock levels.',
    icon: '📦',
  },
  {
    title: 'Analytics & Reports',
    description: 'Detailed insights and reports to grow your business.',
    icon: '📈',
  },
  {
    title: 'Seller Support',
    description: 'Dedicated seller support team to help you succeed.',
    icon: '🤝',
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions for both buyers and sellers in the mobile phone marketplace
          </p>
        </div>

        {/* For Buyers Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            For Buyers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userServices.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* For Sellers Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            For Sellers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellerServices.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-blue-600 dark:bg-blue-700 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join our platform today and experience the best marketplace for mobile phones and accessories.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/auth/user/register"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                Register as Buyer
              </a>
              <a
                href="/auth/seller/register"
                className="bg-blue-800 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Become a Seller
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 