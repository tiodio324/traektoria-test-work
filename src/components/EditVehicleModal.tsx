import { useState, useEffect } from 'react';
import type { Vehicle, EditVehicleData } from '../types/vehicle';

interface EditVehicleModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditVehicleData) => Promise<void>;
}

export const EditVehicleModal = ({ vehicle, isOpen, onClose, onSave }: EditVehicleModalProps) => {
  const [formData, setFormData] = useState<EditVehicleData>({
    name: '',
    price: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name,
        price: vehicle.price,
      });
    }
  }, [vehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle) return;

    try {
      setIsSaving(true);
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to save vehicle:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !vehicle) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Редактировать автомобиль</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Название:</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Цена:</label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              required
              min="0"
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={isSaving}>
              Отмена
            </button>
            <button type="submit" disabled={isSaving}>
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 