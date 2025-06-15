import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from '../components/Button';
import './PetForm.css';

const PetForm = ({ pet, onSubmit, onCancel, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      mascota: '',
      especie: 'Perro',
      raza: '',
      edad: '',
      propietario: ''
    }
  });

  // Efecto para llenar el formulario cuando se edita una mascota
  useEffect(() => {
    if (pet) {
      setValue('mascota', pet.mascota || '');
      setValue('especie', pet.especie || 'Perro');
      setValue('raza', pet.raza || '');
      setValue('edad', pet.edad || '');
      setValue('propietario', pet.propietario || '');
    } else {
      // Resetear formulario para nueva mascota
      reset({
        mascota: '',
        especie: 'Perro',
        raza: '',
        edad: '',
        propietario: ''
      });
    }
  }, [pet, setValue, reset]);

  const especies = [
    'Perro',
    'Gato',
    'Ave',
    'Roedor',
    'Reptil',
    'Otro'
  ];

  const onFormSubmit = (data) => {
    // Convertir datos a los tipos correctos
    const petData = {
      ...data,
      edad: parseInt(data.edad) || 0
    };
    onSubmit(petData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="pet-form">
      <div className="form-group">
        <label htmlFor="mascota" className="form-label">
          🐾 Nombre de la Mascota *
        </label>
        <input
          id="mascota"
          type="text"
          className={`form-input ${errors.mascota ? 'error' : ''}`}
          placeholder="Ej: Max"
          {...register('mascota', {
            required: 'El nombre de la mascota es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres'
            },
            maxLength: {
              value: 50,
              message: 'El nombre no puede exceder 50 caracteres'
            }
          })}
        />
        {errors.mascota && (
          <span className="form-error">{errors.mascota.message}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="especie" className="form-label">
            🐶 Especie *
          </label>
          <select
            id="especie"
            className={`form-select ${errors.especie ? 'error' : ''}`}
            {...register('especie', {
              required: 'La especie es obligatoria'
            })}
          >
            {especies.map((especie) => (
              <option key={especie} value={especie}>
                {especie}
              </option>
            ))}
          </select>
          {errors.especie && (
            <span className="form-error">{errors.especie.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="edad" className="form-label">
            🎂 Edad *
          </label>
          <input
            id="edad"
            type="number"
            className={`form-input ${errors.edad ? 'error' : ''}`}
            placeholder="0"
            {...register('edad', {
              required: 'La edad es obligatoria',
              min: {
                value: 0,
                message: 'La edad no puede ser negativa'
              },
              max: {
                value: 30,
                message: 'La edad no puede ser mayor a 30 años'
              },
              valueAsNumber: true
            })}
          />
          {errors.edad && (
            <span className="form-error">{errors.edad.message}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="raza" className="form-label">
          🏷️ Raza
        </label>
        <input
          id="raza"
          type="text"
          className={`form-input ${errors.raza ? 'error' : ''}`}
          placeholder="Ej: Labrador"
          {...register('raza', {
            required: 'La raza es obligatoria',
            maxLength: {
              value: 50,
              message: 'La raza no puede exceder 50 caracteres'
            }
          })}
        />
        {errors.raza && (
          <span className="form-error">{errors.raza.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="propietario" className="form-label">
          👤 Nombre del Dueño *
        </label>
        <input
          id="propietario"
          type="text"
          className={`form-input ${errors.propietario ? 'error' : ''}`}
          placeholder="Ej: Juan Pérez"
          {...register('propietario', {
            required: 'El nombre del dueño es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres'
            },
            maxLength: {
              value: 50,
              message: 'El nombre no puede exceder 50 caracteres'
            }
          })}
        />
        {errors.propietario && (
          <span className="form-error">{errors.propietario.message}</span>
        )}
      </div>

      <div className="form-actions">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {pet ? 'Actualizar Mascota' : 'Guardar Mascota'}
        </Button>
      </div>
    </form>
  );
};

export default PetForm;