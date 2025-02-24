import React from 'react';

const About = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#150261] mb-8">Nosotros</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#150261] mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 mb-6">
              La Escuela Técnica Mariano Fernández Fortique fue fundada el 20 de septiembre de 1962. Inicialmente conocida como la Escuela de Oficios de Cagua, la institución se trasladó en 1966 a su ubicación actual en la Carretera Nacional Villa de Cura, cruce con calle Sabana Larga. A lo largo de los años, hemos evolucionado para ofrecer una educación técnica de calidad, adaptándonos a las necesidades cambiantes de la sociedad.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#150261] mb-4">Misión y Visión</h2>
            <p className="text-gray-600 mb-6">
              Nuestra misión es formar profesionales técnicos competentes, éticos y comprometidos con el desarrollo de la sociedad. Visualizamos un futuro donde nuestros graduados sean líderes en sus campos respectivos, contribuyendo al progreso de nuestra comunidad y del país.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#150261] mb-4">Valores y Principios</h2>
            <p className="text-gray-600 mb-6">
              En nuestra institución, nos guiamos por valores como el respeto, la responsabilidad, la solidaridad y la excelencia académica. Creemos en la formación integral de nuestros estudiantes, no solo en el ámbito académico, sino también en el personal y social.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#150261] mb-4">Infraestructura y Recursos</h2>
            <p className="text-gray-600 mb-6">
              Contamos con instalaciones modernas y equipadas, incluyendo laboratorios, talleres y aulas especializadas que facilitan el aprendizaje práctico y teórico. Nuestros recursos están diseñados para apoyar el desarrollo de habilidades técnicas y profesionales.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-2xl font-semibold text-[#150261] mb-4">Comunidad Educativa</h2>
            <p className="text-gray-600 mb-6">
              Nuestra comunidad educativa está compuesta por un equipo de docentes altamente calificados, personal administrativo comprometido y estudiantes motivados. Trabajamos juntos para crear un ambiente de aprendizaje colaborativo y enriquecedor.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#150261] mb-4">Logros y Reconocimientos</h2>
            <p className="text-gray-600 mb-6">
              A lo largo de los años, hemos recibido numerosos reconocimientos por nuestra excelencia académica y contribución a la educación técnica. Nuestros estudiantes han destacado en competencias nacionales e internacionales, reflejando la calidad de nuestra formación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;