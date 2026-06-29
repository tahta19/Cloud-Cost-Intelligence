import { motion } from 'framer-motion';
import { MaterialIcon } from './MaterialIcon';

interface KPICardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
  index: number;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  color,
  bgColor,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white dark:bg-[#1E1F23] rounded-2xl p-5 border border-gray-200 dark:border-[#434654] shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl ${bgColor}`}>
          <MaterialIcon name={icon} size="lg" className={color} />
        </div>
        <span className="text-3xl font-bold text-gray-900 dark:text-[#E3E2E4]">
          {value}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-[#C3C5D7] mt-3 font-medium">
        {title}
      </p>
    </motion.div>
  );
};