import { useState } from 'react';
import toast from 'react-hot-toast';

const API_URL = 'https://retoolapi.dev/IO7y9L/mascotas';

const useSavePet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const savePet = async (petData, petId = null) => {
    try {
      setLoading(true);
      setError(null);

      // Validar datos antes de enviar
      if (!petData.mascota || petData.mascota.trim() === '') {
        throw new Error('El nombre de la mascota es obligatorio');
      }

      if (!petData.especie || petData.especie.trim() === '') {
        throw new Error('La especie es obligatoria');
      }

      if (!petData.edad || isNaN(petData.edad) || petData.edad < 0) {
        throw new Error('La edad debe ser un número válido');
      }

      if (!petData.propietario || petData.propietario.trim() === '') {
        throw new Error('El nombre del propietario es obligatorio');
      }

      // Preparar datos para envío
      const dataToSend = {
        mascota: petData.mascota.trim(),
        especie: petData.especie,
        raza: petData.raza || '', // Raza es opcional
        edad: parseInt(petData.edad),
        propietario: petData.propietario.trim()
      };

      let response;
      let successMessage;

      if (petId) {
        // Actualizar mascota existente (PUT)
        response = await fetch(`${API_URL}/${petId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });
        successMessage = 'Mascota actualizada exitosamente';
      } else {
        // Crear nueva mascota (POST)
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });
        successMessage = 'Mascota agregada exitosamente';
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      
      toast.success(successMessage);
      
      return result; // Devolvemos la mascota creada/actualizada
    } catch (err) {
      const errorMessage = err.message || 'Error desconocido al guardar la mascota';
      setError(errorMessage);
      
      toast.error(`Error: ${errorMessage}`);
      
      console.error('Error saving pet:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    savePet,
    loading,
    error
  };
};

export default useSavePet;