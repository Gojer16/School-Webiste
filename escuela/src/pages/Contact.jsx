import React from 'react';
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#150261] mb-12 text-center">Contacto</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;