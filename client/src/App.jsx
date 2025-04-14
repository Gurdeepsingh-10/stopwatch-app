// client/src/App.jsx
import { useState } from 'react';
import StopwatchApp from './StopwatchApp';
import PomodoroApp from './PomodoroApp';
import TimerApp from './TimerApp';
import About from './About.jsx';
import { useTheme } from './ThemeContext.jsx';
import { Info } from 'lucide-react';

function App() {
  const [mode, setMode] = useState('stopwatch');
  const { themeIndex, setThemeIndex } = useTheme();
  const [showAbout, setShowAbout] = useState(false);

  const themes = [
    { bgColor: 'bg-slate-50', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-sky-500', accentLight: 'bg-sky-50' },
    { bgColor: 'bg-gray-900', lightBg: 'bg-gray-800', darkBg: 'bg-gray-900', activeBg: 'bg-violet-600', accentLight: 'bg-violet-900 bg-opacity-30' },
    { bgColor: 'bg-gray-50', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-emerald-600', accentLight: 'bg-emerald-50' },
    { bgColor: 'bg-stone-900', lightBg: 'bg-stone-800', darkBg: 'bg-stone-900', activeBg: 'bg-amber-600', accentLight: 'bg-amber-900 bg-opacity-30' },
    { bgColor: 'bg-gray-100', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-rose-600', accentLight: 'bg-rose-50' },
    { bgColor: 'bg-pink-50', lightBg: 'bg-cream-100', darkBg: 'bg-cream-200', activeBg: 'bg-pink-400', accentLight: 'bg-pink-100' },
    { bgColor: 'bg-purple-900', lightBg: 'bg-purple-800', darkBg: 'bg-purple-900', activeBg: 'bg-purple-500', accentLight: 'bg-purple-900 bg-opacity-20' },
  ];

  const currentTheme = themes[themeIndex] || themes[3];
  const switcherBg = currentTheme.lightBg;
  const switcherDarkBg = currentTheme.darkBg;
  const activeButtonBg = currentTheme.activeBg;

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className={`min-h-screen ${currentTheme.bgColor} transition-colors duration-500`}>
      {/* Navigation Bar */}
      <nav className={`w-full ${currentTheme.lightBg} p-4 shadow-md flex justify-between items-center`}>
        <div className="flex space-x-4">
          <button
            onClick={() => setMode('stopwatch')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              mode === 'stopwatch' ? `${activeButtonBg} text-white` : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => setMode('pomodoro')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              mode === 'pomodoro' ? `${activeButtonBg} text-white` : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => setMode('timer')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              mode === 'timer' ? `${activeButtonBg} text-white` : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Timer
          </button>
        </div>
        <div className="flex space-x-4">
          {/* No auth buttons */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative">
        {mode === 'stopwatch' ? <StopwatchApp /> : mode === 'pomodoro' ? <PomodoroApp /> : <TimerApp />}
      </div>

      {/* About Button and Section */}
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