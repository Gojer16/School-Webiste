import React from 'react';
import { Calendar, Award, Users, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-[#150261] hover:scale-105 transition-all duration-300">Nosotros</h1>
          
          <div className="mb-12 bg-white p-8 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-[#150261]">Nuestra Historia</h2>
            <p className="text-gray-600 mb-4">
              La Escuela Técnica Mariano Fernández Fortique fue fundada el 20 de septiembre de 1962. Inicialmente conocida como la Escuela de Oficios de Cagua, la institución se trasladó en 1966 a su ubicación actual en la Carretera Nacional Villa de Cura, cruce con calle Sabana Larga. A lo largo de los años, hemos evolucionado para ofrecer una educación técnica de calidad, adaptándonos a las necesidades cambiantes de la sociedad.
            </p>
            <div className="mt-6 flex items-center text-[#C02E28]">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-gray-700">Desde 1962</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-[1.02] group">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#150261]">
                <Award className="w-6 h-6 mr-2 text-[#C02E28]" /> 
                Misión
              </h2>
              <p className="text-gray-600">
                Nuestra misión es formar profesionales técnicos competentes, éticos y comprometidos con el desarrollo de la sociedad. Buscamos proporcionar una educación integral que combine conocimientos técnicos con valores humanos, preparando a nuestros estudiantes para enfrentar los desafíos del mundo laboral y contribuir al progreso de la comunidad.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-[1.02] group">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#150261]">
                <Users className="w-6 h-6 mr-2 text-[#C02E28]" /> 
                Visión
              </h2>
              <p className="text-gray-600">
                Visualizamos un futuro donde nuestros graduados sean líderes en sus campos respectivos, contribuyendo al progreso de nuestra comunidad y del país. Aspiramos a ser reconocidos como una institución de referencia en la formación técnica, destacando por la calidad de nuestros egresados y su impacto positivo en la sociedad.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#150261]">Valores y Principios</h2>
            <p className="text-gray-600 mb-6 text-center">
              En nuestra institución, nos guiamos por valores como el respeto, la responsabilidad, la solidaridad y la excelencia académica. Creemos en la formación integral de nuestros estudiantes, no solo en el ámbito académico, sino también en el personal y social.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start group">
                <div className="mr-4 bg-[#150261]/10 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-[#150261]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#150261]">Excelencia Académica</h3>
                  <p className="text-gray-600">Compromiso con los más altos estándares educativos.</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="mr-4 bg-[#150261]/10 p-3 rounded-full">
                  <Award className="w-6 h-6 text-[#C02E28]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[#150261]">Integridad</h3>
                  <p className="text-gray-600">Actuamos con honestidad, transparencia y ética en todo momento.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-[1.02] group">
              <h2 className="text-2xl font-bold mb-4 text-[#150261]">Infraestructura y Recursos</h2>
              <p className="text-gray-600 mb-6">
                Contamos con instalaciones modernas y equipadas, incluyendo laboratorios, talleres y aulas especializadas que facilitan el aprendizaje práctico y teórico. Nuestros recursos están diseñados para apoyar el desarrollo de habilidades técnicas y profesionales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-[1.02] group">
              <h2 className="text-2xl font-bold mb-4 text-[#150261]">Comunidad Educativa</h2>
              <p className="text-gray-600 mb-6">
                Nuestra comunidad educativa está compuesta por un equipo de docentes altamente calificados, personal administrativo comprometido y estudiantes motivados. Trabajamos juntos para crear un ambiente de aprendizaje colaborativo y enriquecedor.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-8 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-[#150261]">Logros y Reconocimientos</h2>
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