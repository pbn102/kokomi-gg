import React from 'react';

interface ChevronDownProps {
  isOpen: boolean;
}

const ChevronDown: React.FC<ChevronDownProps> = ({ isOpen }) => {
  return (
    <svg
      className={`w-4 h-4 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 9l-7 7-7-7"></path>
    </svg>
  );
};

export default ChevronDown;
