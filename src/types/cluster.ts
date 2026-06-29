export interface ClusterMetrics {
  cpu: string;
  ram: string;
  storage: string;
  network: string;
  gpu: string;
}

export interface ClusterData {
  id: string;
  title: string;
  status: 'Active' | 'Warning' | 'Critical';
  cost: number;
  trend: 'up' | 'down';
  efficiency: number;
  metrics: ClusterMetrics;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface APIResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}