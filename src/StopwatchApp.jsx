import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, RotateCcw, Play, Pause, Flag, Clock } from 'lucide-react';

export default function StopwatchApp() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const intervalRef = useRef(null);
  const lapsContainerRef = useRef(null);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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

  // Theme settings
  const primaryColor = darkMode ? 'text-indigo-400' : 'text-sky-600';
  const secondaryColor = darkMode ? 'text-fuchsia-400' : 'text-rose-500';
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const buttonBgPrimary = darkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-sky-600 hover:bg-sky-500';
  const buttonBgSecondary = darkMode ? 'bg-fuchsia-600 hover:bg-fuchsia-500' : 'bg-rose-600 hover:bg-rose-500';
  const buttonBgNeutral = darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-200';
  
  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-500 font-sans`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header and dark mode toggle */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center">
              <Clock className={`${primaryColor} mr-2`} size={24} />
              <h1 className={`text-2xl font-extrabold tracking-tight ${primaryColor}`}>Stopwatch</h1>
            </div>
            <button 
              onClick={toggleDarkMode} 
              className={`p-3 rounded-full ${cardBg} shadow-lg transition-transform duration-300 hover:scale-110`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className={secondaryColor} size={20} />
              ) : (
                <Moon className={primaryColor} size={20} />
              )}
            </button>
          </div>
          
          {/* Clock face */}
          <div className={`${cardBg} rounded-2xl p-8 shadow-xl mb-8 relative overflow-hidden transition-all duration-500`}>
            {/* Animated circles behind the numbers */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className={`absolute w-32 h-32 rounded-full ${primaryColor} bg-current top-0 left-0 -translate-x-1/2 -translate-y-1/2 animate-pulse`}></div>
              <div className={`absolute w-40 h-40 rounded-full ${secondaryColor} bg-current bottom-0 right-0 translate-x-1/2 translate-y-1/2 animate-pulse`} style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative text-center">
              {/* Main clock numbers */}
              <div className={`text-6xl font-mono font-bold tracking-tight mb-1 ${isRunning ? 'animate-pulse' : ''}`}>
                <span className={`${showAnimation ? 'animate-pulse' : ''} inline-block transition-all ${primaryColor}`}>
                  {main}
                </span>
                <span className={`text-4xl ${secondaryColor} inline-block transition-all`}>
                  {ms}
                </span>
              </div>
              
              {/* Status indicator */}
              <div className={`mt-4 text-sm font-medium ${isRunning ? secondaryColor : 'text-gray-500'}`}>
                {isRunning ? 'Running' : 'Stopped'}
              </div>
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <button 
              onClick={handleStartStop} 
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${buttonBgPrimary} hover:scale-105`}
            >
              {isRunning ? <Pause size={20} className="mr-1" /> : <Play size={20} className="mr-1" />}
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button 
              onClick={handleLap} 
              className={`col-span-1 py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${buttonBgSecondary} hover:scale-105 ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isRunning}
            >
              <Flag size={20} className="mr-1" />
              Lap
            </button>
            <button 
              onClick={handleReset} 
              className={`col-span-1 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center ${buttonBgNeutral} ${darkMode ? 'text-white' : 'text-gray-700'} hover:scale-105`}
            >
              <RotateCcw size={20} className="mr-1" />
              Reset
            </button>
          </div>
          
          {/* Laps display */}
          {laps.length > 0 && (
            <div className={`mt-8 rounded-2xl ${cardBg} shadow-lg overflow-hidden transition-all duration-500`}>
              <div className="p-4 border-b border-opacity-20 border-gray-500">
                <h2 className={`text-xl font-bold ${primaryColor}`}>Laps</h2>
              </div>
              
              <div 
                ref={lapsContainerRef} 
                className="max-h-80 overflow-y-auto py-2 scroll-smooth"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: darkMode ? '#4f46e5 #1f2937' : '#0284c7 #f9fafb'
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
                        isNewest ? 'animate-fade-in bg-opacity-10' : ''
                      }`}
                      style={{
                        animationDelay: `${idx * 0.05}s`,
                        backgroundColor: isNewest ? (darkMode ? 'rgba(79, 70, 229, 0.1)' : 'rgba(14, 165, 233, 0.1)') : 'transparent'
                      }}
                    >
                      <div className="font-medium">Lap {lap.index}</div>
                      <div className={`font-mono ${isNewest ? primaryColor : ''}`}>
                        {formattedLapTime.main}
                        <span className={secondaryColor}>{formattedLapTime.ms}</span>
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