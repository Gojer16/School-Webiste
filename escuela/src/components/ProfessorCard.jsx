import React from 'react';
import { Mail, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfessorCard = ({ professor, onDelete }) => {
  const { isAdmin } = useAuth();
  const defaultImage = '/default-profile.jpg';

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
      <div className="h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#150261] group-hover:border-[#C02E28] transition-colors duration-300">
            <img
              src={professor.photoUrl || defaultImage}
              alt={professor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">
          {professor.name}
        </h3>
        
        <p className="text-gray-600 text-center mb-4">
          {professor.specialty}
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
          <Mail size={18} className="text-[#150261]" />
          <a 
            href={`mailto:${professor.email}`}
            className="hover:text-[#C02E28] transition-colors duration-300"
          >
            {professor.email}
          </a>
        </div>

        {isAdmin && (
          <div className="text-center mt-4">
            <button
              onClick={() => onDelete(professor.id)}
              className="text-[#C02E28] hover:text-red-700 transition-colors duration-300 flex items-center justify-center mx-auto"
            >
              <Trash2 size={18} className="mr-1" />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorCard; 