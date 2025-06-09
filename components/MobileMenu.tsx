import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';
// HelpButton import removed as it's no longer used here
import { XMarkIcon, FONT_BODY, QuestionMarkCircleIcon } from '../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onHelpClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onHelpClick }) => {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-30 md:hidden ${FONT_BODY}`} 
      onClick={onClose} 
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm dark:bg-black/50 transition-opacity duration-300 ease-in-out" aria-hidden="true"></div>
      
      {/* Menu Panel */}
      <div 
        className="fixed top-0 right-0 h-full w-64 bg-content-bg-light dark:bg-content-bg-dark shadow-xl p-5 transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()} // Prevent close on click inside
      >
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Fechar menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-4">
          <div className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            <span className="text-text-light-primary dark:text-text-dark-primary">Tema Escuro</span>
            <DarkModeToggle />
          </div>
          <button
            onClick={onHelpClick}
            className="w-full flex items-center justify-start text-left space-x-3 px-2 py-3 rounded-md text-text-light-primary dark:text-text-dark-primary hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors duration-150"
            aria-label="Abrir central de ajuda"
          >
            <QuestionMarkCircleIcon className="h-6 w-6 text-slate-500 dark:text-slate-400 flex-shrink-0" />
            <span>Ajuda</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
