import React from 'react';
import { GraduationCap, Users, Phone } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white via-[#f0f8ff] to-white relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fadeIn animation-delay-100">
            <FeatureCard
              icon={GraduationCap}
              title="Educación de Calidad"
              description="Programas académicos diseñados para el éxito de nuestros estudiantes"
              linkTo="/programas"
            />
          </div>
          <div className="animate-fadeIn animation-delay-200">
            <FeatureCard
              icon={Users}
              title="Nosotros"
              description="Conoce nuestra historia, misión y visión para el futuro de la educación"
              linkTo="/nosotros"
            />
          </div>
          <div className="animate-fadeIn animation-delay-300">
            <FeatureCard
              icon={Phone}
              title="Contacto"
              description="Estamos aquí para atender tus consultas y brindarte la información que necesitas"
              linkTo="/contacto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 