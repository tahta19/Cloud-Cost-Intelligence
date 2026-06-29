import { useQuery } from '@tanstack/react-query';
import type { ClusterData, APIResponse } from '../types/cluster';
import { transformProductsToClusters } from '../utils/transformers';

const fetchClusters = async (): Promise<ClusterData[]> => {
  const response = await fetch('https://dummyjson.com/products?limit=4');
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  const data: APIResponse = await response.json();
  return transformProductsToClusters(data.products);
};

export const useClusterData = () => {
  return useQuery({
    queryKey: ['clusters'],
    queryFn: fetchClusters,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
    retryDelay: 1000,
  });
};