import { MaterialIcon } from './MaterialIcon';

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
        <MaterialIcon 
          name={icon} 
          size="base" 
          className="text-text-secondary"
          style={{ color }}
        />
        <span className="text-text-secondary text-sm font-medium font-['Inter'] leading-5 tracking-wide">
          {label}
        </span>
      </div>
      <span className="text-text-primary text-sm font-semibold font-['Inter'] leading-5">{value}</span>
    </div>
  );
};