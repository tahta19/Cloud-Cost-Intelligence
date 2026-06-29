interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = ['All', 'Active', 'Warning', 'Critical'];

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="p-1 bg-neutral-800 rounded-lg border border-gray-700 flex justify-start items-start" role="tablist">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            activeFilter === filter
              ? 'bg-zinc-800 text-neutral-200 shadow-sm'
              : 'text-slate-300 hover:text-neutral-200'
          }`}
          onClick={() => onFilterChange(filter)}
          role="tab"
          aria-selected={activeFilter === filter}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};