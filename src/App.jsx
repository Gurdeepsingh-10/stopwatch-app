// src/App.jsx
import { useState } from 'react';
import StopwatchApp from './StopwatchApp';
import PomodoroApp from './PomodoroApp';
import { useTheme } from './ThemeContext.jsx';

function App() {
  const [mode, setMode] = useState('stopwatch');
  const { themeIndex, setThemeIndex } = useTheme();
  console.log('App themeIndex:', themeIndex); // Debug log

  const themes = [
    { bgColor: 'bg-slate-50', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-sky-500' },    // Sky
    { bgColor: 'bg-gray-900', lightBg: 'bg-gray-800', darkBg: 'bg-gray-900', activeBg: 'bg-violet-600' },    // Violet
    { bgColor: 'bg-gray-50', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-emerald-600' },     // Emerald
    { bgColor: 'bg-stone-900', lightBg: 'bg-stone-800', darkBg: 'bg-stone-900', activeBg: 'bg-amber-600' },   // Amber
    { bgColor: 'bg-gray-100', lightBg: 'bg-white', darkBg: 'bg-gray-800', activeBg: 'bg-rose-600' },    // Rose
    { bgColor: 'bg-pink-50', lightBg: 'bg-cream-100', darkBg: 'bg-cream-200', activeBg: 'bg-pink-400' },     // Pinky Puff
    { bgColor: 'bg-purple-900', lightBg: 'bg-purple-800', darkBg: 'bg-purple-900', activeBg: 'bg-purple-500' },  // Midnight Marshmallow
  ];

  const currentTheme = themes[themeIndex] || themes[3]; // Fallback to Amber
  const switcherBg = currentTheme.lightBg;
  const switcherDarkBg = currentTheme.darkBg;
  const activeButtonBg = currentTheme.activeBg;

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
    </div>
  );
}

export default App;