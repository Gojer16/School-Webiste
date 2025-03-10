import React from 'react';

// Functional Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
      <div className="flex justify-center">
        <Icon className="w-12 h-12 text-[#C02E28] mb-4 transform group-hover:scale-110 transition-all duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent group-hover:from-[#1a0275] group-hover:to-[#150261] transition-all duration-300">{title}</h3>
      <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">{description}</p>
    </div>
  );
};

export default FeatureCard;