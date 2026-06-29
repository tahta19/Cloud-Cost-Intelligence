import { useState, useRef, useEffect } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'cost-desc', label: 'Cost: High to Low' },
  { value: 'cost-asc', label: 'Cost: Low to High' },
  { value: 'efficiency', label: 'Efficiency' },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = sortOptions.find(opt => opt.value === value)?.label || 'Cost: High to Low';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5
          bg-gray-100 dark:bg-[#1A1B1E]/80
          backdrop-blur-[6px]
          border border-gray-300 dark:border-[#434654]
          rounded-lg
          hover:border-blue-400 dark:hover:border-[#B5C4FF]/50
          hover:bg-gray-50 dark:hover:bg-[#1E1F23]/80
          hover:shadow-md
          transition-all duration-200
          text-gray-900 dark:text-[#E3E2E4] text-sm font-medium
          ${isOpen ? 'border-blue-400 dark:border-[#B5C4FF]/50 bg-gray-50 dark:bg-[#1E1F23] shadow-md' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-gray-700 dark:text-[#C3C5D7] text-sm font-normal">Sort by:</span>
        <span className="text-gray-900 dark:text-[#E3E2E4] font-medium">{selectedLabel}</span>
        <MaterialIcon 
          name={isOpen ? 'expand_less' : 'expand_more'} 
          size="base"
          className={`text-gray-700 dark:text-[#C3C5D7] transition-all duration-300 ${isOpen ? 'rotate-180 text-blue-600 dark:text-[#B5C4FF]' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="
          absolute top-full left-0 mt-1.5 w-full min-w-[200px]
          bg-white dark:bg-[#1E1F23]/95
          backdrop-blur-[12px]
          border border-gray-200 dark:border-[#434654]
          rounded-lg
          shadow-lg dark:shadow-xl shadow-black/10 dark:shadow-black/50
          overflow-hidden
          z-50
          animate-in fade-in slide-in-from-top-2 duration-200
        ">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2.5
                text-left text-sm
                transition-all duration-150
                hover:bg-gray-100 dark:hover:bg-[#292A2C]/50
                hover:pl-6
                flex items-center justify-between
                ${value === option.value ? 'text-blue-600 dark:text-[#B5C4FF] bg-blue-50 dark:bg-[#B5C4FF]/5' : 'text-gray-900 dark:text-[#E3E2E4]'}
              `}
              role="option"
              aria-selected={value === option.value}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <MaterialIcon name="check" size="base" className="text-blue-600 dark:text-[#B5C4FF]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};