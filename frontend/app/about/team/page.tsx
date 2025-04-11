'use client';

import Image from 'next/image';

const team = [
  {
    name: 'John Smith',
    role: 'Chief Executive Officer',
    image: '/images/team/placeholder.png',
    bio: 'With over 15 years of experience in e-commerce and mobile technology.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Chief Technology Officer',
    image: '/images/team/placeholder.png',
    bio: 'Leading our technical innovation and platform development.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image: '/images/team/placeholder.png',
    bio: 'Ensuring smooth operations and customer satisfaction.'
  },
  {
    name: 'Priya Patel',
    role: 'Customer Success Director',
    image: '/images/team/placeholder.png',
    bio: 'Dedicated to providing exceptional customer experiences.'
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Meet Our Team
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            The passionate people behind MobileMitra
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-center mt-4">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            We're always looking for talented individuals who are passionate about technology
            and e-commerce. Check out our careers page for current opportunities.
          </p>
          <div className="mt-8 text-center">
            <a
              href="/careers"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 