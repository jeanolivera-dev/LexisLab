import React, { useState } from 'react';
import { AppTitle, MenuIcon, XMarkIcon } from '../constants';
import { DarkModeToggle } from './DarkModeToggle';
import { HelpButton } from './HelpButton';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  onHelpClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-content-bg-light dark:bg-content-bg-dark shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
          <AppTitle className="text-xl md:text-2xl" />
          
          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-3">
            <DarkModeToggle />
            <HelpButton onClick={onHelpClick} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onHelpClick={() => {
          onHelpClick();
          setIsMobileMenuOpen(false); // Close menu after clicking help
        }} 
      />
    </>
  );
};
