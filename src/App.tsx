import { useState, useEffect } from 'react';
import { FeatureSection } from './components/FeatureSection';
import { MaterialIcon } from './components/MaterialIcon';
import './index.css';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    console.log('Dark class exists:', document.documentElement.classList.contains('dark'));
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle clicked, current dark mode:', isDark);
    setIsDark(!isDark);
  };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Dark/Light Toggle Button dengan Material Icon */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <MaterialIcon
          name={isDark ? 'light_mode' : 'dark_mode'}
          size="lg"
          className="text-gray-900 dark:text-white"
        />
      </button>

      <FeatureSection />
    </main>
  );
}

export default App;