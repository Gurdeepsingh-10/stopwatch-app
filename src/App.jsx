// src/App.jsx
import { useState } from 'react';
import StopwatchApp from './StopwatchApp';
import PomodoroApp from './PomodoroApp';
import { useTheme } from './ThemeContext.jsx';

function App() {
  const [mode, setMode] = useState('stopwatch');
  const { themeIndex } = useTheme();
  console.log('App themeIndex:', themeIndex); // Debug log

  const themes = [
    { bgColor: 'bg-slate-50' },    // Sky
    { bgColor: 'bg-gray-900' },    // Violet
    { bgColor: 'bg-gray-50' },     // Emerald
    { bgColor: 'bg-stone-900' },   // Amber
    { bgColor: 'bg-gray-100' },    // Rose
  ];

  const currentBgColor = themes[themeIndex] ? themes[themeIndex].bgColor : 'bg-stone-900';

  return (
    <div className={`min-h-screen ${currentBgColor} transition-colors duration-500`} style={{ backgroundColor: currentBgColor.replace('bg-', '#') }}>
      <div className="flex justify-center mb-1 pt-0.5">
        <div className="flex space-x-4 bg-gray-100 dark:bg-gray-800 rounded-full p-1 shadow-lg">
          <button
            onClick={() => setMode('stopwatch')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              mode === 'stopwatch' ? 'bg-sky-500 text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => setMode('pomodoro')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              mode === 'pomodoro' ? 'bg-sky-500 text-white' : 'text-gray-600 dark:text-gray-300'
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