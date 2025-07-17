import { useAtom } from 'jotai';
import { sortFieldAtom, sortOrderAtom } from '../store/vehicleStore';
import type { SortField } from '../types/vehicle';

export const useSorting = () => {
  const [sortField, setSortField] = useAtom(sortFieldAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    sortField,
    sortOrder,
    handleSort,
  };
}; 