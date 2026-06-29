import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useClusterData } from '../hooks/useClusterData';
import { FilterTabs } from './FilterTabs';
import { SortDropdown } from './SortDropdown';
import type { ClusterData } from '../types/cluster';
import { StatusBadge } from './StatusBadge';
import { EfficiencyBar } from './EfficiencyBar';
import { MetricItem } from './MetricItem';
import { Modal } from './Modal';
import { MaterialIcon } from './MaterialIcon';

// AnimatedCounter - return angka saja, styling di parent
const AnimatedCounter: React.FC<{ value: number; isVisible: boolean; delay: number }> = ({
  value,
  isVisible,
  delay,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [value, isVisible, delay]);

  return <>{count}</>;
};

export const FeatureSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cost-desc');
  const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data, isLoading, error, refetch } = useClusterData();

  const filteredData = useMemo(() => {
    if (!data) return [];

    let result: ClusterData[] = [...data];

    if (activeFilter !== 'All') {
      result = result.filter((cluster) => cluster.status === activeFilter);
    }

    switch (sortBy) {
      case 'cost-desc':
        result.sort((a, b) => b.cost - a.cost);
        break;
      case 'cost-asc':
        result.sort((a, b) => a.cost - b.cost);
        break;
      case 'efficiency':
        result.sort((a, b) => b.efficiency - a.efficiency);
        break;
    }

    return result;
  }, [data, activeFilter, sortBy]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-gray-900 dark:text-[#E3E2E4] text-center text-xl">Loading clusters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-[#1E1F23] rounded-2xl p-8 border border-red-300 dark:border-red-500/30 text-center shadow-md dark:shadow-lg">
          <p className="text-gray-700 dark:text-[#C3C5D7] mb-4">⚠️ Failed to fetch cluster data</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 dark:bg-[#B5C4FF] text-white dark:text-[#0E0F11] rounded-lg font-medium hover:opacity-80 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-[#1E1F23] rounded-2xl p-8 border border-gray-200 dark:border-[#434654] text-center shadow-md dark:shadow-lg">
          <p className="text-gray-700 dark:text-[#C3C5D7]">No clusters found</p>
        </div>
      </div>
    );
  }

  const metricIcons = {
    cpu: 'bolt',
    ram: 'memory',
    storage: 'database',
    network: 'language',
    gpu: 'sports_esports',
  };

  const metricColors = {
    cpu: '#3b82f6',
    ram: '#8b5cf6',
    storage: '#22c55e',
    network: '#06b6d4',
    gpu: '#f97316',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-[#1A1B1E]/80 backdrop-blur-[6px] rounded-full border border-gray-300 dark:border-[#434654] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-[#5ADF8C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 dark:bg-[#5ADF8C]"></span>
          </span>
          <span className="text-gray-700 dark:text-[#C3C5D7] text-[11px] font-medium tracking-widest uppercase">
            4 CLUSTERS • LIVE COST MONITORING
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-[#E3E2E4] mb-4">
          Cloud Cost Intelligence
        </h1>
        <p className="text-lg text-gray-700 dark:text-[#C3C5D7] max-w-2xl md:mx-0 mx-auto">
          Real-time resource allocation and cost optimization across your distributed cloud infrastructure.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Grid */}
      <motion.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {filteredData.map((cluster, index) => {
          const metrics = cluster.metrics || { cpu: '0%', ram: '0GB', storage: '0TB', network: '0Mbps', gpu: '0x' };
          
          return (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedCluster(cluster)}
              className="group bg-white dark:bg-[#1E1F23] rounded-2xl p-6 border border-gray-200 dark:border-[#434654] shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:border-blue-400 dark:hover:border-[#B5C4FF]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px]"
              role="button"
              tabIndex={0}
              aria-label={`${cluster.title}: Cost $${cluster.cost}, Status ${cluster.status}`}
            >
              {/* HEADER */}
              <div className="self-stretch flex flex-col justify-start items-start gap-8">
                <div className="self-stretch inline-flex justify-between items-center">
                  <h3 className="text-gray-900 dark:text-[#E3E2E4] text-sm font-semibold leading-5 tracking-tight group-hover:text-blue-600 dark:group-hover:text-[#B5C4FF] transition-colors duration-300">
                    {cluster.title}
                  </h3>
                  <StatusBadge status={cluster.status} />
                </div>

                {/* COST - UKURAN BESAR text-5xl */}
                <div className="self-stretch pb-[1.50px] flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <span className="text-gray-900 dark:text-[#E3E2E4] text-5xl font-bold leading-[1.1] tracking-tight group-hover:text-blue-600 dark:group-hover:text-[#B5C4FF] transition-colors duration-300">
                      $
                    </span>
                    <span className="text-gray-900 dark:text-[#E3E2E4] text-5xl font-bold leading-[1.1] tracking-tight group-hover:text-blue-600 dark:group-hover:text-[#B5C4FF] transition-colors duration-300">
                      <AnimatedCounter
                        value={cluster.cost}
                        isVisible={isInView}
                        delay={index * 0.1}
                      />
                    </span>
                    <span className={`ml-auto transition-transform duration-300 group-hover:scale-110 ${
                      cluster.trend === 'down' ? 'text-green-500 dark:text-[#5ADF8C]' : 'text-red-500 dark:text-[#FFB4AB]'
                    }`}>
                      <MaterialIcon 
                        name={cluster.trend === 'down' ? 'south_east' : 'north_east'} 
                        size="base"
                      />
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-[#C3C5D7]/70 text-[10px] font-medium uppercase leading-4 tracking-widest">
                    ESTIMATED MONTHLY COST
                  </span>
                </div>

                {/* EFFICIENCY BAR */}
                <EfficiencyBar value={cluster.efficiency} isVisible={isInView} />

                {/* METRICS */}
                <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-3.5">
                  <MetricItem
                    icon={metricIcons.cpu}
                    label="CPU"
                    value={metrics.cpu}
                    color={metricColors.cpu}
                  />
                  <MetricItem
                    icon={metricIcons.ram}
                    label="RAM"
                    value={metrics.ram}
                    color={metricColors.ram}
                  />
                  <MetricItem
                    icon={metricIcons.storage}
                    label="Storage"
                    value={metrics.storage}
                    color={metricColors.storage}
                  />
                  <MetricItem
                    icon={metricIcons.network}
                    label="Network"
                    value={metrics.network}
                    color={metricColors.network}
                  />
                  <MetricItem
                    icon={metricIcons.gpu}
                    label="GPU"
                    value={metrics.gpu}
                    color={metricColors.gpu}
                  />
                </div>
              </div>

              {/* HOVER EFFECT */}
              <div className="self-stretch pt-8 flex flex-col justify-start items-start">
                <div className="self-stretch pt-6 pb-[2.50px] opacity-0 group-hover:opacity-100 border-t border-gray-200 dark:border-[#434654] group-hover:border-blue-400 dark:group-hover:border-[#B5C4FF]/50 flex flex-col justify-start items-center transition-all duration-300">
                  <span className="text-blue-600 dark:text-[#B5C4FF] text-[10px] font-bold uppercase leading-4 tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
                    CLICK FOR FULL ANALYSIS
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* MODAL */}
      <Modal
        isOpen={!!selectedCluster}
        onClose={() => setSelectedCluster(null)}
        title=""
        maxWidth="2xl"
      >
        {selectedCluster && (
          <div className="space-y-4">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedCluster.title}
                </h2>
                <span className="px-2 py-0.5 bg-gray-200 dark:bg-[#292A2C] rounded text-[10px] font-bold text-gray-600 dark:text-[#C3C5D7] uppercase tracking-wide">
                  PRODUCTION
                </span>
              </div>
              <button
                onClick={() => setSelectedCluster(null)}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#292A2C] transition-colors text-gray-500 dark:text-[#C3C5D7]"
              >
                <MaterialIcon name="close" size="lg" />
              </button>
            </div>

            {/* STATUS + COST + TREND */}
            <div className="p-5 bg-gray-50 dark:bg-[#1A1B1E]/50 rounded-lg border border-gray-200 dark:border-[#434654]/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <StatusBadge status={selectedCluster.status} />
                  <span className="text-xs text-gray-500 dark:text-[#C3C5D7]/70 font-mono">
                    ID: {selectedCluster.id}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-[#C3C5D7]">
                  Projected Monthly Spend
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${selectedCluster.cost}
                </div>
                <div className={`flex items-center justify-end gap-1 ${
                  selectedCluster.trend === 'down' ? 'text-green-600 dark:text-[#5ADF8C]' : 'text-red-600 dark:text-[#FFB4AB]'
                }`}>
                  <MaterialIcon 
                    name={selectedCluster.trend === 'down' ? 'south_east' : 'north_east'} 
                    size="sm"
                  />
                  <span className="text-sm font-medium">
                    {selectedCluster.trend === 'down' ? '-' : '+'}12.4% Increasing
                  </span>
                </div>
              </div>
            </div>

            {/* EFFICIENCY SCORE */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end pb-1">
                <span className="text-sm font-semibold text-gray-700 dark:text-[#C3C5D7]">
                  Efficiency Score
                </span>
                <span className={`text-2xl font-bold ${
                  selectedCluster.efficiency > 70 ? 'text-green-600 dark:text-[#5ADF8C]' :
                  selectedCluster.efficiency > 40 ? 'text-amber-500' :
                  'text-red-500'
                }`}>
                  {selectedCluster.efficiency}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-[#292A2C] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${selectedCluster.efficiency}%`,
                    background: `linear-gradient(to right, #ef4444, #eab308, #22c55e)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-[#C3C5D7]/70 uppercase tracking-wide">
                <span>INEFFICIENT</span>
                <span>AVERAGE</span>
                <span>OPTIMAL</span>
              </div>
            </div>

            {/* RESOURCE ALLOCATION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MaterialIcon name="storage" size="base" className="text-blue-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-[#C3C5D7]">
                  Resource Allocation
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { 
                    label: 'CPU Usage', 
                    value: selectedCluster.metrics.cpu, 
                    detail: '32 Cores',
                    color: '#3b82f6',
                    bg: 'bg-blue-500'
                  },
                  { 
                    label: 'RAM Usage', 
                    value: selectedCluster.metrics.ram, 
                    detail: '128GB Total',
                    color: '#8b5cf6',
                    bg: 'bg-purple-500'
                  },
                  { 
                    label: 'Storage', 
                    value: selectedCluster.metrics.storage, 
                    detail: '2.0 TB Cap',
                    color: '#f97316',
                    bg: 'bg-orange-400'
                  },
                ].map((item) => {
                  const numericValue = parseInt(item.value);
                  const isPercentage = item.value.includes('%');
                  const displayValue = isPercentage ? `${numericValue}%` : item.value;
                  
                  return (
                    <div key={item.label} className="flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 pb-px">
                          <span className={`w-2 h-2 ${item.bg} rounded-full`} />
                          <span className="text-sm text-gray-500 dark:text-[#C3C5D7]">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {displayValue}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-[#C3C5D7]/70 ml-1">
                            ({item.detail})
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-[#292A2C] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: isPercentage ? `${numericValue}%` : '75%',
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COST BREAKDOWN */}
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-[#C3C5D7]">
                Cost Breakdown (USD)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { label: 'COMPUTE', value: '$' + Math.round(selectedCluster.cost * 0.35) },
                  { label: 'MEMORY', value: '$' + Math.round(selectedCluster.cost * 0.20) },
                  { label: 'STORAGE', value: '$' + Math.round(selectedCluster.cost * 0.15) },
                  { label: 'NETWORK', value: '$' + Math.round(selectedCluster.cost * 0.10) },
                  { label: 'OTHER', value: '$' + Math.round(selectedCluster.cost * 0.20) },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-gray-50 dark:bg-[#1A1B1E]/50 rounded-lg border border-gray-200 dark:border-[#434654]/50 text-center">
                    <div className="text-[10px] font-bold text-gray-500 dark:text-[#C3C5D7]/70 uppercase tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OPTIMIZER INSIGHT */}
            <div className="p-4 bg-amber-50 dark:bg-[#F9BD22]/10 rounded-lg border border-amber-200 dark:border-[#F9BD22]/30 flex items-start gap-4">
              <MaterialIcon name="lightbulb" size="lg" className="text-amber-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  Optimizer Insight Identified
                </span>
                <p className="text-sm text-amber-600/90 dark:text-amber-400/90">
                  Waste identified in idle nodes. Scale down recommended to save approximately 
                  <span className="underline font-semibold"> $142/mo</span> without affecting performance.
                </p>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <button 
              className="w-full px-4 py-2.5 bg-gray-200 dark:bg-[#292A2C] text-gray-700 dark:text-[#C3C5D7] rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-[#1E1F23] transition-colors"
              onClick={() => setSelectedCluster(null)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};