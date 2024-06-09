'use client';

import { createContext, useState, ReactNode } from 'react';

interface ThemeContextProps {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    );
};
