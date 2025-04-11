'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'You can create an account by clicking the "Sign Up" button in the top right corner of the page. Fill in your details, verify your email address, and you\'re ready to go!'
  },
  {
    question: 'How can I list my products for sale?',
    answer: 'To sell products, you\'ll need a seller account. Once registered as a seller, you can access your dashboard and use the "Add Product" feature to list your items.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards, debit cards, UPI, and various digital wallets. All payments are processed securely through our payment gateway.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping times vary depending on your location and the seller. Typically, orders are delivered within 3-7 business days. You can track your order through your account dashboard.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for most items. Products must be in their original condition and packaging. Some restrictions apply to certain categories.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach our customer support team through the Contact Us page, email at support@mobilemitra.com, or call us at 1-800-MOBILE during business hours.'
  },
  {
    question: 'Are the products authentic?',
    answer: 'Yes, we work only with verified sellers and have strict authenticity checks in place. All products sold on our platform are genuine and come with manufacturer warranty where applicable.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can also track your order through your account dashboard under "My Orders".'
  }
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Find answers to common questions about MobileMitra
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`w-6 h-6 transform ${
                        openIndex === index ? 'rotate-180' : ''
                      } text-gray-500 dark:text-gray-400`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Can't find what you're looking for?{' '}
            <a
              href="/support/contact"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 