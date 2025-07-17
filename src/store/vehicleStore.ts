import { atom } from 'jotai';
import type { Vehicle, SortField, SortOrder } from '../types/vehicle';

export const vehiclesAtom = atom<Vehicle[]>([]);

export const loadingAtom = atom<boolean>(false);

export const errorAtom = atom<string | null>(null);

export const sortFieldAtom = atom<SortField>('year');

export const sortOrderAtom = atom<SortOrder>('asc');

export const sortedVehiclesAtom = atom((get) => {
  const vehicles = get(vehiclesAtom);
  const sortField = get(sortFieldAtom);
  const sortOrder = get(sortOrderAtom);

  return [...vehicles].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
}); 