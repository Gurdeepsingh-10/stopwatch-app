import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, RotateCcw, Play, Pause, Flag, Clock, Palette } from 'lucide-react';

// Theme definitions
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
  }
];

export default function StopwatchApp() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const intervalRef = useRef(null);
  const lapsContainerRef = useRef(null);
  const themeSelectorRef = useRef(null);

  // Get current theme
  const currentTheme = themes[themeIndex];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    // Scroll to bottom of laps container when new lap is added
    if (lapsContainerRef.current && laps.length > 0) {
      lapsContainerRef.current.scrollTop = 0;
    }
  }, [laps]);

  // Reset animation when time changes
  useEffect(() => {
    setShowAnimation(false);
    const timer = setTimeout(() => setShowAnimation(true), 10);
    return () => clearTimeout(timer);
  }, [time]);

  // Close theme selector when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target)) {
        setShowThemeSelector(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [{
        id: Date.now(),
        time: time,
        index: prevLaps.length + 1
      }, ...prevLaps]);
    }
  };

  const toggleThemeSelector = () => {
    setShowThemeSelector(!showThemeSelector);
  };

  const selectTheme = (index) => {
    setThemeIndex(index);
    setShowThemeSelector(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    if (minutes < 60) {
      // Show milliseconds, seconds, minutes
      return {
        main: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        ms: `.${milliseconds.toString().padStart(2, '0')}`
      };
    } else {
      // Show seconds, minutes, hours
      return {
        main: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        ms: ''
      };
    }
  };

  // Get formatted time parts
  const { main, ms } = formatTime(time);
  
  return (
    <div className={`min-h-screen ${currentTheme.bgColor} ${currentTheme.textColor} transition-colors duration-500 font-sans`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header and theme selector */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center">
              <Clock className={`${currentTheme.primary} mr-2`} size={24} />
              <h1 className={`text-2xl font-extrabold tracking-tight ${currentTheme.primary}`}>Stopwatch</h1>
            </div>
            <div className="relative" ref={themeSelectorRef}>
              <button 
                onClick={toggleThemeSelector} 
                className={`p-3 rounded-full ${currentTheme.cardBg} shadow-lg transition-transform duration-300 hover:scale-110`}
                aria-label="Change theme"
              >
                <Palette className={currentTheme.secondary} size={20} />
              </button>
              
              {showThemeSelector && (
                <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg ${currentTheme.cardBg} z-10 py-1 animate-fade-in`}>
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium">Select Theme</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {themes.map((theme, index) => (
                      <button
                        key={theme.id}
                        onClick={() => selectTheme(index)}
                        className={`w-full px-4 py-3 text-left flex items-center hover:${theme.accentLight} transition-colors ${
                          index === themeIndex ? `${theme.accentLight} font-medium` : ''
                        }`}
                      >
                        <div className="flex space-x-1 mr-2">
                          <div className={`w-3 h-3 rounded-full bg-current ${theme.primary}`}></div>
                          <div className={`w-3 h-3 rounded-full bg-current ${theme.secondary}`}></div>
                        </div>
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Clock face */}
          <div className={`${currentTheme.cardBg} rounded-2xl p-8 shadow-xl mb-8 relative overflow-hidden transition-all duration-500`}>
            {/* Animated circles behind the numbers */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className={`absolute w-32 h-32 rounded-full ${currentTheme.primary} bg-current top-0 left-0 -translate-x-1/2 -translate-y-1/2 animate-pulse`}></div>
              <div className={`absolute w-40 h-40 rounded-full ${currentTheme.secondary} bg-current bottom-0 right-0 translate-x-1/2 translate-y-1/2 animate-pulse`} style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative text-center">
              {/* Main clock numbers */}
              <div className={`text-6xl font-mono font-bold tracking-tight mb-1 ${isRunning ? 'animate-pulse' : ''}`}>
                <span className={`${showAnimation ? 'animate-pulse' : ''} inline-block transition-all ${currentTheme.primary}`}>
                  {main}
                </span>
                <span className={`text-4xl ${currentTheme.secondary} inline-block transition-all`}>
                  {ms}
                </span>
              </div>
              
              {/* Status indicator */}
              <div className={`mt-4 text-sm font-medium ${isRunning ? currentTheme.secondary : 'text-gray-500'}`}>
                {isRunning ? 'Running' : 'Stopped'}
              </div>
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <button 
              onClick={handleStartStop} 
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${currentTheme.buttonPrimary} hover:scale-105`}
            >
              {isRunning ? <Pause size={20} className="mr-1" /> : <Play size={20} className="mr-1" />}
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button 
              onClick={handleLap} 
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${currentTheme.buttonSecondary} hover:scale-105 ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isRunning}
            >
              <Flag size={20} className="mr-1" />
              Lap
            </button>
            <button 
              onClick={handleReset} 
              className={`col-span-1 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${currentTheme.buttonNeutral} ${currentTheme.isDark ? 'text-white' : 'text-gray-700'} hover:scale-105`}
            >
              <RotateCcw size={20} className="mr-1" />
              Reset
            </button>
          </div>
          
          {/* Laps display */}
          {laps.length > 0 && (
            <div className={`mt-8 rounded-2xl ${currentTheme.cardBg} shadow-lg overflow-hidden transition-all duration-500`}>
              <div className="p-4 border-b border-opacity-20 border-gray-500">
                <h2 className={`text-xl font-bold ${currentTheme.primary}`}>Laps</h2>
              </div>
              
              <div 
                ref={lapsContainerRef} 
                className="max-h-80 overflow-y-auto py-2 scroll-smooth"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: currentTheme.isDark ? 
                    `${currentTheme.buttonPrimary.split(' ')[0].replace('bg-', '#')} #1f2937` : 
                    `${currentTheme.buttonPrimary.split(' ')[0].replace('bg-', '#')} #f9fafb`
                }}
              >
                {laps.map((lap, idx) => {
                  const formattedLapTime = formatTime(lap.time);
                  // Add animation class for the most recent lap
                  const isNewest = idx === 0;
                  
                  return (
                    <div 
                      key={lap.id} 
                      className={`flex justify-between items-center py-3 px-4 border-b border-opacity-10 border-gray-500 last:border-0 transition-all ${
                        isNewest ? 'animate-fade-in' : ''
                      }`}
                      style={{
                        animationDelay: `${idx * 0.05}s`,
                        backgroundColor: isNewest ? (currentTheme.accentLight) : 'transparent'
                      }}
                    >
                      <div className="font-medium">Lap {lap.index}</div>
                      <div className={`font-mono ${isNewest ? currentTheme.primary : ''}`}>
                        {formattedLapTime.main}
                        <span className={currentTheme.secondary}>{formattedLapTime.ms}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}