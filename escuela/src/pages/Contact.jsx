import React from 'react';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-[#150261]/5 via-white to-[#C02E28]/5 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#150261] mb-12 text-center">Contáctanos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#C02E28]">
              <h2 className="text-2xl font-semibold text-[#150261] mb-6">Información de Contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#150261]/10 p-3 rounded-full mr-4">
                    <MapPin className="text-[#C02E28] w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#150261]">Dirección</h3>
                    <p className="text-gray-600">Carretera Nacional Villa de Cura, cruce con calle Sabana Larga, Cagua, Estado Aragua, Venezuela.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#150261]/10 p-3 rounded-full mr-4">
                    <Phone className="text-[#C02E28] w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#150261]">Teléfono</h3>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#150261]/10 p-3 rounded-full mr-4">
                    <Mail className="text-[#C02E28] w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#150261]">Email</h3>
                    <p className="text-gray-600">gojer@orlandoascanio.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border-t-2 border-[#C02E28]">
                <h3 className="font-medium text-[#150261] mb-2">Horario de Atención</h3>
                <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sábados: 9:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;