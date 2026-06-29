import { motion } from 'framer-motion';
import type { ClusterData } from '../types/cluster';

interface ClusterCardProps {
  data: ClusterData;
  index: number;
  isVisible: boolean;
}

export const ClusterCard: React.FC<ClusterCardProps> = ({ data, index, isVisible }) => {
  if (!data) {
    console.warn('ClusterCard: data is undefined');
    return null;
  }

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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'Warning': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'Critical': return 'bg-red-300/10 text-red-300 border-red-300/20';
      default: return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  const getEfficiencyColor = (val: number) => {
    if (val < 40) return '#f87171';
    if (val < 70) return '#fbbf24';
    return '#34d399';
  };

  const getEfficiencyTextColor = (val: number) => {
    if (val < 40) return 'text-red-300';
    if (val < 70) return 'text-amber-400';
    return 'text-green-400';
  };

  const metrics = data.metrics || { cpu: '0%', ram: '0GB', storage: '0TB', network: '0Mbps', gpu: '0x' };
  const effColor = getEfficiencyColor(data.efficiency || 0);
  const effTextColor = getEfficiencyTextColor(data.efficiency || 0);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex-1 p-6 bg-neutral-800/60 backdrop-blur-[6px] rounded-2xl border border-gray-700/30 hover:border-violet-300/40 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[420px]"
      role="button"
      tabIndex={0}
      aria-label={`${data.title || 'Cluster'}: Cost $${data.cost || 0}, Status ${data.status || 'Unknown'}`}
    >
      {/* HEADER */}
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        <div className="self-stretch inline-flex justify-between items-center">
          <h3 className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">
            {data.title || 'Unknown Cluster'}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(data.status || 'Active')}`}>
            {data.status || 'Active'}
          </span>
        </div>

        {/* COST */}
        <div className="self-stretch pb-[1.50px] flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <span className="text-neutral-200 text-4xl font-bold font-['Inter'] leading-10">$</span>
            <span className="text-neutral-200 text-4xl font-bold font-['Inter'] leading-10">
              {data.cost || 0}
            </span>
            <div className={`w-3 h-3 ${data.trend === 'down' ? 'bg-green-400' : 'bg-red-300'}`} />
          </div>
          <span className="text-slate-300/70 text-xs font-medium font-['Inter'] uppercase leading-4 tracking-wide">
            ESTIMATED MONTHLY COST
          </span>
        </div>

        {/* EFFICIENCY BAR - LANGSUNG DI SINI */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="self-stretch inline-flex justify-between items-start">
            <span className="text-slate-300 text-xs font-medium font-['Inter'] leading-4">
              Efficiency Score
            </span>
            <span className={`${effTextColor} text-xs font-medium font-['Inter'] leading-4`}>
              {data.efficiency || 0}%
            </span>
          </div>
          <div className="self-stretch h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: effColor }}
              initial={{ width: 0 }}
              animate={{ width: isVisible ? `${data.efficiency || 0}%` : 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>

        {/* METRICS - LANGSUNG DI SINI */}
        <div className="self-stretch pt-2 flex flex-col justify-start items-start gap-3.5">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-2.5">
              <span className="text-base text-blue-400">⚡</span>
              <span className="text-slate-300 text-sm font-normal font-['Inter'] leading-5">CPU</span>
            </div>
            <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{metrics.cpu || '0%'}</span>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-2.5">
              <span className="text-base text-purple-400">💾</span>
              <span className="text-slate-300 text-sm font-normal font-['Inter'] leading-5">RAM</span>
            </div>
            <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{metrics.ram || '0GB'}</span>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-2.5">
              <span className="text-base text-green-400">📦</span>
              <span className="text-slate-300 text-sm font-normal font-['Inter'] leading-5">Storage</span>
            </div>
            <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{metrics.storage || '0TB'}</span>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-2.5">
              <span className="text-base text-cyan-400">🌐</span>
              <span className="text-slate-300 text-sm font-normal font-['Inter'] leading-5">Network</span>
            </div>
            <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{metrics.network || '0Mbps'}</span>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-2.5">
              <span className="text-base text-orange-400">🎮</span>
              <span className="text-slate-300 text-sm font-normal font-['Inter'] leading-5">GPU</span>
            </div>
            <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{metrics.gpu || '0x'}</span>
          </div>
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