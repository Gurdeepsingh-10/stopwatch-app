// src/About.jsx
import { useTheme } from './ThemeContext.jsx';

const About = () => {
  const { themeIndex } = useTheme();
  console.log('About themeIndex:', themeIndex); // Debug log

  const themes = [
    { bgColor: 'bg-slate-50', cardBg: 'bg-white', primary: 'text-sky-500', secondary: 'text-indigo-500', textColor: 'text-gray-800', isDark: false },
    { bgColor: 'bg-gray-900', cardBg: 'bg-gray-800', primary: 'text-violet-500', secondary: 'text-fuchsia-500', textColor: 'text-gray-100', isDark: true },
    { bgColor: 'bg-gray-50', cardBg: 'bg-white', primary: 'text-emerald-500', secondary: 'text-teal-500', textColor: 'text-gray-800', isDark: false },
    { bgColor: 'bg-stone-900', cardBg: 'bg-stone-800', primary: 'text-amber-500', secondary: 'text-orange-500', textColor: 'text-stone-100', isDark: true },
    { bgColor: 'bg-gray-100', cardBg: 'bg-white', primary: 'text-rose-500', secondary: 'text-pink-500', textColor: 'text-gray-800', isDark: false },
    { bgColor: 'bg-pink-50', cardBg: 'bg-cream-100', primary: 'text-pink-400', secondary: 'text-rose-300', textColor: 'text-pink-800', isDark: false },
    { bgColor: 'bg-purple-900', cardBg: 'bg-purple-800', primary: 'text-purple-300', secondary: 'text-lavender-200', textColor: 'text-white', isDark: true },
  ];

  const theme = themes[themeIndex] || themes[3]; // Fallback to Amber

  return (
    <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl mb-8 transition-all duration-500 animate-fade-in`}>
      <h2 className={`text-xl font-bold ${theme.primary} mb-4`}>About the App 🌟</h2>
      <p className={`text-sm ${theme.textColor}`}>
        Welcome to this delightful productivity tool! This app features a Stopwatch for tracking time with precision, a Pomodoro timer to boost focus with work-break cycles, and more features to come. Enjoy customizable themes with cute animations and illustrations to keep your experience fun and engaging. Stay tuned for updates!
      </p>
      <p className={`mt-4 text-sm ${theme.textColor}`}>
        Created with ❤️ by Gurdeep
      </p>
    </div>
  );
};

export default About;