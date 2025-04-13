// src/ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeIndex, setThemeIndex] = useState(0); // Default to Sky theme
  console.log('ThemeProvider themeIndex:', themeIndex); // Debug log

  return (
    <ThemeContext.Provider value={{ themeIndex, setThemeIndex }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};