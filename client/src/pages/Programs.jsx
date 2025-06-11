import { useState } from 'react';
import { BookOpen, Code, Wrench, Briefcase, Users, Award, Clipboard, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import CourseDetails from '../components/CourseDetails';

const Programs = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);

  const handleProgramClick = (index) => {
    setExpandedProgram(expandedProgram === index ? null : index);
  };

  const programs = [
    {
      icon: BookOpen,
      title: "Educación Básica",
      description: "Formación integral en materias fundamentales con énfasis en desarrollo personal.",
      duration: "3 años",
      curriculum: [
        "Matemáticas Básicas",
        "Lengua y Literatura",
        "Ciencias Naturales",
        "Ciencias Sociales"
      ],
      subjects: [
        "Álgebra",
        "Geometría",
        "Gramática",
        "Biología"
      ],
      requirements: [
        "Certificado de primaria",
        "Documentos de identidad"
      ],
      objectives: [
        "Desarrollar habilidades fundamentales",
        "Fomentar pensamiento crítico"
      ]
    },
    {
      icon: Code,
      title: "Informática",
      description: "Especialización en programación, redes y sistemas computacionales.",
      duration: "2 años",
      curriculum: [
        "Programación Básica",
        "Redes de Computadoras",
        "Bases de Datos",
        "Desarrollo Web"
      ],
      subjects: [
        "Python",
        "JavaScript",
        "SQL",
        "HTML/CSS"
      ],
      requirements: [
        "Conocimientos básicos de computación",
        "Equipo de cómputo personal"
      ],
      objectives: [
        "Formar profesionales en TI",
        "Desarrollar habilidades prácticas"
      ]
    },
    {
      icon: Wrench,
      title: "Electromecánica",
      description: "Formación técnica en sistemas mecánicos y eléctricos.",
      duration: "2.5 años",
      curriculum: [
        "Mecánica Básica",
        "Sistemas Eléctricos",
        "Automatización",
        "Mantenimiento Industrial"
      ],
      subjects: [
        "Electrónica",
        "Hidráulica",
        "Neumática",
        "Control Industrial"
      ],
      requirements: [
        "Educación secundaria completa",
        "Conocimientos básicos de matemáticas y física"
      ],
      objectives: [
        "Formar técnicos especializados",
        "Desarrollar habilidades prácticas en sistemas electromecánicos"
      ]
    },
    {
      icon: Briefcase,
      title: "Pasantías y Prácticas Profesionales",
      description: "Oportunidades para aplicar conocimientos en entornos laborales reales.",
      duration: "3-6 meses",
      curriculum: [
        "Orientación Profesional",
        "Prácticas en Empresas",
        "Seguimiento y Evaluación",
        "Proyecto Final"
      ],
      subjects: [
        "Ética Profesional",
        "Comunicación Empresarial",
        "Gestión de Proyectos",
        "Trabajo en Equipo"
      ],
      requirements: [
        "Ser estudiante regular",
        "Haber completado el 60% de los créditos"
      ],
      objectives: [
        "Proporcionar experiencia laboral práctica",
        "Facilitar la transición al mundo laboral"
      ]
    },
    {
      icon: Users,
      title: "Actividades Extracurriculares",
      description: "Talleres, clubes, deportes y eventos culturales para el desarrollo integral.",
      duration: "Variable",
      curriculum: [
        "Deportes y Recreación",
        "Arte y Cultura",
        "Clubes Académicos",
        "Voluntariado"
      ],
      subjects: [
        "Fútbol y Baloncesto",
        "Teatro y Música",
        "Club de Ciencias",
        "Servicio Comunitario"
      ],
      requirements: [
        "Ser estudiante activo",
        "Mantener buen rendimiento académico"
      ],
      objectives: [
        "Fomentar el desarrollo integral",
        "Promover habilidades sociales y liderazgo"
      ]
    },
    {
      icon: Award,
      title: "Proyectos Especiales",
      description: "Iniciativas como el proyecto Simón Bolívar para mejorar infraestructuras.",
      duration: "1-2 años",
      curriculum: [
        "Planificación de Proyectos",
        "Gestión de Recursos",
        "Implementación",
        "Evaluación de Impacto"
      ],
      subjects: [
        "Gestión de Infraestructura",
        "Sostenibilidad",
        "Innovación Social",
        "Liderazgo Comunitario"
      ],
      requirements: [
        "Presentar propuesta de proyecto",
        "Compromiso con la comunidad educativa"
      ],
      objectives: [
        "Mejorar la infraestructura escolar",
        "Fomentar la participación comunitaria"
      ]
    },
    {
      icon: Clipboard,
      title: "Plan de Estudios",
      description: "Detalles sobre el plan de estudios, duración y contenidos curriculares.",
      duration: "Según programa",
      curriculum: [
        "Estructura Curricular",
        "Metodología de Evaluación",
        "Sistemas de Créditos",
        "Programas de Tutoría"
      ],
      subjects: [
        "Materias Obligatorias",
        "Electivas",
        "Prácticas Profesionales",
        "Proyectos Integradores"
      ],
      requirements: [
        "Varían según el programa",
        "Consultar requisitos específicos"
      ],
      objectives: [
        "Garantizar formación integral",
        "Asegurar calidad educativa"
      ]
    },
    {
      icon: Settings,
      title: "Metodologías de Enseñanza",
      description: "Uso de metodologías como el 'aprendizaje por proyectos' para un aprendizaje significativo.",
      duration: "Continuo",
      curriculum: [
        "Aprendizaje por Proyectos",
        "Metodologías Activas",
        "Evaluación Formativa",
        "Innovación Educativa"
      ],
      subjects: [
        "Diseño de Proyectos",
        "Tecnología Educativa",
        "Evaluación del Aprendizaje",
        "Desarrollo Docente"
      ],
      requirements: [
        "Participación activa",
        "Disposición para innovar"
      ],
      objectives: [
        "Implementar metodologías innovadoras",
        "Mejorar el proceso de enseñanza-aprendizaje"
      ]
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-[#150261]/10 via-white to-[#C02E28]/10 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent mb-12 text-center hover:scale-105 transition-transform duration-300 animate-fadeIn">Nuestros Programas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => handleProgramClick(index)}>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-xl border-t-4 border-t-[#C02E28] transition-all duration-300 hover:scale-105 group hover:bg-gradient-to-b hover:from-white hover:to-[#f0f8ff]">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-gradient-to-br from-[#150261]/10 to-[#150261]/20 mb-4 group-hover:from-[#150261]/20 group-hover:to-[#150261]/30 transition-all duration-300">
                      <Icon className="w-12 h-12 text-[#C02E28] transform group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent group-hover:from-[#1a0275] group-hover:to-[#150261] transition-all duration-300">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">{program.description}</p>
                  <div className="flex justify-center mt-4">
                    {expandedProgram === index ? (
                      <ChevronUp className="w-6 h-6 text-[#C02E28] cursor-pointer" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#C02E28] cursor-pointer" />
                    )}
                  </div>
                </div>
                <CourseDetails isOpen={expandedProgram === index} course={program} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Programs;