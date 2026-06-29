import { useQuery } from '@tanstack/react-query';
import type { ClusterData } from '../types/cluster';

// Mock data sebagai fallback
const MOCK_DATA: ClusterData[] = [
  {
    id: '1',
    title: 'Cluster Alpha',
    status: 'Active',
    cost: 22,
    efficiency: 35,
    trend: 'down',
    metrics: { cpu: '61%', ram: '64GB', storage: '1.2TB', network: '450Mbps', gpu: '2x' }
  },
  {
    id: '2',
    title: 'Cluster Beta',
    status: 'Active',
    cost: 40,
    efficiency: 40,
    trend: 'up',
    metrics: { cpu: '66%', ram: '96GB', storage: '1.8TB', network: '680Mbps', gpu: '4x' }
  },
  {
    id: '3',
    title: 'Cluster Gamma',
    status: 'Warning',
    cost: 54,
    efficiency: 51,
    trend: 'up',
    metrics: { cpu: '94%', ram: '128GB', storage: '2.4TB', network: '920Mbps', gpu: '8x' }
  },
  {
    id: '4',
    title: 'Cluster Delta',
    status: 'Critical',
    cost: 68,
    efficiency: 50,
    trend: 'up',
    metrics: { cpu: '90%', ram: '256GB', storage: '4.0TB', network: '1.2Gbps', gpu: '16x' }
  },
  {
    id: '5',
    title: 'Cluster Epsilon',
    status: 'Active',
    cost: 35,
    efficiency: 45,
    trend: 'down',
    metrics: { cpu: '55%', ram: '48GB', storage: '0.8TB', network: '320Mbps', gpu: '1x' }
  },
  {
    id: '6',
    title: 'Cluster Zeta',
    status: 'Warning',
    cost: 72,
    efficiency: 38,
    trend: 'up',
    metrics: { cpu: '82%', ram: '192GB', storage: '3.2TB', network: '1.1Gbps', gpu: '12x' }
  },
];

// Transform API response ke ClusterData
const transformToClusterData = (item: { id?: number; title?: string }, index: number): ClusterData => {
  const statuses: ('Active' | 'Warning' | 'Critical')[] = ['Active', 'Active', 'Warning', 'Critical', 'Active', 'Warning', 'Critical', 'Active'];
  const trends: ('up' | 'down')[] = ['down', 'up', 'up', 'up', 'down', 'up', 'down', 'up'];
  const clusterNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'];
  
  const randomMetrics = () => ({
    cpu: `${Math.round(50 + Math.random() * 45)}%`,
    ram: `${Math.round(32 + Math.random() * 224)}GB`,
    storage: `${(1 + Math.random() * 3).toFixed(1)}TB`,
    network: `${Math.round(300 + Math.random() * 900)}Mbps`,
    gpu: `${Math.round(1 + Math.random() * 15)}x`
  });

  // ✅ Pakai nama cluster yang bagus, ignore title dari API
  const title = `Cluster ${clusterNames[index % clusterNames.length]}`;
  const cost = Math.round((30 + Math.random() * 70) / 10) * 10;
  
  return {
    id: String(item.id || index + 1),
    title: title,
    status: statuses[index % statuses.length],
    cost: cost > 0 ? cost : 50,
    efficiency: Math.round(30 + Math.random() * 40),
    trend: trends[index % trends.length],
    metrics: randomMetrics()
  };
};

// Fetch dari JSONPlaceholder
const fetchClusterData = async (): Promise<ClusterData[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data: Array<{ id: number; title: string }> = await response.json();
    
    return data.map((item, index) => transformToClusterData(item, index));
  } catch (error) {
    console.warn('API fetch failed, using mock data:', error);
    return MOCK_DATA;
  }
};

export const useClusterData = () => {
  return useQuery({
    queryKey: ['clusterData'],
    queryFn: fetchClusterData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  });
};