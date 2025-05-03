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
    description: 'All our sellers are verified'
  },
  {
    icon: FaTruck,
    title: 'Fast Delivery',
    description: 'Quick delivery to your doorstep'
  }
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden text-center flex flex-col items-center"
            >
              <div className="p-4 w-full flex justify-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white">
                  <service.icon className="w-8 h-8" />
                </div>
              </div>

              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-medium text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300">
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