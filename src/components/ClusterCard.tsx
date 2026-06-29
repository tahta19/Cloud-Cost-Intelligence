import { motion } from 'framer-motion';
import type { ClusterData } from '../types/cluster';
import { StatusBadge } from './StatusBadge';
import { EfficiencyBar } from './EfficiencyBar';
import { MetricItem } from './MetricItem';
import { MaterialIcon } from './MaterialIcon';
import { CountingNumber } from './AnimatedNumber';  // ✅ Import

interface ClusterCardProps {
  data: ClusterData;
  index: number;
  isVisible: boolean;
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

export const ClusterCard: React.FC<ClusterCardProps> = ({ data, index, isVisible }) => {
  if (!data) return null;

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

  const metrics = data.metrics || { cpu: '0%', ram: '0GB', storage: '0TB', network: '0Mbps', gpu: '0x' };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="group bg-white dark:bg-[#1E1F23] rounded-2xl p-6 border border-gray-200 dark:border-[#434654] shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:border-blue-400 dark:hover:border-[#B5C4FF]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px]"
      role="button"
      tabIndex={0}
      aria-label={`${data.title}: Cost $${data.cost}, Status ${data.status}`}
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        {/* HEADER */}
        <div className="self-stretch inline-flex justify-between items-center">
          <h3 className="text-gray-900 dark:text-[#E3E2E4] text-sm font-semibold font-['Inter'] leading-5 tracking-tight group-hover:text-blue-600 dark:group-hover:text-[#B5C4FF] transition-colors duration-300">
            {data.title}
          </h3>
          <StatusBadge status={data.status} />
        </div>

        {/* COST dengan COUNTING ANIMATION */}
        <div className="self-stretch pb-[1.50px] flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <CountingNumber 
              value={data.cost}
              prefix="$"
              duration={1.5}
              className="text-gray-900 dark:text-[#E3E2E4] text-4xl font-bold font-['Inter'] leading-10 tracking-tight group-hover:text-blue-600 dark:group-hover:text-[#B5C4FF] transition-colors duration-300"
            />
            <span className={`ml-auto transition-transform duration-300 group-hover:scale-110 ${
              data.trend === 'down' ? 'text-green-500 dark:text-[#5ADF8C]' : 'text-red-500 dark:text-[#FFB4AB]'
            }`}>
              <MaterialIcon 
                name={data.trend === 'down' ? 'south_east' : 'north_east'} 
                size="base"
              />
            </span>
          </div>
          <span className="text-gray-500 dark:text-[#C3C5D7]/70 text-[10px] font-medium font-['Inter'] uppercase leading-4 tracking-widest">
            ESTIMATED MONTHLY COST
          </span>
        </div>

        {/* EFFICIENCY BAR */}
        <EfficiencyBar value={data.efficiency} isVisible={isVisible} />

        {/* METRICS */}
        <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-2">
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
      <div className="self-stretch pt-6 flex flex-col justify-start items-start">
        <div className="self-stretch pt-4 pb-[2.50px] opacity-0 group-hover:opacity-100 border-t border-gray-200 dark:border-[#434654] group-hover:border-blue-400 dark:group-hover:border-[#B5C4FF]/50 flex flex-col justify-start items-center transition-all duration-300">
          <span className="text-blue-600 dark:text-[#B5C4FF] text-[10px] font-bold font-['Inter'] uppercase leading-4 tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
            CLICK FOR FULL ANALYSIS
          </span>
        </div>
      </div>
    </motion.article>
  );
};