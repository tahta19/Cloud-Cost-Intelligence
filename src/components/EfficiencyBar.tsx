import { motion } from 'framer-motion';

interface EfficiencyBarProps {
  value: number;
  isVisible: boolean;
}

export const EfficiencyBar: React.FC<EfficiencyBarProps> = ({ value, isVisible }) => {
  const getColor = (val: number) => {
    if (val < 40) return '#f87171'; // red-300
    if (val < 70) return '#fbbf24'; // amber-400
    return '#34d399'; // green-400
  };

  const color = getColor(value);
  const textColor = value < 40 ? 'text-red-300' : value < 70 ? 'text-amber-400' : 'text-green-400';

  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-2">
      <div className="self-stretch inline-flex justify-between items-start">
        <span className="text-slate-300 text-xs font-medium font-['Inter'] leading-4">
          Efficiency Score
        </span>
        <span className={`${textColor} text-xs font-medium font-['Inter'] leading-4`}>
          {value}%
        </span>
      </div>
      <div className="self-stretch h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  );
};