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
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#150261] mb-12 text-center">Nuestros Programas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center">
                  <Icon className="w-12 h-12 text-[#C02E28] mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#150261] text-center">{program.title}</h3>
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