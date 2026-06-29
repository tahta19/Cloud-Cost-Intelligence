import { useState, useMemo } from 'react';
import { useClusterData } from '../hooks/useClusterData';
import { FilterTabs } from './FilterTabs';
import { SortDropdown } from './SortDropdown';
import type { ClusterData } from '../types/cluster';
import { StatusBadge } from './StatusBadge';
import { EfficiencyBar } from './EfficiencyBar';
import { MetricItem } from './MetricItem';
import { Modal } from './Modal';
import { MaterialIcon } from './MaterialIcon';

export const FeatureSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cost-desc');
  const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(null);

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
        <div className="text-[var(--color-text-primary)] text-center text-xl">Loading clusters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-accent-error)]/30 text-center shadow-[var(--shadow-card)]">
          <p className="text-[var(--color-text-secondary)] mb-4">⚠️ Failed to fetch cluster data</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded-lg font-medium hover:opacity-80 transition-opacity"
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
        <div className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)] text-center shadow-[var(--shadow-card)]">
          <p className="text-[var(--color-text-secondary)]">No clusters found</p>
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
    cpu: 'var(--color-metric-cpu)',
    ram: 'var(--color-metric-ram)',
    storage: 'var(--color-metric-storage)',
    network: 'var(--color-metric-network)',
    gpu: 'var(--color-metric-gpu)',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-bg-secondary)]/80 backdrop-blur-[6px] rounded-full border border-[var(--color-border)] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-success)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-success)]"></span>
          </span>
          <span className="text-[var(--color-text-muted)] text-[11px] font-medium tracking-widest uppercase">
            4 CLUSTERS • LIVE COST MONITORING
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          Cloud Cost Intelligence
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl md:mx-0 mx-auto">
          Real-time resource allocation and cost optimization across your distributed cloud infrastructure.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map((cluster) => {
          const metrics = cluster.metrics || { cpu: '0%', ram: '0GB', storage: '0TB', network: '0Mbps', gpu: '0x' };
          
          return (
            <div 
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster)}
              className="group bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 hover:border-[var(--color-accent-primary)]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px]"
              role="button"
              tabIndex={0}
              aria-label={`${cluster.title}: Cost $${cluster.cost}, Status ${cluster.status}`}
            >
              {/* HEADER */}
              <div className="self-stretch flex flex-col justify-start items-start gap-8">
                <div className="self-stretch inline-flex justify-between items-center">
                  <h3 className="text-[var(--color-text-primary)] text-sm font-semibold leading-5 tracking-tight group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">
                    {cluster.title}
                  </h3>
                  <StatusBadge status={cluster.status} />
                </div>

                {/* COST */}
                <div className="self-stretch pb-[1.50px] flex flex-col justify-start items-start gap-2.5">
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <span className="text-[var(--color-text-primary)] text-5xl font-bold leading-[1.1] tracking-tight group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">$</span>
                    <span className="text-[var(--color-text-primary)] text-5xl font-bold leading-[1.1] tracking-tight group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">
                      {cluster.cost}
                    </span>
                    <span className={`ml-auto transition-transform duration-300 group-hover:scale-110 ${
                      cluster.trend === 'down' ? 'text-[var(--color-accent-success)]' : 'text-[var(--color-accent-error)]'
                    }`}>
                      <MaterialIcon 
                        name={cluster.trend === 'down' ? 'south_east' : 'north_east'} 
                        size="base"
                      />
                    </span>
                  </div>
                  <span className="text-[var(--color-text-muted)] text-[10px] font-medium uppercase leading-4 tracking-widest">
                    ESTIMATED MONTHLY COST
                  </span>
                </div>

                {/* EFFICIENCY BAR */}
                <EfficiencyBar value={cluster.efficiency} isVisible={true} />

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
                <div className="self-stretch pt-6 pb-[2.50px] opacity-0 group-hover:opacity-100 border-t border-[var(--color-border)] group-hover:border-[var(--color-accent-primary)]/50 flex flex-col justify-start items-center transition-all duration-300">
                  <span className="text-[var(--color-accent-primary)] text-[10px] font-bold uppercase leading-4 tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
                    CLICK FOR FULL ANALYSIS
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                  {selectedCluster.title}
                </h2>
                <span className="px-2 py-0.5 bg-[var(--color-bg-secondary)] rounded text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                  PRODUCTION
                </span>
              </div>
              <button
                onClick={() => setSelectedCluster(null)}
                className="p-1.5 rounded hover:bg-[var(--color-bg-secondary)] transition-colors text-[var(--color-text-muted)]"
              >
                <MaterialIcon name="close" size="lg" />
              </button>
            </div>

            {/* STATUS + COST + TREND */}
            <div className="p-5 bg-[var(--color-bg-secondary)]/50 rounded-lg border border-[var(--color-border)]/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <StatusBadge status={selectedCluster.status} />
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    ID: {selectedCluster.id}
                  </span>
                </div>
                <span className="text-sm text-[var(--color-text-muted)]">
                  Projected Monthly Spend
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                  ${selectedCluster.cost}
                </div>
                <div className={`flex items-center justify-end gap-1 ${
                  selectedCluster.trend === 'down' ? 'text-[var(--color-accent-success)]' : 'text-[var(--color-accent-error)]'
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
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Efficiency Score
                </span>
                <span className={`text-2xl font-bold ${
                  selectedCluster.efficiency > 70 ? 'text-[var(--color-accent-success)]' :
                  selectedCluster.efficiency > 40 ? 'text-[var(--color-accent-warning)]' :
                  'text-[var(--color-accent-error)]'
                }`}>
                  {selectedCluster.efficiency}%
                </span>
              </div>
              <div className="h-3 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${selectedCluster.efficiency}%`,
                    background: `linear-gradient(to right, var(--color-accent-error), var(--color-accent-warning), var(--color-accent-success))`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                <span>INEFFICIENT</span>
                <span>AVERAGE</span>
                <span>OPTIMAL</span>
              </div>
            </div>

            {/* RESOURCE ALLOCATION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MaterialIcon name="storage" size="base" className="text-[var(--color-metric-cpu)]" />
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  Resource Allocation
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { 
                    label: 'CPU Usage', 
                    value: selectedCluster.metrics.cpu, 
                    detail: '32 Cores',
                    color: 'var(--color-metric-cpu)',
                    bg: 'bg-[var(--color-metric-cpu)]'
                  },
                  { 
                    label: 'RAM Usage', 
                    value: selectedCluster.metrics.ram, 
                    detail: '128GB Total',
                    color: 'var(--color-metric-ram)',
                    bg: 'bg-[var(--color-metric-ram)]'
                  },
                  { 
                    label: 'Storage', 
                    value: selectedCluster.metrics.storage, 
                    detail: '2.0 TB Cap',
                    color: 'var(--color-metric-gpu)',
                    bg: 'bg-[var(--color-metric-gpu)]'
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
                          <span className="text-sm text-[var(--color-text-muted)]">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-sm font-medium text-[var(--color-text-primary)]">
                            {displayValue}
                          </span>
                          <span className="text-xs text-[var(--color-text-muted)] ml-1">
                            ({item.detail})
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
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
              <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
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
                  <div key={item.label} className="p-3 bg-[var(--color-bg-secondary)]/50 rounded-lg border border-[var(--color-border)]/50 text-center">
                    <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-lg font-bold text-[var(--color-text-primary)]">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OPTIMIZER INSIGHT */}
            <div className="p-4 bg-[var(--color-accent-warning)]/10 rounded-lg border border-[var(--color-accent-warning)]/30 flex items-start gap-4">
              <MaterialIcon name="lightbulb" size="lg" className="text-[var(--color-accent-warning)] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-[var(--color-accent-warning)]">
                  Optimizer Insight Identified
                </span>
                <p className="text-sm text-[var(--color-accent-warning)]/90">
                  Waste identified in idle nodes. Scale down recommended to save approximately 
                  <span className="underline font-semibold"> $142/mo</span> without affecting performance.
                </p>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <button 
              className="w-full px-4 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-lg font-semibold hover:bg-[var(--color-bg-card-hover)] transition-colors"
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