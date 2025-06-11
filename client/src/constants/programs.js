import {
  BookOpen,
  Code,
  Wrench,
  Briefcase,
  Users,
  Award,
  Clipboard,
  Settings,
} from 'lucide-react';

export const PROGRAMS = [
  {
    icon: BookOpen,
    title: "Educación Básica",
    description:
      "Formación integral en materias fundamentales con énfasis en desarrollo personal.",
    duration: "3 años",
    curriculum: [
      "Matemáticas Básicas",
      "Lengua y Literatura",
      "Ciencias Naturales",
      "Ciencias Sociales",
    ],
    subjects: ["Álgebra", "Geometría", "Gramática", "Biología"],
    requirements: ["Certificado de primaria", "Documentos de identidad"],
    objectives: [
      "Desarrollar habilidades fundamentales",
      "Fomentar pensamiento crítico",
    ],
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
      "Desarrollo Web",
    ],
    subjects: ["Python", "JavaScript", "SQL", "HTML/CSS"],
    requirements: [
      "Conocimientos básicos de computación",
      "Equipo de cómputo personal",
    ],
    objectives: [
      "Formar profesionales en TI",
      "Desarrollar habilidades prácticas",
    ],
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
      "Mantenimiento Industrial",
    ],
    subjects: ["Electrónica", "Hidráulica", "Neumática", "Control Industrial"],
    requirements: [
      "Educación secundaria completa",
      "Conocimientos básicos de matemáticas y física",
    ],
    objectives: [
      "Formar técnicos especializados",
      "Desarrollar habilidades prácticas en sistemas electromecánicos",
    ],
  },
  {
    icon: Briefcase,
    title: "Pasantías y Prácticas Profesionales",
    description:
      "Oportunidades para aplicar conocimientos en entornos laborales reales.",
    duration: "3-6 meses",
    curriculum: [
      "Orientación Profesional",
      "Prácticas en Empresas",
      "Seguimiento y Evaluación",
      "Proyecto Final",
    ],
    subjects: [
      "Ética Profesional",
      "Comunicación Empresarial",
      "Gestión de Proyectos",
      "Trabajo en Equipo",
    ],
    requirements: [
      "Ser estudiante regular",
      "Haber completado el 60% de los créditos",
    ],
    objectives: [
      "Proporcionar experiencia laboral práctica",
      "Facilitar la transición al mundo laboral",
    ],
  },
  {
    icon: Users,
    title: "Actividades Extracurriculares",
    description:
      "Talleres, clubes, deportes y eventos culturales para el desarrollo integral.",
    duration: "Variable",
    curriculum: [
      "Deportes y Recreación",
      "Arte y Cultura",
      "Clubes Académicos",
      "Voluntariado",
    ],
    subjects: [
      "Fútbol y Baloncesto",
      "Teatro y Música",
      "Club de Ciencias",
      "Servicio Comunitario",
    ],
    requirements: [
      "Ser estudiante activo",
      "Mantener buen rendimiento académico",
    ],
    objectives: [
      "Fomentar el desarrollo integral",
      "Promover habilidades sociales y liderazgo",
    ],
  },
  {
    icon: Award,
    title: "Proyectos Especiales",
    description:
      "Iniciativas como el proyecto Simón Bolívar para mejorar infraestructuras.",
    duration: "1-2 años",
    curriculum: [
      "Planificación de Proyectos",
      "Gestión de Recursos",
      "Implementación",
      "Evaluación de Impacto",
    ],
    subjects: [
      "Gestión de Infraestructura",
      "Sostenibilidad",
      "Innovación Social",
      "Liderazgo Comunitario",
    ],
    requirements: [
      "Presentar propuesta de proyecto",
      "Compromiso con la comunidad educativa",
    ],
    objectives: [
      "Mejorar la infraestructura escolar",
      "Fomentar la participación comunitaria",
    ],
  },
  {
    icon: Clipboard,
    title: "Plan de Estudios",
    description:
      "Detalles sobre el plan de estudios, duración y contenidos curriculares.",
    duration: "Según programa",
    curriculum: [
      "Estructura Curricular",
      "Metodología de Evaluación",
      "Sistemas de Créditos",
      "Programas de Tutoría",
    ],
    subjects: [
      "Materias Obligatorias",
      "Electivas",
      "Prácticas Profesionales",
      "Proyectos Integradores",
    ],
    requirements: [
      "Varían según el programa",
      "Consultar requisitos específicos",
    ],
    objectives: [
      "Garantizar formación integral",
      "Asegurar calidad educativa",
    ],
  },
  {
    icon: Settings,
    title: "Metodologías de Enseñanza",
    description:
      "Uso de metodologías como el 'aprendizaje por proyectos' para un aprendizaje significativo.",
    duration: "Continuo",
    curriculum: [
      "Aprendizaje por Proyectos",
      "Metodologías Activas",
      "Evaluación Formativa",
      "Innovación Educativa",
    ],
    subjects: [
      "Diseño de Proyectos",
      "Tecnología Educativa",
      "Evaluación del Aprendizaje",
      "Desarrollo Docente",
    ],
    requirements: ["Participación activa", "Disposición para innovar"],
    objectives: [
      "Implementar metodologías innovadoras",
      "Mejorar el proceso de enseñanza-aprendizaje",
    ],
  },
];