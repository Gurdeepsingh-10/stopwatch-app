// src/App.jsx
import { useState } from 'react';
import StopwatchApp from './StopwatchApp';
import PomodoroApp from './PomodoroApp';
import About from './About.jsx'; // Import the new About component
import { useTheme } from './ThemeContext.jsx';
import { Info } from 'lucide-react';

function App() {
  const [mode, setMode] = useState('stopwatch');
  const { themeIndex, setThemeIndex } = useTheme();
  console.log('App themeIndex:', themeIndex); // Debug log
  const [showAbout, setShowAbout] = useState(false); // State to toggle About section

  const themes = [
    { bgColor: 'bg-slate-50', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-sky-500' },
    { bgColor: 'bg-gray-900', lightBg: 'bg-gray-800', darkBg: 'bg-gray-900', activeBg: 'bg-violet-600' },
    { bgColor: 'bg-gray-50', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-emerald-600' },
    { bgColor: 'bg-stone-900', lightBg: 'bg-stone-800', darkBg: 'bg-stone-900', activeBg: 'bg-amber-600' },
    { bgColor: 'bg-gray-100', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-rose-600' },
    { bgColor: 'bg-pink-50', lightBg: 'bg-cream-100', darkBg: 'bg-cream-200', activeBg: 'bg-pink-400' },
    { bgColor: 'bg-purple-900', lightBg: 'bg-purple-800', darkBg: 'bg-purple-900', activeBg: 'bg-purple-500' },
  ];

  const currentTheme = themes[themeIndex] || themes[3]; // Fallback to Amber
  const switcherBg = currentTheme.lightBg;
  const switcherDarkBg = currentTheme.darkBg;
  const activeButtonBg = currentTheme.activeBg;

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className={`min-h-screen ${currentTheme.bgColor} transition-colors duration-500`} style={{ backgroundColor: currentTheme.bgColor.replace('bg-', '#') }}>
      <div className="flex justify-center mb-1 pt-0.5">
        <div className={`flex space-x-4 ${switcherBg} dark:${switcherDarkBg} rounded-full p-1 shadow-lg`}>
          <button
            onClick={() => setMode('stopwatch')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              mode === 'stopwatch' ? `${activeButtonBg} text-white` : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => setMode('pomodoro')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              mode === 'pomodoro' ? `${activeButtonBg} text-white` : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Pomodoro
          </button>
        </div>
      </div>
      {mode === 'stopwatch' ? <StopwatchApp /> : <PomodoroApp />}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={toggleAbout}
          className={`fixed bottom-4 right-4 p-3 rounded-full ${currentTheme.lightBg} shadow-lg transition-transform duration-300 hover:scale-110 ${currentTheme.isDark ? 'text-white' : 'text-gray-700'}`}
          aria-label="About the App"
        >
          <Info size={20} />
        </button>
        {showAbout && <About />}
      </div>
    </div>
  );
}

export default App;