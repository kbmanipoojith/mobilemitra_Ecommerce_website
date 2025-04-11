'use client';

import { FaBatteryFull, FaMobile, FaPlug, FaVolumeUp, FaCamera, FaMicrochip, FaPowerOff, FaVolumeDown, FaWindowRestore, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

const repairGuides = [
  {
    title: 'Battery Replacement',
    icon: <FaBatteryFull className="w-8 h-8" />,
    steps: [
      'Power off the phone',
      'Remove back panel/screws if needed',
      'Disconnect old battery',
      'Insert and connect new battery',
      'Reassemble and test charging'
    ],
    color: 'bg-green-500',
    difficulty: 'Easy',
    timeEstimate: '30-45 mins',
    warning: 'Ensure battery is compatible with your model',
    slug: 'battery-replacement'
  },
  {
    title: 'Screen Replacement',
    icon: <FaMobile className="w-8 h-8" />,
    steps: [
      'Power off and remove SIM tray',
      'Use a heat gun to loosen the screen',
      'Pry out the old screen carefully',
      'Disconnect old screen flex cables',
      'Attach new screen and test display',
      'Seal and secure the new screen'
    ],
    color: 'from-blue-500 to-blue-700',
    difficulty: 'Medium',
    timeEstimate: '45-60 mins',
    warning: 'Handle flex cables with extreme care',
    slug: 'screen-replacement'
  },
  {
    title: 'Charging Port Repair',
    icon: <FaPlug className="w-8 h-8" />,
    steps: [
      'Power off and disassemble device',
      'Locate and desolder old charging port',
      'Solder new port carefully',
      'Reassemble and test charging'
    ],
    color: 'from-yellow-500 to-yellow-700',
    difficulty: 'Hard',
    timeEstimate: '40-50 mins',
    warning: 'Soldering experience required',
    slug: 'charging-port-repair'
  },
  {
    title: 'Speaker Repair',
    icon: <FaVolumeUp className="w-8 h-8" />,
    steps: [
      'Open the device back panel',
      'Remove speaker module',
      'Replace with new speaker',
      'Reassemble and test sound'
    ],
    color: 'from-purple-500 to-purple-700',
    difficulty: 'Medium',
    timeEstimate: '30-40 mins',
    warning: 'Test sound before final assembly',
    slug: 'speaker-repair'
  },
  {
    title: 'Camera Replacement',
    icon: <FaCamera className="w-8 h-8" />,
    steps: [
      'Disassemble and find the camera module',
      'Disconnect the faulty camera',
      'Connect new module',
      'Test camera and reassemble'
    ],
    color: 'from-pink-500 to-pink-700',
    difficulty: 'Medium',
    timeEstimate: '35-45 mins',
    warning: 'Ensure camera module is compatible',
    slug: 'camera-replacement'
  },
  {
    title: 'Motherboard Repair',
    icon: <FaMicrochip className="w-8 h-8" />,
    steps: [
      'Remove back cover and battery',
      'Unplug all connectors',
      'Remove screws and take out motherboard',
      'Replace or repair faulty ICs/components',
      'Reassemble and test'
    ],
    color: 'from-red-500 to-red-700',
    difficulty: 'Expert',
    timeEstimate: '60-120 mins',
    warning: 'Advanced repair skills required',
    slug: 'motherboard-repair'
  },
  {
    title: 'Power Button Repair',
    icon: <FaPowerOff className="w-8 h-8" />,
    steps: [
      'Open the back panel',
      'Locate the power button switch',
      'Replace the flex or button',
      'Test and close the panel'
    ],
    color: 'from-indigo-500 to-indigo-700',
    difficulty: 'Medium',
    timeEstimate: '30-40 mins',
    warning: 'Test button response before sealing',
    slug: 'power-button-repair'
  },
  {
    title: 'Volume Button Repair',
    icon: <FaVolumeDown className="w-8 h-8" />,
    steps: [
      'Disassemble back housing',
      'Locate volume button mechanism',
      'Replace damaged part/flex cable',
      'Reassemble and verify volume function'
    ],
    color: 'from-teal-500 to-teal-700',
    difficulty: 'Medium',
    timeEstimate: '30-40 mins',
    warning: 'Test all volume functions',
    slug: 'volume-button-repair'
  },
  {
    title: 'Back Panel Replacement',
    icon: <FaWindowRestore className="w-8 h-8" />,
    steps: [
      'Heat and remove old back panel',
      'Clean adhesive',
      'Apply new adhesive or glue',
      'Fix and press-fit the new panel'
    ],
    color: 'from-orange-500 to-orange-700',
    difficulty: 'Easy',
    timeEstimate: '20-30 mins',
    warning: 'Ensure proper adhesive application',
    slug: 'back-panel-replacement'
  }
];

export default function RepairGuidePage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            Mobile Repair Guide
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Step-by-step guides for DIY phone repairs. Choose your repair type below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repairGuides.map((guide, index) => (
            <div
              key={index}
              className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${guide.color} text-white`}>
                    {guide.icon}
                  </div>
                  <h2 className="ml-4 text-xl font-semibold text-white">
                    {guide.title}
                  </h2>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-400">
                  <FaClock className="mr-2" />
                  <span>{guide.timeEstimate}</span>
                  <span className="mx-2">•</span>
                  <span>{guide.difficulty}</span>
                </div>

                <div className="space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start text-gray-400">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-gray-600 text-sm mr-3 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>

                {guide.warning && (
                  <div className="mt-4 p-3 bg-yellow-900/30 rounded-lg text-yellow-200 text-sm flex items-start">
                    <span className="mr-2">⚠️</span>
                    {guide.warning}
                  </div>
                )}

                <Link href={`/repair-guide/${guide.slug}`}>
                  <button className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    View Detailed Guide
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}