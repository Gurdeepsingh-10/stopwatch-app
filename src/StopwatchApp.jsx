import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function StopwatchApp() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const intervalRef = useRef(null);

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
      setLaps([...laps, time]);
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
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    } else {
      // Show seconds, minutes, hours
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // Determine theme colors based on dark mode state
  const primaryColor = darkMode ? 'text-purple-400' : 'text-cyan-600';
  const secondaryColor = darkMode ? 'text-pink-400' : 'text-amber-500';
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const buttonBgPrimary = darkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-cyan-600 hover:bg-cyan-500';
  const buttonBgSecondary = darkMode ? 'bg-pink-600 hover:bg-pink-500' : 'bg-amber-600 hover:bg-amber-500';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-end mb-4">
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
            >
              {darkMode ? (
                <Sun className={secondaryColor} size={24} />
              ) : (
                <Moon className={primaryColor} size={24} />
              )}
            </button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold mb-2 ${primaryColor}`}>Stopwatch</h1>
            <div className={`text-6xl font-mono font-bold mt-8 mb-6 ${secondaryColor}`}>
              {formatTime(time)}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={handleStartStop} 
              className={`px-6 py-3 rounded-lg text-white font-bold shadow-lg ${buttonBgPrimary} transition-colors duration-200`}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button 
              onClick={handleLap} 
              className={`px-6 py-3 rounded-lg text-white font-bold shadow-lg ${buttonBgSecondary} transition-colors duration-200 ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isRunning}
            >
              Lap
            </button>
            <button 
              onClick={handleReset} 
              className={`px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-bold shadow-lg transition-colors duration-200`}
            >
              Reset
            </button>
          </div>
          
          {laps.length > 0 && (
            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-xl font-bold mb-4 ${primaryColor}`}>Laps</h2>
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Lap</th>
                      <th className="py-2 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laps.map((lapTime, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 text-left">Lap {laps.length - index}</td>
                        <td className={`py-2 text-right font-mono ${secondaryColor}`}>{formatTime(lapTime)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}