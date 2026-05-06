'use client';

import { useTheme } from '@/context/ThemeContext';
import { clsx } from 'clsx';

/**
 * Fixed bottom-right pill button to download the resume PDF.
 * Styled differently per theme.
 */
export function ResumeButton() {
    const { theme } = useTheme();

    const isTerminal = theme === 'terminal';
    const isSynthwave = theme === 'synthwave';
    const isWin98 = theme === 'win98';
    const isNewspaper = theme === 'newspaper';

    return (
        <a
            href="/Shantanoo_Chandorkar_Resume.pdf"
            download
            className={clsx(
                'fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 md:px-4 text-sm font-mono transition-all',
                isWin98 ? 'win-btn' : 'border border-[var(--accent)]',
                isSynthwave && 'neon-border',
                isNewspaper && 'border-2 border-[var(--accent)]'
            )}
            style={{
                background: isTerminal ? 'var(--bg)' : isWin98 ? 'var(--card-bg)' : isSynthwave ? 'var(--card-bg)' : 'var(--card-bg)',
                color: 'var(--accent)',
                borderRadius: isNewspaper ? '0' : isSynthwave ? '4px' : 'var(--radius)',
                fontFamily: 'var(--font-mono)',
                textShadow: isSynthwave ? 'var(--glow)' : 'none',
                boxShadow: isSynthwave ? 'var(--glow)' : 'none',
            }}
        >
            {isTerminal && <span className="cursor-blink">▼</span>}
            {isWin98 && <span>💾</span>}
            {isNewspaper && <span>✦</span>}
            {isSynthwave && <span>↓</span>}

            <span className="hidden md:inline">
                {isTerminal ? 'Resume.txt' : isWin98 ? 'Resume' : isNewspaper ? 'Résumé' : 'Resume'}
            </span>
        </a>
    );
}
