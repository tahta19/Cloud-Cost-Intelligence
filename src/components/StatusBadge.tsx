interface StatusBadgeProps {
  status?: 'Active' | 'Warning' | 'Critical';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status = 'Active' }) => {
  const styles = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-400/20 group-hover:bg-green-200 dark:group-hover:bg-green-500/20 transition-all duration-300',
    Warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400/20 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-500/20 transition-all duration-300',
    Critical: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-400/20 group-hover:bg-red-200 dark:group-hover:bg-red-500/20 transition-all duration-300',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status]}`}>
      {status}
    </span>
  );
};