import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xvgrkdkl");

  if (state.succeeded) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-secondary">
          ¡Gracias por tu mensaje!
        </h2>
        <p className="text-gray-600">
          Te contactaremos muy pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-secondary to-[#1a0275] bg-clip-text text-transparent">
        Envíanos un Mensaje
      </h2>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 relative"
        noValidate
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            maxLength="50"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 hover:border-primary bg-[#f0f8ff]/30"
            required
          />
          <ValidationError 
            prefix="Nombre" 
            field="name"
            errors={state.errors}
            className="mt-1 text-sm text-red-600"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 hover:border-primary bg-[#f0f8ff]/30"
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="mt-1 text-sm text-red-600"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Asunto
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 hover:border-primary bg-[#f0f8ff]/30"
            required
          />
          <ValidationError 
            prefix="Asunto" 
            field="subject"
            errors={state.errors}
            className="mt-1 text-sm text-red-600"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 hover:border-primary bg-[#f0f8ff]/30"
            required
          ></textarea>
          <ValidationError 
            prefix="Mensaje" 
            field="message"
            errors={state.errors}
            className="mt-1 text-sm text-red-600"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={state.submitting}
            className="relative overflow-hidden bg-gradient-to-r from-secondary to-[#1a0275] text-white px-8 py-3 rounded-full hover:shadow-lg group transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-[#d83933] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10">
              {state.submitting ? 'Enviando...' : 'Enviar Mensaje'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
