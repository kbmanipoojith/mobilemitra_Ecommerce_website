'use client';

import { useParams } from 'next/navigation';
import { FaBatteryFull, FaMobile, FaPlug, FaVolumeUp, FaCamera, FaMicrochip, FaPowerOff, FaVolumeDown, FaWindowRestore, FaClock, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface Step {
  title: string;
  content: string;
  tips: string[];
}

interface Guide {
  title: string;
  icon: JSX.Element;
  color: string;
  difficulty: string;
  timeEstimate: string;
  warning: string;
  tools: string[];
  detailedSteps: Step[];
}

type Guides = {
  [key: string]: Guide;
};

const repairGuides: Guides = {
  'battery-replacement': {
    title: 'Battery Replacement',
    icon: <FaBatteryFull className="w-12 h-12" />,
    color: 'from-green-500 to-emerald-700',
    difficulty: 'Easy',
    timeEstimate: '30-45 mins',
    warning: 'Ensure battery is compatible with your model',
    tools: [
      'Phillips screwdriver',
      'Plastic pry tool',
      'Heat gun (optional)',
      'Anti-static wrist strap'
    ],
    detailedSteps: [
      {
        title: 'Preparation',
        content: 'Power off the phone completely. Remove any case or screen protector. Place the phone on a clean, well-lit workspace.',
        tips: ['Work on a soft mat to prevent scratches', 'Keep screws organized']
      },
      {
        title: 'Remove Back Panel',
        content: 'Carefully remove the back panel using appropriate tools. Some phones may require heating to soften the adhesive.',
        tips: ['Apply even pressure', 'Note screw positions']
      },
      {
        title: 'Disconnect Battery',
        content: 'Locate and carefully disconnect the battery connector from the motherboard. Remove any adhesive securing the battery.',
        tips: ['Use plastic tools to prevent damage', 'Do not pull cables directly']
      },
      {
        title: 'Install New Battery',
        content: 'Place the new battery in position. Ensure proper alignment and reconnect the battery connector.',
        tips: ['Check connector orientation', 'Do not force connections']
      },
      {
        title: 'Reassembly',
        content: 'Replace the back panel and all screws. Apply new adhesive if necessary.',
        tips: ['Test before sealing completely', 'Ensure proper alignment']
      }
    ]
  },
  'screen-replacement': {
    title: 'Screen Replacement',
    icon: <FaMobile className="w-12 h-12" />,
    color: 'from-blue-500 to-blue-700',
    difficulty: 'Medium',
    timeEstimate: '45-60 mins',
    warning: 'Handle flex cables with extreme care',
    tools: [
      'Heat gun',
      'Suction cup',
      'Plastic pry tools',
      'Phillips screwdriver',
      'Adhesive strips'
    ],
    detailedSteps: [
      {
        title: 'Preparation',
        content: 'Power off the phone and remove the SIM tray. Remove any case or screen protector.',
        tips: ['Back up your data', 'Work in a dust-free environment']
      },
      {
        title: 'Heat and Remove Screen',
        content: 'Apply heat evenly around the edges to soften the adhesive. Use suction cup to create lifting point.',
        tips: ['Keep heat moving', "Don't exceed 150°F/65°C"]
      },
      {
        title: 'Disconnect Display',
        content: 'Carefully lift screen and locate display connectors. Disconnect using proper technique.',
        tips: ['Take photos for reassembly', 'Label cables if multiple']
      },
      {
        title: 'Install New Screen',
        content: 'Connect new display cables. Test screen before sealing. Apply new adhesive.',
        tips: ['Test touch response', 'Clean surface thoroughly']
      },
      {
        title: 'Final Assembly',
        content: 'Carefully align and press screen into place. Apply pressure evenly around edges.',
        tips: ['Wait 12 hours before heavy use', 'Test in bright light']
      }
    ]
  },
  'charging-port-repair': {
    title: 'Charging Port Repair',
    icon: <FaPlug className="w-12 h-12" />,
    color: 'from-yellow-500 to-yellow-700',
    difficulty: 'Hard',
    timeEstimate: '40-50 mins',
    warning: 'Soldering experience required',
    tools: [
      'Soldering iron',
      'Solder wick',
      'Phillips screwdriver',
      'Tweezers',
      'Multimeter'
    ],
    detailedSteps: [
      {
        title: 'Disassembly',
        content: 'Remove back cover, battery, and any components blocking access to charging port.',
        tips: ['Document screw locations', 'Keep parts organized']
      },
      {
        title: 'Port Removal',
        content: 'Desolder old charging port carefully. Clean area with solder wick.',
        tips: ['Use appropriate temperature', "Don't damage board"]
      },
      {
        title: 'New Port Installation',
        content: 'Position new port and solder each pin carefully. Ensure proper alignment.',
        tips: ['Check for bridges', 'Verify pin alignment']
      },
      {
        title: 'Testing',
        content: 'Test continuity with multimeter. Verify charging functionality.',
        tips: ['Test data transfer', 'Check for shorts']
      }
    ]
  },
  'speaker-repair': {
    title: 'Speaker Repair',
    icon: <FaVolumeUp className="w-12 h-12" />,
    color: 'from-purple-500 to-purple-700',
    difficulty: 'Medium',
    timeEstimate: '30-40 mins',
    warning: 'Test sound before final assembly',
    tools: [
      'Phillips screwdriver',
      'Plastic pry tool',
      'Tweezers',
      'Adhesive strips'
    ],
    detailedSteps: [
      {
        title: 'Access Speaker',
        content: 'Remove back cover and locate speaker module. Note cable routing.',
        tips: ['Mark screw locations', 'Take photos']
      },
      {
        title: 'Remove Speaker',
        content: 'Disconnect speaker cables and remove any adhesive securing the speaker.',
        tips: ['Be gentle with connectors', 'Clean contact points']
      },
      {
        title: 'Install New Speaker',
        content: 'Place new speaker and reconnect cables. Secure with adhesive if needed.',
        tips: ['Verify cable routing', 'Test before sealing']
      },
      {
        title: 'Final Testing',
        content: 'Test various sounds and volumes before final assembly.',
        tips: ['Check for rattling', 'Test call audio']
      }
    ]
  },
  'camera-replacement': {
    title: 'Camera Replacement',
    icon: <FaCamera className="w-12 h-12" />,
    color: 'from-pink-500 to-pink-700',
    difficulty: 'Medium',
    timeEstimate: '35-45 mins',
    warning: 'Ensure camera module is compatible',
    tools: [
      'Phillips screwdriver',
      'Plastic pry tool',
      'Tweezers',
      'Anti-static mat'
    ],
    detailedSteps: [
      {
        title: 'Preparation',
        content: 'Power off device and remove back cover. Locate camera module.',
        tips: ['Work in clean environment', 'Avoid touching lens']
      },
      {
        title: 'Remove Camera',
        content: 'Disconnect camera flex cable and remove any screws securing module.',
        tips: ['Note cable routing', 'Handle flex cable carefully']
      },
      {
        title: 'Install New Camera',
        content: 'Place new camera module and connect flex cable. Secure with screws.',
        tips: ['Clean lens before install', 'Verify proper seating']
      },
      {
        title: 'Testing',
        content: 'Test all camera functions including front and back cameras.',
        tips: ['Check focus', 'Test all modes']
      }
    ]
  },
  'motherboard-repair': {
    title: 'Motherboard Repair',
    icon: <FaMicrochip className="w-12 h-12" />,
    color: 'from-red-500 to-red-700',
    difficulty: 'Expert',
    timeEstimate: '60-120 mins',
    warning: 'Advanced repair skills required',
    tools: [
      'Soldering station',
      'Hot air rework station',
      'Multimeter',
      'Microscope',
      'Various screwdrivers',
      'Anti-static equipment'
    ],
    detailedSteps: [
      {
        title: 'Diagnosis',
        content: 'Identify the specific issue through testing. Document all symptoms.',
        tips: ['Use schematic diagram', 'Check common failure points']
      },
      {
        title: 'Board Removal',
        content: 'Carefully remove motherboard from device. Document all connections.',
        tips: ['Label all cables', 'Note screw locations']
      },
      {
        title: 'Component Repair',
        content: 'Replace or repair faulty components. Use appropriate soldering techniques.',
        tips: ['Use proper temperature', 'Avoid board damage']
      },
      {
        title: 'Testing and Assembly',
        content: 'Test repairs before final assembly. Verify all functions.',
        tips: ['Check power draw', 'Test all features']
      }
    ]
  },
  'power-button-repair': {
    title: 'Power Button Repair',
    icon: <FaPowerOff className="w-12 h-12" />,
    color: 'from-indigo-500 to-indigo-700',
    difficulty: 'Medium',
    timeEstimate: '30-40 mins',
    warning: 'Test button response before sealing',
    tools: [
      'Phillips screwdriver',
      'Plastic pry tools',
      'Tweezers',
      'Replacement button/flex'
    ],
    detailedSteps: [
      {
        title: 'Access Button',
        content: 'Remove back cover and locate power button assembly.',
        tips: ['Note cable routing', 'Mark screw positions']
      },
      {
        title: 'Remove Old Button',
        content: 'Disconnect power button flex cable. Remove button mechanism.',
        tips: ['Check for damage', 'Clean contact area']
      },
      {
        title: 'Install New Button',
        content: 'Place new button/flex and reconnect cables. Secure in place.',
        tips: ['Verify proper seating', 'Check alignment']
      },
      {
        title: 'Testing',
        content: 'Test power button functionality before final assembly.',
        tips: ['Check haptic feedback', 'Verify wake/sleep']
      }
    ]
  },
  'volume-button-repair': {
    title: 'Volume Button Repair',
    icon: <FaVolumeDown className="w-12 h-12" />,
    color: 'from-teal-500 to-teal-700',
    difficulty: 'Medium',
    timeEstimate: '30-40 mins',
    warning: 'Test all volume functions',
    tools: [
      'Phillips screwdriver',
      'Plastic pry tools',
      'Tweezers',
      'Replacement button/flex'
    ],
    detailedSteps: [
      {
        title: 'Access Buttons',
        content: 'Remove necessary covers to access volume button assembly.',
        tips: ['Document disassembly', 'Keep parts organized']
      },
      {
        title: 'Remove Old Buttons',
        content: 'Disconnect volume button flex cable. Remove button mechanism.',
        tips: ['Check for wear', 'Clean contact points']
      },
      {
        title: 'Install New Buttons',
        content: 'Install new volume buttons/flex. Reconnect cables.',
        tips: ['Ensure proper alignment', 'Verify connections']
      },
      {
        title: 'Testing',
        content: 'Test all volume functions including in-call volume.',
        tips: ['Check media volume', 'Test silent switch']
      }
    ]
  },
  'back-panel-replacement': {
    title: 'Back Panel Replacement',
    icon: <FaWindowRestore className="w-12 h-12" />,
    color: 'from-orange-500 to-orange-700',
    difficulty: 'Easy',
    timeEstimate: '20-30 mins',
    warning: 'Ensure proper adhesive application',
    tools: [
      'Heat gun',
      'Suction cup',
      'Plastic pry tools',
      'Adhesive strips',
      'Cleaning solution'
    ],
    detailedSteps: [
      {
        title: 'Remove Old Panel',
        content: 'Apply heat evenly to soften adhesive. Use suction cup to create lift point.',
        tips: ['Keep heat moving', 'Work slowly around edges']
      },
      {
        title: 'Clean Frame',
        content: 'Remove all old adhesive from frame. Clean surface thoroughly.',
        tips: ['Use proper solvent', 'Ensure dry surface']
      },
      {
        title: 'Apply Adhesive',
        content: 'Apply new adhesive strips or liquid adhesive to frame.',
        tips: ['Follow pattern', 'Avoid excess']
      },
      {
        title: 'Install New Panel',
        content: 'Align and apply new back panel. Press firmly around edges.',
        tips: ['Start from bottom', 'Apply even pressure']
      }
    ]
  }
};

export default function DetailedGuidePage() {
  const params = useParams();
  const slug = params.slug as string;
  const guide = repairGuides[slug];

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Guide not found</h1>
          <Link href="/repair-guide" className="text-blue-400 hover:text-blue-300">
            Return to guides
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link href="/repair-guide" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
          <FaArrowLeft className="mr-2" />
          Back to guides
        </Link>

        <div className="bg-[#1E293B] rounded-2xl shadow-xl overflow-hidden">
          <div className={`bg-${guide.color.replace('bg-', '')} p-8 text-white`}>
            <div className="flex items-center">
              <div className="p-4 bg-white/10 rounded-2xl">
                {guide.icon}
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold">{guide.title}</h1>
                <div className="flex items-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{guide.timeEstimate}</span>
                  </div>
                  <div className="flex items-center">
                    <span>•</span>
                    <span className="ml-2">{guide.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {guide.warning && (
              <div className="mb-8 p-4 bg-yellow-900/30 rounded-lg text-yellow-200 flex items-start">
                <span className="mr-2">⚠️</span>
                {guide.warning}
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Required Tools</h2>
              <ul className="grid grid-cols-2 gap-4">
                {guide.tools.map((tool: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              {guide.detailedSteps.map((step: Step, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{step.content}</p>
                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Pro Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      {step.tips.map((tip: string, tipIndex: number) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 