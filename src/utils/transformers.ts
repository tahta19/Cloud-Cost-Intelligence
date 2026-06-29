import type { Product, ClusterData, ClusterMetrics } from '../types/cluster';

const clusterNames = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const statuses: Array<'Active' | 'Warning' | 'Critical'> = ['Active', 'Active', 'Warning', 'Critical'];
const gpuConfigs = ['2x A100', '0x', '4x H100', '0x'];

export const transformProductsToClusters = (products: Product[]): ClusterData[] => {
  return products.map((product, index) => {
    // Metrics yang lebih bervariasi
    const cpu = Math.round((product.rating / 5) * 80 + 20);
    const ram = Math.round((product.stock / 100) * 64 + 16);
    const storage = Number((Math.round((product.price / 1000) * 8 + (index * 0.8) + 0.5) * 0.5).toFixed(1));
    const network = Math.round((product.rating / 5) * 40 + 10);
    
    const metrics: ClusterMetrics = {
      cpu: `${cpu}%`,
      ram: `${ram}GB`,
      storage: `${storage}TB`,
      network: `${network}Mbps`,
      gpu: gpuConfigs[index % gpuConfigs.length],
    };

    // Efficiency lebih bervariasi (20-90%)
    const efficiency = Math.min(Math.round((product.discountPercentage * 0.4) + (product.rating * 8) + 10), 90);
    const trend = efficiency > 50 ? 'down' : 'up';

    // Cost lebih besar (50-250)
    const cost = Math.round((product.price * 0.25) + (index * 15) + 20);

    return {
      id: String(product.id),
      title: `Cluster ${clusterNames[index % clusterNames.length]}`,
      status: statuses[index % statuses.length],
      cost: cost || 50,
      trend,
      efficiency: efficiency || 50,
      metrics,
    };
  });
};