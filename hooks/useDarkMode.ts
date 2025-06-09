import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode(): [string, () => void] {
  const [theme, setTheme] = useLocalStorage<string>('theme', () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default if window is not available (SSR, etc.)
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return [theme, toggleTheme];
}
