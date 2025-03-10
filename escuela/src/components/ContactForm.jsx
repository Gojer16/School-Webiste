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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:ring-[#150261] focus:border-[#150261]`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:ring-[#150261] focus:border-[#150261]`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:ring-[#150261] focus:border-[#150261]`}
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-[#150261] to-[#1a0275] text-white px-6 py-2 rounded-md hover:from-[#C02E28] hover:to-[#d83933] transition-all duration-300 transform hover:scale-[1.02]"
      >
        Enviar Mensaje
      </button>
      {isSubmitted && (
        <p className="text-green-600 mt-4">¡Mensaje enviado con éxito!</p>
      )}
    </form>
  );
};

export default ContactForm;