interface StatusBadgeProps {
  status: 'Active' | 'Warning' | 'Critical';
}

const statusStyles = {
  Active: 'bg-green-400/10 text-green-400 border-green-400/20',
  Warning: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  Critical: 'bg-red-300/10 text-red-300 border-red-300/20',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${statusStyles[status]}`}>
      {status}
    </span>
  );
};