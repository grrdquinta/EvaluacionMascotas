import React, { useState } from 'react';
import useFetchPets from '../hook/useFetchPets';
import useSavePet from '../hook/useSavePet';
import useDeletePet from '../hook/useDeletePet';
import Button from '../components/Button';
import Card from '../components/Card/Card';
import Modal from '../components/Modal';
import PetForm from '../components/PetForm';
import './Dashboard.css';

const Dashboard = () => {
    const { pets, loading, error, refetch } = useFetchPets();
    const { savePet, loading: saving } = useSavePet();
    const { deletePet, loading: deleting } = useDeletePet();
    
    const [showForm, setShowForm] = useState(false);
    const [editingPet, setEditingPet] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [petToDelete, setPetToDelete] = useState(null);

    const handleAddPet = () => {
        setEditingPet(null);
        setShowForm(true);
    };

    const handleEditPet = (pet) => {
        setEditingPet(pet);
        setShowForm(true);
    };

    const handleDeleteClick = (pet) => {
        setPetToDelete(pet);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (petToDelete) {
            const success = await deletePet(petToDelete.id);
            if (success) {
                refetch();
            }
            setShowDeleteModal(false);
            setPetToDelete(null);
        }
    };

    const handleFormSubmit = async (petData) => {
        const success = await savePet(petData, editingPet?.id);
        if (success) {
            setShowForm(false);
            setEditingPet(null);
            refetch();
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingPet(null);
    };

    const getSpeciesIcon = (especie) => {
        const icons = {
            'Perro': '🐶',
            'Gato': '🐱',
            'Ave': '🐦',
            'Roedor': '🐭',
            'Reptil': '🦎',
            'Otro': '🐾'
        };
        return icons[especie] || '🐾';
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading-spinner">
                    <p>Cargando mascotas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-container">
                <div className="error-message">
                    <h2>Error al cargar las mascotas</h2>
                    <p>{error}</p>
                    <Button onClick={refetch} variant="primary">
                        Reintentar
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">🐾 Listado de Mascotas</h1>
            
            <div className="dashboard-controls">
                <div className="stats-bar">
                    <span className="stat-item">
                        🏠 Total: <strong>{pets.length}</strong> mascotas registradas
                    </span>
                    <div className="species-count">
                        <span>🐶 Perros: {pets.filter(p => p.especie === 'Perro').length}</span>
                        <span>🐱 Gatos: {pets.filter(p => p.especie === 'Gato').length}</span>
                        <span>🐦 Otros: {pets.filter(p => p.especie !== 'Perro' && p.especie !== 'Gato').length}</span>
                    </div>
                </div>
                
                <div className="actions-bar">
                    <Button onClick={refetch} size="small" variant="secondary">
                        🔄 Actualizar
                    </Button>
                    <Button 
                        onClick={handleAddPet}
                        variant="primary"
                        size="medium"
                    >
                        ➕ Agregar Mascota
                    </Button>
                </div>
            </div>

            <div className="pets-grid">
                {pets.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🐶</div>
                        <h3>No hay mascotas registradas</h3>
                        <p>Comienza agregando tu primera mascota</p>
                        <Button onClick={handleAddPet} variant="primary">
                            Agregar Primera Mascota
                        </Button>
                    </div>
                ) : (
                    pets.map((pet) => (
                        <Card key={pet.id} className="pet-card" padding="medium" shadow="medium">
                            <div className="pet-header">
                                <h3 className="pet-name">{pet.mascota}</h3>
                                <span className={`pet-species ${pet.especie.toLowerCase()}`}>
                                    {getSpeciesIcon(pet.especie)} {pet.especie}
                                </span>
                            </div>
                            
                            <div className="pet-details">
                                <p><strong>Raza:</strong> {pet.raza || 'No especificada'}</p>
                                <p><strong>Edad:</strong> {pet.edad} años</p>
                                <p><strong>Dueño:</strong> {pet.propietario}</p>
                            </div>

                            <div className="pet-actions">
                                <Button
                                    onClick={() => handleEditPet(pet)}
                                    variant="secondary"
                                    size="small"
                                >
                                    Editar
                                </Button>
                                <Button
                                    onClick={() => handleDeleteClick(pet)}
                                    variant="danger"
                                    size="small"
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modal para formulario */}
            <Modal 
                isOpen={showForm} 
                onClose={handleCloseForm}
                title={editingPet ? 'Editar Mascota' : 'Agregar Nueva Mascota'}
            >
                <PetForm
                    pet={editingPet}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseForm}
                    loading={saving}
                />
            </Modal>

            {/* Modal de confirmación para eliminar */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Confirmar Eliminación"
            >
                <div className="delete-confirmation">
                    <p>¿Estás seguro de que deseas eliminar la mascota:</p>
                    <strong>"{petToDelete?.mascota}"</strong>
                    <p>Esta acción no se puede deshacer.</p>
                    
                    <div className="delete-actions">
                        <Button
                            onClick={() => setShowDeleteModal(false)}
                            variant="secondary"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            variant="danger"
                            loading={deleting}
                        >
                            Eliminar
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Dashboard;