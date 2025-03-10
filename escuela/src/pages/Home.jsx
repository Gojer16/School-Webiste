import React from 'react';
import { GraduationCap, Users, Phone } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import escuela from '../assets/2.jpg'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#150261] via-[#1a0275] to-[#150261] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Escuela Técnica Mariano Fernández Fortiquez
            </h1>
            <p className="text-xl text-gray-200">
              Formando los líderes del mañana con excelencia académica y valores
            </p>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={GraduationCap}
              title="Educación de Calidad"
              description="Programas académicos diseñados para el éxito de nuestros estudiantes"
            />
            <FeatureCard
              icon={Users}
              title="Nosotros"
              description="Conoce nuestra historia, misión y visión para el futuro de la educación"
            />
            <FeatureCard
              icon={Phone}
              title="Contacto"
              description="Estamos aquí para atender tus consultas y brindarte la información que necesitas"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#150261]">Sobre Nuestra Escuela</h2>
            <p className="text-gray-600 mb-6">
              Somos una institución educativa comprometida con la excelencia académica
              y la formación integral de nuestros estudiantes. Nuestro objetivo es
              preparar a los jóvenes para los desafíos del futuro.
            </p>
            
            <img
              src={escuela}
              alt="Escuela"
              className="w-full rounded-lg shadow-lg"
            />
            
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-tr from-gray-50 via-white to-gray-100 py-16 relative overflow-hidden">
        {/* Additional content for the new section */}
      </section>
    </div>
  );
};

export default Home;