import axios from 'axios';
import type { Vehicle, EditVehicleData } from '../types/vehicle';

const API_URL = import.meta.env.VITE_API_URL;

export const vehicleApi = {
  async getAll(): Promise<Vehicle[]> {
    const response = await axios.get<Vehicle[]>(API_URL);
    return response.data;
  },

  async update(id: number, data: EditVehicleData): Promise<Vehicle> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      id,
      ...data,
      model: '',
      year: 0,
      color: '',
      latitude: undefined,
      longitude: undefined,
    };
  },

  async delete(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Deleting vehicle with id: ${id}`);
  },
}; 