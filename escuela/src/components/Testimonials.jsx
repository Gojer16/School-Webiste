import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Madre de Familia",
    content: "La educación que recibe mi hijo en esta escuela es excepcional. Los profesores están verdaderamente comprometidos con el éxito de cada estudiante.",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Ex Alumno",
    content: "Gracias a la formación técnica que recibí, pude comenzar mi carrera profesional con una base sólida. Los conocimientos adquiridos son invaluables.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Estudiante Actual",
    content: "Me encanta el ambiente de aprendizaje y las oportunidades que nos brindan para desarrollar nuestras habilidades técnicas y personales.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#150261]/5 via-white to-[#C02E28]/5 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">
          Lo que dicen nuestros estudiantes y familias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#C02E28]"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-[#150261]">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 