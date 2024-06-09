'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        return null;
    }

    return (
        <button onClick={themeContext.toggleTheme}>
            Switch to {themeContext.theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    );
};

export default ThemeToggle;
