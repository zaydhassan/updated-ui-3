import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [showIncidents, setShowIncidents] = useState(true); // default to true

  useEffect(() => {
    document.body.className = theme + '-mode';
  }, [theme]);

  const toggleTheme = () => {
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }, 400);
  };

  const toggleIncidents = () => {
    setShowIncidents(!showIncidents);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, showIncidents, toggleIncidents }}>
      {children}
    </ThemeContext.Provider>
  );
};
