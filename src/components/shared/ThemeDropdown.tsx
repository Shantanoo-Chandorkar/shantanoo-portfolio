'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import type { Theme } from '@/lib/types';
import { clsx } from 'clsx';

const THEMES: { value: Theme; label: string; icon: string }[] = [
    { value: 'terminal', label: 'Terminal', icon: '>' },
    { value: 'synthwave', label: 'Synthwave', icon: '◈' },
    { value: 'win98', label: 'Win98', icon: '⊞' },
    { value: 'newspaper', label: 'Newspaper', icon: '✦' },
];

/**
 * Dropdown to select from 4 retro themes. Active theme is highlighted.
 */
export function ThemeDropdown() {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = THEMES.find((t) => t.value === theme) ?? THEMES[0];
    const isWin98 = theme === 'win98';
    const isSynthwave = theme === 'synthwave';

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className={clsx(
                    'flex items-center gap-2 px-3 py-1.5 text-sm transition-all cursor-pointer whitespace-nowrap',
                    isWin98
                        ? 'win-btn'
                        : 'border border-[var(--border)] hover:border-[var(--accent)]',
                    isSynthwave && open && 'neon-border'
                )}
                style={{ fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius)', color: 'var(--fg)' }}
            >
                <span>{current.icon}</span>
                <span className="hidden sm:inline">{current.label}</span>
                <span className="text-xs opacity-60">{open ? '▲' : '▼'}</span>
            </button>

            {open && (
                <div
                    className={clsx(
                        'absolute right-0 top-full mt-1 z-50 min-w-[140px]',
                        isWin98 ? 'win-chrome' : 'border border-[var(--border)]'
                    )}
                    style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius)' }}
                >
                    {isWin98 && (
                        <div className="win-titlebar text-[10px] px-1 py-0.5">
                            Theme
                            <div className="win-titlebar-dots">
                                <span className="win-btn">×</span>
                            </div>
                        </div>
                    )}
                    {THEMES.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => { setTheme(t.value); setOpen(false); }}
                            className={clsx(
                                'w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-all cursor-pointer',
                                t.value === theme
                                    ? 'bg-[var(--accent)] text-[var(--bg)]'
                                    : 'hover:bg-[var(--accent)]/10 text-[var(--fg)]'
                            )}
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            <span>{t.icon}</span>
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
