import type { Vehicle } from '../types/vehicle';

interface VehicleItemProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: number) => void;
}

export const VehicleItem = ({ vehicle, onEdit, onDelete }: VehicleItemProps) => {
  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить ${vehicle.name}?`)) {
      onDelete(vehicle.id);
    }
  };

  return (
    <div className="vehicle-item">
      <div className="vehicle-info">
        <h3>{vehicle.name}</h3>
        <p className="vehicle-model">{vehicle.model}</p>
        <div className="vehicle-details">
          <span className="vehicle-year">Год: {vehicle.year}</span>
          <span className="vehicle-color">Цвет: {vehicle.color}</span>
          <span className="vehicle-price">Цена: {vehicle.price.toLocaleString()} ₽</span>
        </div>
        {vehicle.latitude && vehicle.longitude && (
          <div className="vehicle-coordinates">
            Координаты: {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}
          </div>
        )}
      </div>
      <div className="vehicle-actions">
        <button 
          className="edit-btn"
          onClick={() => onEdit(vehicle)}
          aria-label={`Редактировать ${vehicle.name}`}
        >
          Редактировать
        </button>
        <button 
          className="delete-btn"
          onClick={handleDelete}
          aria-label={`Удалить ${vehicle.name}`}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}; 