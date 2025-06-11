import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
    <div className="min-h-screen">
      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-[#150261]/5 via-white to-[#C02E28]/5 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">
              Sobre Nuestra Escuela
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              La Escuela Técnica Mariano Fernández Fortiquez es una institución educativa
              comprometida con la excelencia académica y la formación integral de nuestros
              estudiantes. Con años de experiencia en la educación técnica, nos dedicamos
              a preparar a los jóvenes para los desafíos del futuro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#C02E28]">
                <h3 className="text-xl font-semibold mb-4 text-[#150261]">Misión</h3>
                <p className="text-gray-600">
                  Formar técnicos profesionales con excelencia académica y valores éticos,
                  capaces de contribuir al desarrollo tecnológico y social de nuestra comunidad.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#C02E28]">
                <h3 className="text-xl font-semibold mb-4 text-[#150261]">Visión</h3>
                <p className="text-gray-600">
                  Ser una institución líder en la formación técnica, reconocida por la calidad
                  de nuestros egresados y su impacto positivo en la sociedad.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-t-4 border-[#C02E28]">
                <h3 className="text-xl font-semibold mb-4 text-[#150261]">Valores</h3>
                <p className="text-gray-600">
                  Excelencia, innovación, responsabilidad, ética profesional y compromiso
                  con el desarrollo sostenible de nuestra comunidad.
                </p>
              </div>
            </div>
            <p className="text-lg mt-8 text-gray-700 italic mb-4">
              “Más que una institución educativa — somos una comunidad comprometida con el crecimiento personal y profesional de nuestros estudiantes.”
            </p>
          </div>
        </div>
      </section>

    </div>
    </motion.div>
  );
};

export default About;