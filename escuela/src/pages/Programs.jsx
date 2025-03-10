import React from 'react';
import { BookOpen, Code, Wrench, Briefcase, Users, Award, Clipboard, Settings } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: BookOpen,
      title: "Educación Básica",
      description: "Formación integral en materias fundamentales con énfasis en desarrollo personal."
    },
    {
      icon: Code,
      title: "Informática",
      description: "Especialización en programación, redes y sistemas computacionales."
    },
    {
      icon: Wrench, // Cambiado de Tool a Wrench
      title: "Electromecánica",
      description: "Formación técnica en sistemas mecánicos y eléctricos."
    },
    {
      icon: Briefcase,
      title: "Pasantías y Prácticas Profesionales",
      description: "Oportunidades para aplicar conocimientos en entornos laborales reales."
    },
    {
      icon: Users,
      title: "Actividades Extracurriculares",
      description: "Talleres, clubes, deportes y eventos culturales para el desarrollo integral."
    },
    {
      icon: Award,
      title: "Proyectos Especiales",
      description: "Iniciativas como el proyecto Simón Bolívar para mejorar infraestructuras."
    },
    {
      icon: Clipboard,
      title: "Plan de Estudios",
      description: "Detalles sobre el plan de estudios, duración y contenidos curriculares."
    },
    {
      icon: Settings,
      title: "Metodologías de Enseñanza",
      description: "Uso de metodologías como el 'aprendizaje por proyectos' para un aprendizaje significativo."
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-[#150261]/10 via-white to-[#C02E28]/10 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#150261] mb-12 text-center hover:scale-105 transition-transform duration-300 bg-white py-3 rounded-lg border-l-4 border-[#C02E28]">Nuestros Programas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div key={index} 
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md border-t-4 border-t-[#C02E28] transition-all duration-300 hover:scale-105 group">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-[#150261]/10 mb-4">
                    <Icon className="w-12 h-12 text-[#C02E28] transform group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-[#150261] group-hover:text-[#C02E28] transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-center">{program.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Programs;