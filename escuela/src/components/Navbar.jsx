import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/1.jpg'


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#150261] via-[#1a0275] to-[#150261] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full transform group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold text-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-gray-200 group-hover:to-white transition-all duration-300">E.T.M.F.F.</span>
          </Link>

          {/* PC Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/nosotros" className="hover:text-[#C02E28] transform hover:scale-105 transition-all duration-300">Nosotros</Link>
            <Link to="/programas" className="hover:text-[#C02E28] transform hover:scale-105 transition-all duration-300">Programas</Link>
            <Link to="/contacto" className="hover:text-[#C02E28] transform hover:scale-105 transition-all duration-300">Contacto</Link>
          </div>

          {/* Telf Menu Boton */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#C02E28] hover:to-[#d83933] transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Telf Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/nosotros"
              className="block py-2 hover:text-[#C02E28] hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              to="/programas"
              className="block py-2 hover:text-[#C02E28] hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Programas
            </Link>
            <Link
              to="/contacto"
              className="block py-2 hover:text-[#C02E28] hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;