import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const contactService = {
  sendContact: async (contactData) => {
    try {
      const response = await axios.post(`${API_URL}/contact`, contactData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al enviar el mensaje');
    }
  }
}; 