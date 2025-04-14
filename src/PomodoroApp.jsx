// src/PomodoroApp.jsx
import { useState, useEffect, useRef } from 'react';
import { Clock, Palette, Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useTheme } from './ThemeContext.jsx';

export default function PomodoroApp() {
  const { themeIndex, setThemeIndex } = useTheme();
  console.log('PomodoroApp themeIndex:', themeIndex); // Debug log

  const [time, setTime] = useState(25 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState('focus');
  const [cycle, setCycle] = useState({ focus: 4, shortBreak: 3, longBreak: 1 });
  const [customTimes, setCustomTimes] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15
  });
  const [currentCycle, setCurrentCycle] = useState(1);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio('/assets/alarm.mp3'));

  const themes = [
    {
      id: 'sky',
      name: 'Sky Blue',
      primary: 'text-sky-500',
      secondary: 'text-indigo-500',
      bgColor: 'bg-slate-50',
      cardBg: 'bg-white',
      buttonPrimary: 'bg-sky-500 hover:bg-sky-400',
      buttonSecondary: 'bg-indigo-500 hover:bg-indigo-400',
      buttonNeutral: 'bg-slate-300 hover:bg-slate-200',
      textColor: 'text-gray-800',
      accentLight: 'bg-sky-50',
      isDark: false
    },
    {
      id: 'violet',
      name: 'Violet Dream',
      primary: 'text-violet-500',
      secondary: 'text-fuchsia-500',
      bgColor: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      buttonPrimary: 'bg-violet-600 hover:bg-violet-500',
      buttonSecondary: 'bg-fuchsia-600 hover:bg-fuchsia-500',
      buttonNeutral: 'bg-gray-700 hover:bg-gray-600',
      textColor: 'text-gray-100',
      accentLight: 'bg-violet-900 bg-opacity-30',
      isDark: true
    },
    {
      id: 'emerald',
      name: 'Emerald Forest',
      primary: 'text-emerald-500',
      secondary: 'text-teal-500',
      bgColor: 'bg-gray-50',
      cardBg: 'bg-white',
      buttonPrimary: 'bg-emerald-600 hover:bg-emerald-500',
      buttonSecondary: 'bg-teal-600 hover:bg-teal-500',
      buttonNeutral: 'bg-gray-300 hover:bg-gray-200',
      textColor: 'text-gray-800',
      accentLight: 'bg-emerald-50',
      isDark: false
    },
    {
      id: 'amber',
      name: 'Amber Glow',
      primary: 'text-amber-500',
      secondary: 'text-orange-500',
      bgColor: 'bg-stone-900',
      cardBg: 'bg-stone-800',
      buttonPrimary: 'bg-amber-600 hover:bg-amber-500',
      buttonSecondary: 'bg-orange-600 hover:bg-orange-500',
      buttonNeutral: 'bg-stone-700 hover:bg-stone-600',
      textColor: 'text-stone-100',
      accentLight: 'bg-amber-900 bg-opacity-30',
      isDark: true
    },
    {
      id: 'rose',
      name: 'Rose Garden',
      primary: 'text-rose-500',
      secondary: 'text-pink-500',
      bgColor: 'bg-gray-100',
      cardBg: 'bg-white',
      buttonPrimary: 'bg-rose-600 hover:bg-rose-500',
      buttonSecondary: 'bg-pink-600 hover:bg-pink-500',
      buttonNeutral: 'bg-gray-300 hover:bg-gray-200',
      textColor: 'text-gray-800',
      accentLight: 'bg-rose-50',
      isDark: false
    },
    {
      id: 'pinkyPuff',
      name: 'Pinky Puff',
      primary: 'text-pink-400',
      secondary: 'text-rose-300',
      bgColor: 'bg-pink-50',
      cardBg: 'bg-cream-100', // Custom cream color
      buttonPrimary: 'bg-pink-400 hover:bg-pink-300',
      buttonSecondary: 'bg-rose-300 hover:bg-rose-200',
      buttonNeutral: 'bg-cream-200 hover:bg-cream-300',
      textColor: 'text-pink-800',
      accentLight: 'bg-pink-100',
      isDark: false,
      fontFamily: 'cursive',
      illustration: '🐰',
      animation: 'bounce 2s infinite'
    },
    {
      id: 'midnightMarshmallow',
      name: 'Midnight Marshmallow',
      primary: 'text-purple-300',
      secondary: 'text-lavender-200',
      bgColor: 'bg-purple-900',
      cardBg: 'bg-purple-800',
      buttonPrimary: 'bg-purple-500 hover:bg-purple-400',
      buttonSecondary: 'bg-lavender-300 hover:bg-lavender-200',
      buttonNeutral: 'bg-gray-700 hover:bg-gray-600',
      textColor: 'text-white',
      accentLight: 'bg-purple-900 bg-opacity-20',
      isDark: true,
      fontFamily: 'cursive',
      illustration: '😺',
      animation: 'float 3s infinite'
    },
  ];

  const theme = themes[themeIndex] || themes[3]; // Fallback to Amber

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 0) {
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
            handleCycleTransition();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  const handleCycleTransition = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      if (currentCycle < cycle.focus) {
        setMode('shortBreak');
        setTime(customTimes.shortBreak * 60 * 1000);
        setCurrentCycle(prev => prev + 1);
      } else {
        setMode('longBreak');
        setTime(customTimes.longBreak * 60 * 1000);
        setCurrentCycle(1);
      }
    } else {
      setMode('focus');
      setTime(customTimes.focus * 60 * 1000);
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(customTimes[mode] * 60 * 1000);
    setCurrentCycle(1);
  };

  const toggleThemePanel = () => {
    setShowThemePanel(!showThemePanel);
    setShowSettings(false);
  };

  const selectTheme = (index) => {
    setThemeIndex(index);
    setShowThemePanel(false);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    const intValue = parseInt(value) || 1;
    if (name.includes('Time')) {
      const timeKey = name.replace('Time', '');
      setCustomTimes(prev => ({
        ...prev,
        [timeKey]: intValue
      }));
      if (mode === timeKey) {
        setTime(intValue * 60 * 1000);
      }
    } else {
      setCycle(prev => ({
        ...prev,
        [name]: intValue
      }));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen ${theme.bgColor} ${theme.textColor} transition-colors duration-500 font-${theme.fontFamily || 'sans'}`}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .cute-illustration {
            animation: ${theme.animation};
            font-size: 2rem;
            position: absolute;
          }
        `}
      </style>
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center">
              <Clock className={`${theme.primary} mr-2`} size={24} />
              <h1 className={`text-2xl font-extrabold tracking-tight ${theme.primary} ${theme.fontFamily ? 'font-cursive' : ''}`}>Pomodoro 🍅</h1>
            </div>
            <button
              onClick={toggleThemePanel}
              className={`p-3 rounded-full ${theme.cardBg} shadow-lg transition-transform duration-300 hover:scale-110`}
              aria-label="Change theme"
            >
              <Palette className={theme.secondary} size={20} />
            </button>
          </div>

          <div className={`${theme.cardBg} rounded-2xl p-8 shadow-xl mb-8 relative overflow-hidden transition-all duration-500`}>
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className={`absolute w-32 h-32 rounded-full ${theme.primary} bg-current top-0 left-0 -translate-x-1/2 -translate-y-1/2 animate-pulse`}></div>
              <div className={`absolute w-40 h-40 rounded-full ${theme.secondary} bg-current bottom-0 right-0 translate-x-1/2 translate-y-1/2 animate-pulse`} style={{ animationDelay: '1s' }}></div>
              {theme.illustration && (
                <span className={`cute-illustration ${theme.primary} top-1/4 left-1/4`}>
                  {theme.illustration}
                </span>
              )}
            </div>
            <div className="relative text-center">
              <div className={`text-6xl font-mono font-bold tracking-tight mb-1 ${isRunning ? 'animate-pulse' : ''}`}>
                <span className={`${theme.primary}`}>{formatTime(time)}</span>
              </div>
              <div className={`mt-4 text-sm font-medium ${theme.secondary}`}>
                {mode === 'focus' ? 'Focus 🌱' : mode === 'shortBreak' ? 'Short Break ☕' : 'Long Break 🌙'} {currentCycle}/{cycle[mode]}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => {
                setMode('focus');
                setTime(customTimes.focus * 60 * 1000);
                setIsRunning(false);
              }}
              className={`py-3 rounded-xl font-medium ${mode === 'focus' ? theme.buttonPrimary : theme.buttonNeutral} ${theme.isDark ? 'text-white' : 'text-gray-700'} hover:scale-105 transition-all`}
            >
              Focus
            </button>
            <button
              onClick={() => {
                setMode('shortBreak');
                setTime(customTimes.shortBreak * 60 * 1000);
                setIsRunning(false);
              }}
              className={`py-3 rounded-xl font-medium ${mode === 'shortBreak' ? theme.buttonPrimary : theme.buttonNeutral} ${theme.isDark ? 'text-white' : 'text-gray-700'} hover:scale-105 transition-all`}
            >
              Short Break
            </button>
            <button
              onClick={() => {
                setMode('longBreak');
                setTime(customTimes.longBreak * 60 * 1000);
                setIsRunning(false);
              }}
              className={`py-3 rounded-xl font-medium ${mode === 'longBreak' ? theme.buttonPrimary : theme.buttonNeutral} ${theme.isDark ? 'text-white' : 'text-gray-700'} hover:scale-105 transition-all`}
            >
              Long Break
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleStartStop}
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${theme.buttonPrimary} hover:scale-105`}
            >
              {isRunning ? <Pause size={20} className="mr-1" /> : <Play size={20} className="mr-1" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setShowThemePanel(false);
              }}
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${theme.buttonSecondary} hover:scale-105`}
            >
              <Settings size={20} className="mr-1" />
              Settings
            </button>
            <button
              onClick={handleReset}
              className={`col-span-1 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${theme.buttonNeutral} ${theme.isDark ? 'text-white' : 'text-gray-700'} hover:scale-105`}
            >
              <RotateCcw size={20} className="mr-1" />
              Reset
            </button>
          </div>

          {showThemePanel && (
            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl mb-8 transition-all duration-500 animate-fade-in`}>
              <h2 className={`text-xl font-bold ${theme.primary} mb-4 ${theme.fontFamily ? 'font-cursive' : ''}`}>Pick a Theme! </h2>
              <div className="grid grid-cols-1 gap-2">
                {themes.map((themeOption, index) => (
                  <button
                    key={themeOption.id}
                    onClick={() => selectTheme(index)}
                    className={`flex items-center py-3 px-4 rounded-lg hover:${themeOption.accentLight} transition-colors ${
                      index === themeIndex ? `${themeOption.accentLight} font-medium` : ''
                    } ${themeOption.fontFamily ? 'font-cursive' : ''}`}
                  >
                    <div className="flex space-x-1 mr-3">
                      <div className={`w-4 h-4 rounded-full bg-current ${themeOption.primary}`}></div>
                      <div className={`w-4 h-4 rounded-full bg-current ${themeOption.secondary}`}></div>
                    </div>
                    <span>{themeOption.name} </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showSettings && (
            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl mb-8 transition-all duration-500`}>
              <h2 className={`text-xl font-bold ${theme.primary} mb-4 ${theme.fontFamily ? 'font-cursive' : ''}`}>Pomodoro Settings 🛠️</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Focus Time (minutes)</label>
                  <input
                    type="number"
                    name="focusTime"
                    value={customTimes.focus}
                    onChange={handleSettingsChange}
                    min="1"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Short Break (minutes)</label>
                  <input
                    type="number"
                    name="shortBreakTime"
                    value={customTimes.shortBreak}
                    onChange={handleSettingsChange}
                    min="1"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Long Break (minutes)</label>
                  <input
                    type="number"
                    name="longBreakTime"
                    value={customTimes.longBreak}
                    onChange={handleSettingsChange}
                    min="1"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Focus Cycles</label>
                  <input
                    type="number"
                    name="focus"
                    value={cycle.focus}
                    onChange={handleSettingsChange}
                    min="1"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Short Break Cycles</label>
                  <input
                    type="number"
                    name="shortBreak"
                    value={cycle.shortBreak}
                    onChange={handleSettingsChange}
                    min="1"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Long Break Cycles</label>
                  <input
                    type="number"
                    name="longBreak"
                    value={cycle.longBreak}
                    onChange={handleSettingsChange}
                    min="1"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Rest of the file (formatTime function and useEffect logic) remains unchanged