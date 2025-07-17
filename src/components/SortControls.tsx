import { useSorting } from '../hooks/useSorting';
import type { SortField } from '../types/vehicle';

export const SortControls = () => {
  const { sortField, sortOrder, handleSort } = useSorting();

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return '';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="sort-controls">
      <span>Сортировать по:</span>
      <button
        className={`sort-btn ${sortField === 'year' ? 'active' : ''}`}
        onClick={() => handleSort('year')}
      >
        Год{getSortIndicator('year')}
      </button>
      <button
        className={`sort-btn ${sortField === 'price' ? 'active' : ''}`}
        onClick={() => handleSort('price')}
      >
        Цена{getSortIndicator('price')}
      </button>
    </div>
  );
}; 