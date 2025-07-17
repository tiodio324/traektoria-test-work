import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAtom } from 'jotai';
import { vehiclesAtom } from '../store/vehicleStore';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export const VehicleMap = () => {
  const [vehicles] = useAtom(vehiclesAtom);

  const vehiclesWithCoordinates = vehicles.filter(
    (vehicle) => vehicle.latitude && vehicle.longitude
  );

  const center: [number, number] = vehiclesWithCoordinates.length > 0
    ? [vehiclesWithCoordinates[1].latitude!, vehiclesWithCoordinates[1].longitude!]
    : [55.7558, 37.6176];

  if (vehiclesWithCoordinates.length === 0) {
    return (
      <div className="map-container">
        <div className="map-empty">
          <p>Нет автомобилей с координатами для отображения на карте</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <h2>Карта автомобилей</h2>
      <MapContainer 
        center={center} 
        zoom={10} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehiclesWithCoordinates.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.latitude!, vehicle.longitude!]}
          >
            <Popup>
              <div className="map-popup">
                <h3>{vehicle.name}</h3>
                <p>{vehicle.model}</p>
                <p>Год: {vehicle.year}</p>
                <p>Цена: {vehicle.price.toLocaleString()} ₽</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}; 