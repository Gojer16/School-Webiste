import React, { useState } from 'react';

const validateForm = (formData) => {
  const errors = {};
  if (!formData.name.trim()) errors.name = 'El nombre es requerido';
  if (!formData.email.trim()) errors.email = 'El correo electrónico es requerido';
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Correo electrónico no válido';
  if (!formData.message.trim()) errors.message = 'El mensaje es requerido';
  return errors;
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      // Simular envío del formulario
      console.log('Formulario enviado:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#150261]/10 to-[#C02E28]/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#C02E28]/10 to-[#150261]/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#150261] via-[#1a0275] to-[#150261] bg-clip-text text-transparent">Contáctanos</h2>
      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261] focus:border-transparent transition-all duration-300"
            required
          />
          {errors.name && <p className="text-[#C02E28] text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261] focus:border-transparent transition-all duration-300"
            required
          />
          {errors.email && <p className="text-[#C02E28] text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261] focus:border-transparent transition-all duration-300"
            required
          ></textarea>
          {errors.message && <p className="text-[#C02E28] text-sm mt-1">{errors.message}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="relative overflow-hidden bg-gradient-to-r from-[#150261] to-[#1a0275] text-white px-8 py-3 rounded-md hover:shadow-lg group transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#C02E28] to-[#d83933] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10">Enviar Mensaje</span>
          </button>
        </div>
      </form>
      {isSubmitted && (
        <p className="text-green-600 mt-4">¡Mensaje enviado con éxito!</p>
      )}
    </div>
  );
};

export default ContactForm;