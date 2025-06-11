import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import InstagramFeed from '../components/InstagramFeed';
import escuela from '/2.jpg';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      {/* About Section with School Photo */}
      <section className="bg-gradient-to-tr from-secondary/5 via-white to-primary/5 py-16 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-secondary to-[#1a0275] bg-clip-text text-transparent hover:scale-105 transition-all duration-300 animate-fadeIn">
              Sobre Nuestra Escuela
            </h2>
            <p className="text-gray-600 mb-6 bg-white p-4 rounded-lg border-b-2 border-primary animate-fadeIn animation-delay-100">
              Somos una institución educativa comprometida con la excelencia académica
              y la formación integral de nuestros estudiantes. Nuestro objetivo es
              preparar a los jóvenes para los desafíos del futuro.
            </p>
            
            <div className="transform hover:scale-[1.02] transition-all duration-500 p-1 bg-gradient-to-r from-secondary to-primary rounded-lg shadow-lg animate-fadeIn animation-delay-200">
              <img
                src={escuela}
                alt="Escuela"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <InstagramFeed />

      <section className="py-20 bg-gradient-to-tr from-secondary/10 via-white to-primary/10 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-secondary to-[#1a0275] bg-clip-text text-transparent">
            ¿Listo para comenzar tu viaje educativo?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/programas"
              className="inline-block px-8 py-4 bg-gradient-to-r from-secondary to-[#1a0275] text-white font-semibold rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-primary hover:to-red-700  hover:shadow-xl transition-all duration-300"
            >
              Explora Nuestros Programas
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;