'use client';

import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    );
};

export default ThemeToggle;
