import type { Product, ClusterData, ClusterMetrics } from '../types/cluster';

const clusterNames = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const statuses: Array<'Active' | 'Warning' | 'Critical'> = ['Active', 'Active', 'Warning', 'Critical'];
const gpuConfigs = ['2x A100', '0x', '4x H100', '0x'];

export const transformProductsToClusters = (products: Product[]): ClusterData[] => {
  return products.map((product, index) => {
    // Metrics yang lebih bervariasi
    const cpu = Math.round((product.rating / 5) * 80 + 20);
    const ram = Math.round((product.stock / 100) * 64 + 16);
    const storage = Number((Math.round((product.price / 1000) * 6 + (index * 0.5) + 1) * 0.5).toFixed(1));
    const network = Math.round((product.rating / 5) * 40 + 10);
    
    const metrics: ClusterMetrics = {
      cpu: `${cpu}%`,
      ram: `${ram}GB`,
      storage: `${storage}TB`,
      network: `${network}Mbps`,
      gpu: gpuConfigs[index % gpuConfigs.length],
    };

    // Efficiency bervariasi (30-95%)
    const efficiency = Math.min(Math.round((product.discountPercentage * 0.6) + (product.rating * 5) + 20), 95);
    const trend = efficiency > 50 ? 'down' : 'up';

    // Cost bervariasi (10-150)
    const cost = Math.round((product.price * 0.12) + (index * 8) + 5);

    console.log(`Cluster ${clusterNames[index]}:`, { 
      cost, 
      efficiency, 
      metrics,
      rawData: {
        price: product.price,
        discount: product.discountPercentage,
        rating: product.rating,
        stock: product.stock
      }
    });

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