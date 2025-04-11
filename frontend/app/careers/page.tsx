'use client';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We're looking for an experienced frontend developer to help build and maintain our next-generation e-commerce platform.'
  },
  {
    title: 'Customer Support Specialist',
    department: 'Customer Success',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Join our customer support team to help provide exceptional service to our users and sellers.'
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'On-site',
    type: 'Full-time',
    description: 'Lead the development and execution of product initiatives that drive growth and user satisfaction.'
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Join Our Team
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Help us revolutionize the mobile phone marketplace. We're looking for passionate
            individuals who want to make a difference.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Current Openings
          </h2>
          <div className="grid gap-6">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {job.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
            Why Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Growth Opportunities',
                description: 'Continuous learning and career development paths'
              },
              {
                title: 'Competitive Benefits',
                description: 'Comprehensive health coverage and retirement plans'
              },
              {
                title: 'Work-Life Balance',
                description: 'Flexible working hours and remote options'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 