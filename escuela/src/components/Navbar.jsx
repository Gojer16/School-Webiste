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
    <nav className="bg-gradient-to-r from-[#150261] via-[#1a0275] to-[#150261] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo y Nombre */}
            <img src={logo} alt="Logo"className="w-8 h-8" />
            <span className="font-semibold text-lg">E.T.M.F.F.</span>
          </Link>

          {/* PC Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/nosotros" className="hover:text-[#C02E28] transition-colors">Nosotros</Link>
            <Link to="/programas" className="hover:text-[#C02E28] transition-colors">Programas</Link>
            <Link to="/contacto" className="hover:text-[#C02E28] transition-colors">Contacto</Link>
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
              className="block py-2 hover:text-[#C02E28] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              to="/programas"
              className="block py-2 hover:text-[#C02E28] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Programas
            </Link>
            <Link
              to="/contacto"
              className="block py-2 hover:text-[#C02E28] transition-colors"
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