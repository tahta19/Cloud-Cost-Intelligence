import { motion } from 'framer-motion';

interface EfficiencyBarProps {
  value: number;
  isVisible: boolean;
}

export const EfficiencyBar: React.FC<EfficiencyBarProps> = ({ value, isVisible }) => {
  const getColor = (val: number) => {
    if (val < 40) return '#ef4444';
    if (val < 70) return '#eab308';
    return '#22c55e';
  };

  const color = getColor(value);
  
  const textColor = value < 40 
    ? 'text-red-700 dark:text-[#FFB4AB]' 
    : value < 70 
      ? 'text-yellow-700 dark:text-[#F9BD22]' 
      : 'text-green-700 dark:text-[#5ADF8C]';

  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-2">
      <div className="self-stretch inline-flex justify-between items-start">
        <span className="text-gray-700 dark:text-[#C3C5D7] text-xs font-medium font-['Inter'] leading-4">
          Efficiency Score
        </span>
        <span className={`${textColor} text-xs font-semibold font-['Inter'] leading-4`}>
          {value}%
        </span>
      </div>
      <div className="self-stretch h-1.5 bg-gray-200 dark:bg-[#1A1B1E] rounded-full overflow-hidden">
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