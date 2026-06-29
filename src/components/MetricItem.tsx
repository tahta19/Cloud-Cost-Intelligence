interface MetricItemProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

export const MetricItem: React.FC<MetricItemProps> = ({ icon, label, value, color }) => {
  return (
    <div className="self-stretch inline-flex justify-between items-center">
      <div className="flex justify-start items-center gap-2.5">
        <span className="text-base" style={{ color }}>{icon}</span>
        <span className="text-slate-300 text-sm font-normal font-['Inter'] leading-5">{label}</span>
      </div>
      <span className="text-neutral-200 text-sm font-semibold font-['Inter'] leading-5">{value}</span>
    </div>
  );
};