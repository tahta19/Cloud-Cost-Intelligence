import { MaterialIcon } from './MaterialIcon';

interface StatusBadgeProps {
  status: 'Active' | 'Warning' | 'Critical';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    Active: {
      color: 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-[#5ADF8C]',
      icon: 'check_circle',
      className: 'active',
    },
    Warning: {
      color: 'bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-[#F9BD22]',
      icon: 'warning',
      className: 'warning',
    },
    Critical: {
      color: 'bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-[#FFB4AB]',
      icon: 'error',
      className: 'critical',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`status-badge ${config.className} inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <MaterialIcon name={config.icon} size="sm" />
      <span>{status}</span>
    </div>
  );
};