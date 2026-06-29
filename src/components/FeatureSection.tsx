import { useState, useMemo } from 'react';
import { useClusterData } from '../hooks/useClusterData';
import { FilterTabs } from './FilterTabs';
import { SortDropdown } from './SortDropdown';
import type { ClusterData } from '../types/cluster';

export const FeatureSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cost-desc');

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
        <div className="text-white text-center text-xl font-['Inter']">Loading clusters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-neutral-800/60 rounded-2xl p-8 border border-red-300/30 text-center">
          <p className="text-slate-300 mb-4 font-['Inter']">⚠️ Failed to fetch cluster data</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-violet-300 text-neutral-950 rounded-lg font-medium font-['Inter'] hover:bg-violet-200 transition-colors"
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
        <div className="bg-neutral-800/60 rounded-2xl p-8 border border-gray-700/30 text-center">
          <p className="text-slate-300 font-['Inter']">No clusters found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-800 rounded-full border border-gray-700 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          <span className="text-slate-300 text-[11px] font-medium font-['Inter'] tracking-widest uppercase">
            4 CLUSTERS • LIVE COST MONITORING
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-['Inter'] tracking-tight text-neutral-200 mb-4">
          Cloud Cost Intelligence
        </h1>
        <p className="text-lg text-slate-300 font-['Inter'] max-w-2xl md:mx-0 mx-auto">
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
        {filteredData.map((cluster) => (
          <div key={cluster.id} className="bg-neutral-800/60 backdrop-blur-[6px] rounded-2xl p-6 border border-gray-700/30 hover:border-violet-300/40 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px] group">
            {/* HEADER */}
            <div className="self-stretch flex flex-col justify-start items-start gap-8">
              <div className="self-stretch inline-flex justify-between items-center">
                <h3 className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5 tracking-tight">
                  {cluster.title}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-['Inter'] uppercase tracking-wide border ${
                  cluster.status === 'Active' ? 'bg-green-400/10 text-green-400 border-green-400/20' :
                  cluster.status === 'Warning' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
                  'bg-red-300/10 text-red-300 border-red-300/20'
                }`}>
                  {cluster.status}
                </span>
              </div>

              {/* COST */}
              <div className="self-stretch pb-[1.50px] flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <span className="text-neutral-200 text-4xl font-bold font-['Inter'] leading-10 tracking-tight">$</span>
                  <span className="text-neutral-200 text-4xl font-bold font-['Inter'] leading-10 tracking-tight">
                    {cluster.cost}
                  </span>
                  <div className={`w-3 h-3 ${cluster.trend === 'down' ? 'bg-green-400' : 'bg-red-300'}`} />
                </div>
                <span className="text-slate-300/70 text-[10px] font-medium font-['Inter'] uppercase leading-4 tracking-widest">
                  ESTIMATED MONTHLY COST
                </span>
              </div>

              {/* EFFICIENCY BAR */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-between items-start">
                  <span className="text-slate-300 text-[11px] font-medium font-['Inter'] leading-4 tracking-wide">
                    Efficiency Score
                  </span>
                  <span className={`text-[11px] font-semibold font-['Inter'] leading-4 ${
                    cluster.efficiency < 40 ? 'text-red-300' : 
                    cluster.efficiency < 70 ? 'text-amber-400' : 'text-green-400'
                  }`}>
                    {cluster.efficiency}%
                  </span>
                </div>
                <div className="self-stretch h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${cluster.efficiency}%`,
                      backgroundColor: cluster.efficiency < 40 ? '#f87171' : 
                                     cluster.efficiency < 70 ? '#fbbf24' : '#34d399'
                    }}
                  />
                </div>
              </div>

              {/* METRICS */}
              <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-3.5">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2.5">
                    <span className="text-base text-blue-400">⚡</span>
                    <span className="text-slate-300 text-sm font-medium font-['Inter'] leading-5 tracking-wide">CPU</span>
                  </div>
                  <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{cluster.metrics.cpu}</span>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2.5">
                    <span className="text-base text-purple-400">💾</span>
                    <span className="text-slate-300 text-sm font-medium font-['Inter'] leading-5 tracking-wide">RAM</span>
                  </div>
                  <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{cluster.metrics.ram}</span>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2.5">
                    <span className="text-base text-green-400">📦</span>
                    <span className="text-slate-300 text-sm font-medium font-['Inter'] leading-5 tracking-wide">Storage</span>
                  </div>
                  <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{cluster.metrics.storage}</span>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2.5">
                    <span className="text-base text-cyan-400">🌐</span>
                    <span className="text-slate-300 text-sm font-medium font-['Inter'] leading-5 tracking-wide">Network</span>
                  </div>
                  <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{cluster.metrics.network}</span>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2.5">
                    <span className="text-base text-orange-400">🎮</span>
                    <span className="text-slate-300 text-sm font-medium font-['Inter'] leading-5 tracking-wide">GPU</span>
                  </div>
                  <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{cluster.metrics.gpu}</span>
                </div>
              </div>
            </div>

            {/* HOVER EFFECT */}
            <div className="self-stretch pt-8 flex flex-col justify-start items-start">
              <div className="self-stretch pt-6 pb-[2.50px] opacity-0 group-hover:opacity-100 border-t border-gray-700/30 flex flex-col justify-start items-center transition-opacity duration-300">
                <span className="text-violet-300 text-[10px] font-bold font-['Inter'] uppercase leading-4 tracking-widest">
                  CLICK FOR FULL ANALYSIS
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};