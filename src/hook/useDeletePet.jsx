import { useState } from 'react';
import toast from 'react-hot-toast';

const API_URL = 'https://retoolapi.dev/IO7y9L/mascotas';

const useDeletePet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePet = async (petId) => {
    try {
      setLoading(true);
      setError(null);

      if (!petId) {
        throw new Error('ID de mascota no válido');
      }

      const response = await fetch(`${API_URL}/${petId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      toast.success('Mascota eliminada exitosamente');
      
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Error desconocido al eliminar la mascota';
      setError(errorMessage);
      
      toast.error(`Error al eliminar: ${errorMessage}`);
      
      console.error('Error deleting pet:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deletePet,
    loading,
    error
  };
};

export default useDeletePet;