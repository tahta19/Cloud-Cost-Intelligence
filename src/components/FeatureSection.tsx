import { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useClusterData } from '../hooks/useClusterData';
import { ClusterCard } from './ClusterCard';
import { FilterTabs } from './FilterTabs';
import { SortDropdown } from './SortDropdown';
import type { ClusterData } from '../types/cluster';

export const FeatureSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cost-desc');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data, isLoading, error, refetch } = useClusterData();

  console.log('FeatureSection - Data:', data);
  console.log('FeatureSection - Loading:', isLoading);
  console.log('FeatureSection - Error:', error);

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
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-neutral-800/60 rounded-2xl p-6 h-[420px] animate-pulse border border-gray-700/30">
              <div className="flex justify-between mb-8">
                <div className="h-4 w-24 bg-neutral-700 rounded"></div>
                <div className="h-6 w-16 bg-neutral-700 rounded-full"></div>
              </div>
              <div className="h-10 w-32 bg-neutral-700 rounded mb-2"></div>
              <div className="h-4 w-20 bg-neutral-700 rounded mb-10"></div>
              <div className="space-y-6">
                <div className="h-4 w-full bg-neutral-700 rounded"></div>
                <div className="h-2 w-full bg-neutral-700 rounded-full"></div>
                <div className="space-y-3 pt-4">
                  <div className="h-4 w-full bg-neutral-700 rounded"></div>
                  <div className="h-4 w-full bg-neutral-700 rounded"></div>
                  <div className="h-4 w-full bg-neutral-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-neutral-800/60 rounded-2xl p-8 border border-red-300/30 text-center">
          <p className="text-slate-300 mb-4">⚠️ Failed to fetch cluster data</p>
          <p className="text-red-300 text-sm mb-4">{error.message}</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-violet-300 text-neutral-950 rounded-lg font-medium hover:bg-violet-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8" ref={ref}>
      {/* Header */}
      <header className="mb-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-800 rounded-full border border-gray-700 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          <span className="text-slate-300 text-xs font-medium tracking-wide">
            4 CLUSTERS • LIVE COST MONITORING
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-200 mb-4"
        >
          Cloud Cost Intelligence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-300 max-w-2xl md:mx-0 mx-auto"
        >
          Real-time resource allocation and cost optimization across your distributed cloud infrastructure.
        </motion.p>
      </header>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
      >
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {filteredData.map((cluster, index) => (
          <ClusterCard
            key={cluster.id}
            data={cluster}
            index={index}
            isVisible={isInView}
          />
        ))}
      </motion.div>
    </section>
  );
};