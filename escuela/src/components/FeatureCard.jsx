import React from 'react';
import { Link } from 'react-router-dom';

// Functional Component
const FeatureCard = ({ icon: Icon, title, description, linkTo }) => {
  return (
    <Link to={linkTo} className="block">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-xl border-t-4 border-t-[#C02E28] transition-all duration-300 hover:scale-105 group cursor-pointer hover:bg-gradient-to-b hover:from-white hover:to-[#f0f8ff]">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#150261]/10 to-[#150261]/20 mb-4 group-hover:from-[#150261]/20 group-hover:to-[#150261]/30 transition-all duration-300">
            <Icon className="w-12 h-12 text-[#C02E28] transform group-hover:scale-110 transition-all duration-300" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-center bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent group-hover:from-[#1a0275] group-hover:to-[#150261] transition-all duration-300">{title}</h3>
        <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">{description}</p>
        <div className="mt-4 text-center">
          <span className="inline-block py-2 px-6 bg-gradient-to-r from-[#150261] to-[#1a0275] text-white text-sm rounded-full transform transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
            Ver más
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;