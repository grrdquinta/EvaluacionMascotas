import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const API_URL = 'https://retoolapi.dev/IO7y9L/mascotas';

const useFetchPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('La respuesta de la API no es válida');
      }

      // Ordenar mascotas por ID descendente
      const sortedPets = data.sort((a, b) => b.id - a.id);
      
      setPets(sortedPets);
    } catch (err) {
      const errorMessage = err.message || 'Error desconocido al cargar las mascotas';
      setError(errorMessage);
      
      toast.error(`Error al cargar mascotas: ${errorMessage}`);
      
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchPets();
  }, [fetchPets]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return {
    pets,
    loading,
    error,
    refetch
  };
};

export default useFetchPets;