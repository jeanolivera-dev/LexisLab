import React from 'react';
import { QuestionMarkCircleIcon } from '../constants';

interface HelpButtonProps {
  onClick: () => void;
  className?: string;
}

export const HelpButton: React.FC<HelpButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors duration-200 ${className}`}
      aria-label="Ajuda"
      title="Ajuda"
    >
      <QuestionMarkCircleIcon className="h-6 w-6" />
    </button>
  );
};
