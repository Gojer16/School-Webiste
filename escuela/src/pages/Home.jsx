import React from 'react';
import { GraduationCap, Users, Phone } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import escuela from '../assets/2.jpg'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#150261] via-[#1a0275] to-[#150261] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('../assets/2.jpg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C02E28] to-[#C02E28]"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl p-8 rounded-lg">
            <h1 className="text-5xl font-bold mb-4 text-white hover:scale-105 transition-all duration-300">
              Escuela Técnica Mariano Fernández Fortiquez
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed border-l-4 border-[#C02E28] pl-4">
              Formando los líderes del mañana con excelencia académica y valores
            </p>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={GraduationCap}
              title="Educación de Calidad"
              description="Programas académicos diseñados para el éxito de nuestros estudiantes"
              linkTo="/programas"
            />
            <FeatureCard
              icon={Users}
              title="Nosotros"
              description="Conoce nuestra historia, misión y visión para el futuro de la educación"
              linkTo="/nosotros"
            />
            <FeatureCard
              icon={Phone}
              title="Contacto"
              description="Estamos aquí para atender tus consultas y brindarte la información que necesitas"
              linkTo="/contacto"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-tr from-[#150261]/5 via-white to-[#C02E28]/5 py-16 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#150261] hover:scale-105 transition-all duration-300">
              Sobre Nuestra Escuela
            </h2>
            <p className="text-gray-600 mb-6 bg-white p-4 rounded-lg border-b-2 border-[#C02E28]">
              Somos una institución educativa comprometida con la excelencia académica
              y la formación integral de nuestros estudiantes. Nuestro objetivo es
              preparar a los jóvenes para los desafíos del futuro.
            </p>
            
            <div className="transform hover:scale-[1.02] transition-all duration-300 p-1 bg-gradient-to-r from-[#150261] to-[#C02E28] rounded-lg">
              <img
                src={escuela}
                alt="Escuela"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-tr from-[#150261]/10 via-white to-[#C02E28]/10 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </section>
    </div>
  );
};

export default Home;