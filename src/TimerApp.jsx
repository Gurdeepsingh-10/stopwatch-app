// client/src/TimerApp.jsx
import { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Palette, Settings } from 'lucide-react'; // Removed Plus import
import { useTheme } from './ThemeContext.jsx';

export default function TimerApp() {
  const { themeIndex, setThemeIndex } = useTheme();
  console.log('TimerApp themeIndex:', themeIndex); // Debug log

  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [settings, setSettings] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef(null);

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
      isDark: false,
      illustration: null
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
      isDark: true,
      illustration: null
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
      isDark: false,
      illustration: null
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
      isDark: true,
      illustration: null
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
      isDark: false,
      illustration: null
    },
    {
      id: 'pinkyPuff',
      name: 'Pinky Puff',
      primary: 'text-pink-400',
      secondary: 'text-rose-300',
      bgColor: 'bg-pink-50',
      cardBg: 'bg-cream-100',
      buttonPrimary: 'bg-pink-400 hover:bg-pink-300',
      buttonSecondary: 'bg-rose-300 hover:bg-rose-200',
      buttonNeutral: 'bg-cream-200 hover:bg-cream-300',
      textColor: 'text-pink-800',
      accentLight: 'bg-pink-100',
      isDark: false,
      fontFamily: 'cursive',
      illustration: null
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
      illustration: null
    },
  ];

  const theme = themes[themeIndex] || themes[3]; // Fallback to Amber

  // Calculate total time in milliseconds from settings
  const calculateTotalTime = () => {
    const { hours, minutes, seconds } = settings;
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  // Format milliseconds to hh:mm:ss
  const formatTime = (timeMs) => {
    const totalSeconds = Math.floor(timeMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleStartStop = () => {
    if (!isRunning && time <= 0) {
      setTime(calculateTotalTime()); // Set initial time from settings
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(calculateTotalTime());
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    const intValue = Math.max(0, parseInt(value) || 0); // Ensure non-negative
    setSettings(prev => ({
      ...prev,
      [name]: intValue
    }));
    if (!isRunning) {
      setTime(calculateTotalTime());
    }
  };

  const increaseTime = (minutes) => {
    if (isRunning && time > 0) {
      setTime(prevTime => prevTime + minutes * 60 * 1000); // Add extra time
    }
  };

  const toggleThemePanel = () => {
    setShowThemePanel(!showThemePanel);
    setShowSettings(false);
  };

  const selectTheme = (index) => {
    setThemeIndex(index);
    setShowThemePanel(false);
  };

  return (
    <div className={`min-h-screen ${theme.bgColor} ${theme.textColor} transition-colors duration-500 font-${theme.fontFamily || 'sans'}`}>
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center">
              <Clock className={`${theme.primary} mr-2`} size={24} />
              <h1 className={`text-2xl font-extrabold tracking-tight ${theme.primary} ${theme.fontFamily ? 'font-cursive' : ''}`}>Timer ⏰</h1>
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
            <div className="relative text-center">
              <div className={`text-6xl font-mono font-bold tracking-tight mb-1 ${isRunning && time > 0 ? 'animate-pulse' : ''}`}>
                <span className={theme.primary}>
                  {formatTime(time)}
                </span>
              </div>
              <div className={`mt-4 text-sm font-medium ${isRunning ? theme.secondary : 'text-gray-500'}`}>
                {isRunning ? 'Running' : 'Stopped'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleStartStop}
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${theme.buttonPrimary} hover:scale-105`}
              disabled={time <= 0}
            >
              {isRunning ? <Pause size={20} className="mr-1" /> : <Play size={20} className="mr-1" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => { setShowSettings(!showSettings); setShowThemePanel(false); }}
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${theme.buttonSecondary} hover:scale-105`}
            >
              <Settings size={20} className="mr-1" />
              Settings
            </button>
            <button
              onClick={handleReset}
              className={`col-span-1 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${theme.buttonNeutral} ${theme.isDark ? 'text-white' : 'text-gray-700'} hover:scale-105`}
              disabled={time <= 0}
            >
              <RotateCcw size={20} className="mr-1" />
              Reset
            </button>
          </div>

          {isRunning && time > 0 && (
            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl mb-8 text-center transition-all duration-500`}>
              <h2 className={`text-xl font-bold ${theme.primary} mb-4 ${theme.fontFamily ? 'font-cursive' : ''}`}>Increase Timer</h2>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => increaseTime(5)}
                  className={`py-3 rounded-xl font-medium ${theme.buttonSecondary} text-white hover:scale-105 transition-all duration-300`}
                >
                  5 mins
                </button>
                <button
                  onClick={() => increaseTime(10)}
                  className={`py-3 rounded-xl font-medium ${theme.buttonSecondary} text-white hover:scale-105 transition-all duration-300`}
                >
                  10 mins
                </button>
                <button
                  onClick={() => increaseTime(20)}
                  className={`py-3 rounded-xl font-medium ${theme.buttonSecondary} text-white hover:scale-105 transition-all duration-300`}
                >
                  20 mins
                </button>
              </div>
            </div>
          )}

          {showSettings && (
            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl mb-8 transition-all duration-500`}>
              <h2 className={`text-xl font-bold ${theme.primary} mb-4 ${theme.fontFamily ? 'font-cursive' : ''}`}>Timer Settings 🛠️</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hours</label>
                  <input
                    type="number"
                    name="hours"
                    value={settings.hours}
                    onChange={handleSettingsChange}
                    min="0"
                    max="23"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Minutes</label>
                  <input
                    type="number"
                    name="minutes"
                    value={settings.minutes}
                    onChange={handleSettingsChange}
                    min="0"
                    max="59"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Seconds</label>
                  <input
                    type="number"
                    name="seconds"
                    value={settings.seconds}
                    onChange={handleSettingsChange}
                    min="0"
                    max="59"
                    className={`w-full p-2 rounded-lg ${theme.accentLight} ${theme.textColor} border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-${theme.primary.split('-')[1]}-500`}
                  />
                </div>
              </div>
            </div>
          )}

          {showThemePanel && (
            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl mb-8 transition-all duration-500`}>
              <h2 className={`text-xl font-bold ${theme.primary} mb-4 ${theme.fontFamily ? 'font-cursive' : ''}`}>Pick a Theme!</h2>
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
                    <span>{themeOption.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}