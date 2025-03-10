import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ProfessorCard from './ProfessorCard';
import { professorService } from '../services/professorService';

const ProfessorSection = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfessor, setNewProfessor] = useState({
    name: '',
    specialty: '',
    email: '',
    photo: null
  });

  // Fetch professors
  const { data: professors, isLoading } = useQuery({
    queryKey: ['professors'],
    queryFn: professorService.getProfessors
  });

  // Add professor mutation
  const addProfessorMutation = useMutation({
    mutationFn: (data) => professorService.addProfessor(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['professors']);
      toast.success('Profesor agregado exitosamente');
      setIsModalOpen(false);
      setNewProfessor({ name: '', specialty: '', email: '', photo: null });
    },
    onError: (error) => {
      toast.error(error.message || 'Error al agregar profesor');
    }
  });

  // Delete professor mutation
  const deleteProfessorMutation = useMutation({
    mutationFn: (id) => professorService.deleteProfessor(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['professors']);
      toast.success('Profesor eliminado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar profesor');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProfessor.name);
    formData.append('specialty', newProfessor.specialty);
    formData.append('email', newProfessor.email);
    if (newProfessor.photo) {
      formData.append('photo', newProfessor.photo);
    }
    addProfessorMutation.mutate(formData);
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setNewProfessor(prev => ({
        ...prev,
        photo: e.target.files[0]
      }));
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#150261]/5 via-white to-[#C02E28]/5 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#150261] to-[#C02E28]"></div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">
            Nuestros Profesores
          </h2>
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-[#150261] to-[#1a0275] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} className="mr-2" />
              Agregar Profesor
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 text-[#150261] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professors?.map((professor) => (
              <ProfessorCard
                key={professor.id}
                professor={professor}
                onDelete={(id) => {
                  if (window.confirm('¿Estás seguro de eliminar este profesor?')) {
                    deleteProfessorMutation.mutate(id);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Add Professor Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">
                Agregar Nuevo Profesor
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={newProfessor.name}
                    onChange={(e) => setNewProfessor(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidad
                  </label>
                  <input
                    type="text"
                    value={newProfessor.specialty}
                    onChange={(e) => setNewProfessor(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newProfessor.email}
                    onChange={(e) => setNewProfessor(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foto
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#150261]"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={addProfessorMutation.isLoading}
                    className="px-4 py-2 bg-gradient-to-r from-[#150261] to-[#1a0275] text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {addProfessorMutation.isLoading ? 'Agregando...' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfessorSection; 