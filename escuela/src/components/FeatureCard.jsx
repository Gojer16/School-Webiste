import React from 'react';
import { Link } from 'react-router-dom';

// Functional Component
const FeatureCard = ({ icon: Icon, title, description, linkTo }) => {
  return (
    <Link to={linkTo} className="block">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md border-t-4 border-t-[#C02E28] transition-all duration-300 hover:scale-105 group cursor-pointer">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-[#150261]/10 mb-4">
            <Icon className="w-12 h-12 text-[#C02E28] transform group-hover:scale-110 transition-all duration-300" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center text-[#150261] group-hover:text-[#C02E28] transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
        <div className="mt-4 text-center">
          <span className="inline-block py-1 px-4 bg-[#150261]/5 text-[#150261] text-sm rounded-full group-hover:bg-[#C02E28]/10 group-hover:text-[#C02E28] transition-all duration-300">
            Ver más
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;