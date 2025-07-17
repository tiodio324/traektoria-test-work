import { useState, useEffect } from 'react';
import { useVehicles } from '../hooks/useVehicles';
import { VehicleItem } from './VehicleItem';
import { EditVehicleModal } from './EditVehicleModal';
import { SortControls } from './SortControls';
import type { Vehicle } from '../types/vehicle';

export const VehicleList = () => {
  const { vehicles, loading, error, fetchVehicles, updateVehicle, deleteVehicle } = useVehicles();
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingVehicle(null);
    setIsModalOpen(false);
  };

  const handleSave = async (data: Parameters<typeof updateVehicle>[1]) => {
    if (editingVehicle) {
      await updateVehicle(editingVehicle.id, data);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicle(id);
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  if (loading && vehicles.length === 0) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Ошибка: {error}</p>
        <button onClick={fetchVehicles}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="vehicle-list">
      <div className="vehicle-list-header">
        <h1>Список автомобилей</h1>
        <SortControls />
        <button 
          className="refresh-btn"
          onClick={fetchVehicles}
          disabled={loading}
        >
          {loading ? 'Обновление...' : 'Обновить'}
        </button>
      </div>

      {vehicles.length === 0 ? (
        <div className="empty-state">
          <p>Автомобили не найдены</p>
        </div>
      ) : (
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <VehicleItem
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <EditVehicleModal
        vehicle={editingVehicle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}; 