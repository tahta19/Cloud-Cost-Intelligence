interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = ['All', 'Active', 'Warning', 'Critical'];

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="p-1 bg-gray-100 dark:bg-[#1A1B1E] rounded-lg border border-gray-200 dark:border-[#434654] flex justify-start items-start" role="tablist">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`
            px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200
            ${activeFilter === filter
              ? 'bg-white dark:bg-[#1E1F23] text-gray-900 dark:text-[#E3E2E4] shadow-sm'
              : 'text-gray-600 dark:text-[#C3C5D7] hover:text-gray-900 dark:hover:text-[#E3E2E4] hover:bg-white/50 dark:hover:bg-[#1E1F23]/50'
            }
          `}
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