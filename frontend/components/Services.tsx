import { FaTools, FaShoppingCart, FaUserShield, FaTruck } from 'react-icons/fa';

const services = [
  {
    icon: FaTools,
    title: 'Quality Parts',
    description: 'We provide genuine mobile parts with warranty'
  },
  {
    icon: FaShoppingCart,
    title: 'Easy Shopping',
    description: 'Simple and secure shopping experience'
  },
  {
    icon: FaUserShield,
    title: 'Verified Sellers',
    description: 'All our sellers are verified professionals'
  },
  {
    icon: FaTruck,
    title: 'Fast Delivery',
    description: 'Quick delivery to your doorstep'
  }
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Everything you need for mobile parts and repairs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex p-3 rounded-lg bg-blue-600 text-white group-hover:bg-blue-700 transition-colors duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white text-center">
                  {service.title}
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300 text-center">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 