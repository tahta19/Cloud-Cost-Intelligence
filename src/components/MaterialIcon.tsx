import React from 'react';

interface MaterialIconProps {
  name: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
}

const sizeClasses = {
  sm: 'text-[14px] w-[14px] h-5',
  base: 'text-base w-4 h-5',
  lg: 'text-xl w-5 h-7',
  xl: 'text-2xl w-6 h-7',
  '2xl': 'text-3xl w-[30px] h-9',
  '3xl': 'text-4xl w-9 h-10',
  '4xl': 'text-[40px] w-9 h-10',
};

export const MaterialIcon = ({ 
  name, 
  size = 'base', 
  className = '',
  style = {},
  'aria-hidden': ariaHidden = true 
}: MaterialIconProps) => {
  return (
    <span
      className={`
        font-['Material_Symbols_Outlined']
        font-normal
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${className}
      `}
      style={style}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  );
};