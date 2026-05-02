'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Theme } from '@/lib/types';

interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME: Theme = 'terminal';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
        const initial = stored && isValidTheme(stored) ? stored : DEFAULT_THEME;
        setThemeState(initial);
        document.documentElement.setAttribute('data-theme', initial);
        setMounted(true);
    }, []);

    function setTheme(next: Theme) {
        setThemeState(next);
        localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.setAttribute('data-theme', next);
    }

    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}

function isValidTheme(value: string): value is Theme {
    return ['terminal', 'synthwave', 'win98', 'newspaper'].includes(value);
}
