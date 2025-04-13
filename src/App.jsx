// src/App.jsx
import { useState } from 'react';
import StopwatchApp from './StopwatchApp';
import PomodoroApp from './PomodoroApp';

function App() {
  const [mode, setMode] = useState('stopwatch');

  return (
    <div className="min-h-screen">
      <div className="flex justify-center mb-8 pt-4">
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