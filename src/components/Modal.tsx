import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MaterialIcon } from './MaterialIcon';
import type { ReactNode } from 'react';
import type { ClusterData } from '../types/cluster';
import { StatusBadge } from './StatusBadge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`${maxWidthClasses[maxWidth]} w-full bg-white dark:bg-[#1E1F23] rounded-2xl border border-gray-200 dark:border-[#434654] shadow-2xl dark:shadow-black/50 max-h-[90vh] overflow-y-auto`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#434654] sticky top-0 bg-white dark:bg-[#1E1F23] rounded-t-2xl z-10">
                <h2
                  id="modal-title"
                  className="text-xl font-bold text-gray-900 dark:text-[#E3E2E4]"
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#292A2C] transition-colors text-gray-500 dark:text-[#C3C5D7] hover:text-gray-700 dark:hover:text-[#E3E2E4]"
                  aria-label="Close modal"
                >
                  <MaterialIcon name="close" size="lg" />
                </button>
              </div>
              <div className="p-6">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


interface ClusterModalProps {
  cluster: ClusterData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClusterModal: React.FC<ClusterModalProps> = ({
  cluster,
  isOpen,
  onClose,
}) => {
  if (!cluster) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="2xl">
      <div className="space-y-4">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {cluster.title}
            </h2>
            <span className="px-2 py-0.5 bg-gray-200 dark:bg-[#292A2C] rounded text-[10px] font-bold text-gray-600 dark:text-[#C3C5D7] uppercase tracking-wide">
              PRODUCTION
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#292A2C] transition-colors text-gray-500 dark:text-[#C3C5D7]"
          >
            <MaterialIcon name="close" size="lg" />
          </button>
        </div>

        {/* STATUS + COST + TREND */}
        <div className="p-5 bg-gray-50 dark:bg-[#1A1B1E]/50 rounded-lg border border-gray-200 dark:border-[#434654]/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <StatusBadge status={cluster.status} />
              <span className="text-xs text-gray-500 dark:text-[#C3C5D7]/70 font-mono">
                ID: {cluster.id}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-[#C3C5D7]">
              Projected Monthly Spend
            </span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${cluster.cost}
            </div>
            <div className={`flex items-center justify-end gap-1 ${
              cluster.trend === 'down' ? 'text-green-600 dark:text-[#5ADF8C]' : 'text-red-600 dark:text-[#FFB4AB]'
            }`}>
              <MaterialIcon 
                name={cluster.trend === 'down' ? 'south_east' : 'north_east'} 
                size="sm"
              />
              <span className="text-sm font-medium">
                {cluster.trend === 'down' ? '-' : '+'}12.4% Increasing
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
              cluster.efficiency > 70 ? 'text-green-600 dark:text-[#5ADF8C]' :
              cluster.efficiency > 40 ? 'text-amber-500' :
              'text-red-500'
            }`}>
              {cluster.efficiency}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-[#292A2C] rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${cluster.efficiency}%`,
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
                value: cluster.metrics.cpu, 
                detail: '32 Cores',
                color: '#3b82f6',
                bg: 'bg-blue-500'
              },
              { 
                label: 'RAM Usage', 
                value: cluster.metrics.ram, 
                detail: '128GB Total',
                color: '#8b5cf6',
                bg: 'bg-purple-500'
              },
              { 
                label: 'Storage', 
                value: cluster.metrics.storage, 
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
              { label: 'COMPUTE', value: '$' + Math.round(cluster.cost * 0.35) },
              { label: 'MEMORY', value: '$' + Math.round(cluster.cost * 0.20) },
              { label: 'STORAGE', value: '$' + Math.round(cluster.cost * 0.15) },
              { label: 'NETWORK', value: '$' + Math.round(cluster.cost * 0.10) },
              { label: 'OTHER', value: '$' + Math.round(cluster.cost * 0.20) },
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
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};