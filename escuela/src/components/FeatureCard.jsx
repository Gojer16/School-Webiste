import React from 'react';

// Functional Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-105 group">
      <div className="flex justify-center">
        <Icon className="w-12 h-12 text-[#C02E28] mb-4 transform group-hover:scale-110 transition-all duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center text-[#150261]">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;