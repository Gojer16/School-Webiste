import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

// Functional Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Render the icon */}
      <Icon className="w-12 h-12 text-[#C02E28] mb-4" />

      {/* Render the title */}
      <h3 className="text-xl font-semibold mb-2 text-[#150261]">{title}</h3>

      {/* Render the description */}
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;