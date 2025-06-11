import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/1.jpg';
import { NAV_LINKS } from '../constants/navigation';
import { motion, AnimatePresence } from 'framer-motion';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const renderLinks = (isMobile = false) => (
    NAV_LINKS.map(({ label, to }) => (
      <Link
        key={to}
        to={to}
        onClick={() => isMobile && setIsMenuOpen(false)}
        className={`
          ${isMobile ? 'block py-2' : ''}
          hover:text-primary 
          transition-all duration-300 
          ${isMobile ? 'hover:translate-x-2' : 'transform hover:scale-105'}
          ${location.pathname === to ? 'text-primary border-b-2 border-primary pb-1' : ''}
        `}
      >
        {label}
      </Link>
    ))
  );
  useEffect(() => {
  const handleEsc = (e) => e.key === 'Escape' && setIsMenuOpen(false);
  document.addEventListener('keydown', handleEsc);
  return () => document.removeEventListener('keydown', handleEsc);
}, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-secondary via-[#1a0275] to-secondary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Logo"
              className="w-8 h-8 rounded-full transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-semibold text-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-gray-200 group-hover:to-white transition-all duration-300">
              E.T.M.F.F.
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {renderLinks()}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-[#d83933] transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>



        {/* Mobile Menu */}
        {isMenuOpen && (
      <AnimatePresence>
        <motion.div
        key="mobile-menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="md:hidden py-4 space-y-4"
        >
        {renderLinks(true)}
        </motion.div>
      </AnimatePresence>
)}
      </div>
    </nav>
  );
};

export default Navbar;
