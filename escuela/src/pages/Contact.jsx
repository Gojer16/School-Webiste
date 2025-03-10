import React from 'react';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-[#150261]/10 via-white to-[#C02E28]/10 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent mb-12 text-center animate-fadeIn">Contáctanos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-slideInLeft">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#C02E28] hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent mb-6">Información de Contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-start group">
                  <div className="bg-gradient-to-br from-[#150261]/10 to-[#150261]/20 p-3 rounded-full mr-4 group-hover:from-[#150261]/20 group-hover:to-[#150261]/30 transition-all duration-300">
                    <MapPin className="text-[#C02E28] w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">Dirección</h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Carretera Nacional Villa de Cura, cruce con calle Sabana Larga, Cagua, Estado Aragua, Venezuela.</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-gradient-to-br from-[#150261]/10 to-[#150261]/20 p-3 rounded-full mr-4 group-hover:from-[#150261]/20 group-hover:to-[#150261]/30 transition-all duration-300">
                    <Phone className="text-[#C02E28] w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">Teléfono</h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-gradient-to-br from-[#150261]/10 to-[#150261]/20 p-3 rounded-full mr-4 group-hover:from-[#150261]/20 group-hover:to-[#150261]/30 transition-all duration-300">
                    <Mail className="text-[#C02E28] w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">Email</h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">gojer@orlandoascanio.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-[#f0f8ff] to-white rounded-lg border-t-2 border-[#C02E28]">
                <h3 className="font-medium bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent mb-2">Horario de Atención</h3>
                <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sábados: 9:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="animate-slideInRight">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;