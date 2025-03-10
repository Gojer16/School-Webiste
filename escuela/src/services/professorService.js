import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const professorService = {
  getProfessors: async () => {
    try {
      const response = await axios.get(`${API_URL}/professors`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener profesores');
    }
  },

  addProfessor: async (professorData) => {
    try {
      const response = await axios.post(`${API_URL}/professors`, professorData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al agregar profesor');
    }
  },

  updateProfessor: async (id, professorData) => {
    try {
      const response = await axios.put(`${API_URL}/professors/${id}`, professorData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar profesor');
    }
  },

  deleteProfessor: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/professors/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar profesor');
    }
  },
}; 