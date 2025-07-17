export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude?: number;
  longitude?: number;
}

export interface EditVehicleData {
  name: string;
  price: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type SortField = 'year' | 'price';
export type SortOrder = 'asc' | 'desc'; 