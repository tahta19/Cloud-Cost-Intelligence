interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex justify-start items-center gap-3">
      <span className="text-slate-300 text-sm font-normal font-['Inter'] leading-5">Sort by:</span>
      <div className="p-2.5 relative bg-neutral-800 rounded-lg border border-gray-700">
        <select
          className="bg-transparent text-neutral-200 text-sm font-normal font-['Inter'] leading-5 outline-none pr-8"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="cost-desc">Cost: High to Low</option>
          <option value="cost-asc">Cost: Low to High</option>
          <option value="efficiency">Efficiency</option>
        </select>
      </div>
    </div>
  );
};