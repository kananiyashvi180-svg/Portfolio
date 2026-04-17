import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Check local storage or prefer color scheme
    // Always default to dark mode for a premium consistent experience
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Force dark mode classes consistently
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        
        // Update CSS variables for full coverage
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
