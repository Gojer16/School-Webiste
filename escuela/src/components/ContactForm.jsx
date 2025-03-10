import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { contactService } from '../services/contactService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => contactService.sendContact(data),
    onSuccess: () => {
      toast.success('¡Mensaje enviado con éxito!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error) => {
      toast.error(error.message || 'Error al enviar el mensaje');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#150261]/20 to-[#C02E28]/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-[#C02E28]/20 to-[#150261]/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">Envíanos un Mensaje</h2>
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
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261] focus:border-transparent transition-all duration-300 hover:border-[#C02E28] bg-[#f0f8ff]/30"
            required
          />
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
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261] focus:border-transparent transition-all duration-300 hover:border-[#C02E28] bg-[#f0f8ff]/30"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Asunto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261] focus:border-transparent transition-all duration-300 hover:border-[#C02E28] bg-[#f0f8ff]/30"
            required
          />
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
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261] focus:border-transparent transition-all duration-300 hover:border-[#C02E28] bg-[#f0f8ff]/30"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="relative overflow-hidden bg-gradient-to-r from-[#150261] to-[#1a0275] text-white px-8 py-3 rounded-full hover:shadow-lg group transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#C02E28] to-[#d83933] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10">
              {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
            </span>
          </button>
        </div>

        {isLoading && (
          <div className="bg-gradient-to-r from-[#150261]/20 to-[#C02E28]/20 p-4 rounded-lg mt-6 text-center animate-fadeIn">
            <p className="text-[#150261] font-medium">¡Mensaje enviado con éxito!</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;