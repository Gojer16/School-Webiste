import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/1.jpg'


const Footer = () => {
  return (
    <footer className="bg-[#150261] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="w-10 h-10" />
              <h3 className="text-xl font-bold">E.T.M.F.F.</h3>
            </div>
            <p className="text-sm">
              Escuela Técnica Mariano Fernández Fortiquez
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="hover:text-[#C02E28] transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/programas" className="hover:text-[#C02E28] transition-colors">
                  Programas
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-[#C02E28] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="w-10 h-10 text-[#C02E28]" />
                <span>Carretera Nacional Villa de Cura, cruce con calle Sabana Larga, Cagua, Estado Aragua, Venezuela.</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#C02E28]" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#C02E28]" />
                <span>gojer@orlandoascanio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p>© 2025 Escuela Técnica Mariano Fernández Fortiquez. Todos los derechos reservados.</p>
          <p>© 2025 Build with ❤️ by Gojer.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;