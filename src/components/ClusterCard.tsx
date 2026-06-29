import { motion } from 'framer-motion';
import type { ClusterData } from '../types/cluster';
import { StatusBadge } from './StatusBadge';
import { EfficiencyBar } from './EfficiencyBar';
import { MetricItem } from './MetricItem';
import { MaterialIcon } from './MaterialIcon';

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

  const metrics = data.metrics || { cpu: '0%', ram: '0GB', storage: '0TB', network: '0Mbps', gpu: '0x' };

  // ✅ FIX: Gunakan `as const` atau definisikan di sini
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 120,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      className="group bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 hover:border-[var(--color-accent-primary)]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px]"
      role="button"
      tabIndex={0}
      aria-label={`${data.title}: Cost $${data.cost}, Status ${data.status}`}
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        <div className="self-stretch inline-flex justify-between items-center">
          <h3 className="text-[var(--color-text-primary)] text-sm font-semibold font-['Inter'] leading-5 tracking-tight group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">
            {data.title}
          </h3>
          <StatusBadge status={data.status} />
        </div>

        {/* COST */}
        <div className="self-stretch pb-[1.50px] flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <span className="text-[var(--color-text-primary)] text-5xl font-bold font-['Inter'] leading-[1.1] tracking-tight group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">$</span>
            <span className="text-[var(--color-text-primary)] text-5xl font-bold font-['Inter'] leading-[1.1] tracking-tight group-hover:text-[var(--color-accent-primary)] transition-colors duration-300">
              {data.cost}
            </span>
            <span className={`ml-auto transition-transform duration-300 group-hover:scale-110 ${
              data.trend === 'down' ? 'text-[var(--color-accent-success)]' : 'text-[var(--color-accent-error)]'
            }`}>
              <MaterialIcon
                name={data.trend === 'down' ? 'south_east' : 'north_east'}
                size="base"
              />
            </span>
          </div>
          <span className="text-[var(--color-text-muted)] text-[10px] font-medium font-['Inter'] uppercase leading-4 tracking-widest">
            ESTIMATED MONTHLY COST
          </span>
        </div>

        {/* EFFICIENCY BAR */}
        <EfficiencyBar value={data.efficiency} isVisible={isVisible} />

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
          <span className="text-[var(--color-accent-primary)] text-[10px] font-bold font-['Inter'] uppercase leading-4 tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
            CLICK FOR FULL ANALYSIS
          </span>
        </div>
      </div>
    </motion.article>
  );
};