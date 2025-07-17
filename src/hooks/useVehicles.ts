import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { vehiclesAtom, loadingAtom, errorAtom, sortedVehiclesAtom } from '../store/vehicleStore';
import { vehicleApi } from '../functions/vehicleApi';
import type { EditVehicleData } from '../types/vehicle';

export const useVehicles = () => {
  const [, setVehicles] = useAtom(vehiclesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [sortedVehicles] = useAtom(sortedVehiclesAtom);

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await vehicleApi.getAll();
      setVehicles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  }, [setVehicles, setLoading, setError]);

  const updateVehicle = useCallback(async (id: number, data: EditVehicleData) => {
    try {
      setLoading(true);
      setError(null);
      await vehicleApi.update(id, data);
      
      setVehicles(prev => prev.map(v => 
        v.id === id ? { ...v, ...data } : v
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setVehicles, setLoading, setError]);

  const deleteVehicle = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await vehicleApi.delete(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setVehicles, setLoading, setError]);

  return {
    vehicles: sortedVehicles,
    loading,
    error,
    fetchVehicles,
    updateVehicle,
    deleteVehicle,
  };
}; 