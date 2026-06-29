import { motion } from 'framer-motion';
import type { ClusterData } from '../types/cluster';
import { StatusBadge } from './StatusBadge';
import { EfficiencyBar } from './EfficiencyBar';
import { MetricItem } from './MetricItem';

interface ClusterCardProps {
  data: ClusterData;
  index: number;
  isVisible: boolean;
}

const metricConfig = {
  cpu: { icon: '⚡', label: 'CPU', color: '#60A5FA' },
  ram: { icon: '💾', label: 'RAM', color: '#A78BFA' },
  storage: { icon: '📦', label: 'Storage', color: '#34D399' },
  network: { icon: '🌐', label: 'Network', color: '#22D3EE' },
  gpu: { icon: '🎮', label: 'GPU', color: '#FB923C' },
};

export const ClusterCard: React.FC<ClusterCardProps> = ({ data, index, isVisible }) => {
  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100,
        delay: index * 0.15,
      },
    },
  };

  // Debug: cek data
  console.log('ClusterCard data:', data);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex-1 p-6 bg-neutral-800/60 backdrop-blur-[6px] rounded-2xl border border-gray-700/30 hover:border-violet-300/40 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px]"
      role="button"
      tabIndex={0}
      aria-label={`${data.title}: Cost $${data.cost}, Status ${data.status}`}
    >
      {/* HEADER */}
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        <div className="self-stretch inline-flex justify-between items-center">
          <h3 className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">
            {data.title}
          </h3>
          <StatusBadge status={data.status} />
        </div>

        {/* COST */}
        <div className="self-stretch pb-[1.50px] flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <span className="text-neutral-200 text-4xl font-bold font-['Inter'] leading-10">$</span>
            <span className="text-neutral-200 text-4xl font-bold font-['Inter'] leading-10">
              {data.cost}
            </span>
            <div className={`w-3 h-3 ${data.trend === 'down' ? 'bg-green-400' : 'bg-red-300'}`} />
          </div>
          <span className="text-slate-300/70 text-xs font-medium font-['Inter'] uppercase leading-4 tracking-wide">
            ESTIMATED MONTHLY COST
          </span>
        </div>

        {/* EFFICIENCY BAR */}
        <EfficiencyBar value={data.efficiency} isVisible={isVisible} />

        {/* METRICS */}
        <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-3.5">
          <MetricItem
            icon={metricConfig.cpu.icon}
            label={metricConfig.cpu.label}
            value={data.metrics.cpu}
            color={metricConfig.cpu.color}
          />
          <MetricItem
            icon={metricConfig.ram.icon}
            label={metricConfig.ram.label}
            value={data.metrics.ram}
            color={metricConfig.ram.color}
          />
          <MetricItem
            icon={metricConfig.storage.icon}
            label={metricConfig.storage.label}
            value={data.metrics.storage}
            color={metricConfig.storage.color}
          />
          <MetricItem
            icon={metricConfig.network.icon}
            label={metricConfig.network.label}
            value={data.metrics.network}
            color={metricConfig.network.color}
          />
          <MetricItem
            icon={metricConfig.gpu.icon}
            label={metricConfig.gpu.label}
            value={data.metrics.gpu}
            color={metricConfig.gpu.color}
          />
        </div>
      </div>

      {/* HOVER EFFECT */}
      <div className="self-stretch pt-8 flex flex-col justify-start items-start">
        <div className="self-stretch pt-6 pb-[2.50px] opacity-0 group-hover:opacity-100 border-t border-gray-700/30 flex flex-col justify-start items-center transition-opacity duration-300">
          <span className="text-violet-300 text-[10px] font-bold font-['Inter'] uppercase leading-4 tracking-wide">
            CLICK FOR FULL ANALYSIS
          </span>
        </div>
      </div>
    </motion.article>
  );
};