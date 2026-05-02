'use client';

import { useState } from 'react';
import { useSection } from '@/context/SectionContext';
import { useTheme } from '@/context/ThemeContext';
import { ThemeDropdown } from '@/components/shared/ThemeDropdown';
import type { SectionId } from '@/lib/types';
import { clsx } from 'clsx';

const NAV_ITEMS: { id: SectionId; label: string }[] = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'techstack', label: 'Tech Stack' },
    { id: 'contact', label: 'Contact' },
];

/**
 * Top navigation bar. Shows logo, section links, and theme dropdown.
 * Collapses into a hamburger menu on mobile viewports.
 */
export function Navbar() {
    const { activeSection, setActiveSection } = useSection();
    const { theme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isTerminal = theme === 'terminal';
    const isSynthwave = theme === 'synthwave';
    const isWin98 = theme === 'win98';
    const isNewspaper = theme === 'newspaper';

    function handleNav(id: SectionId) {
        setActiveSection(id);
        setMobileOpen(false);
    }

    const logoText = isTerminal ? '~/sc $' : isWin98 ? 'SC.exe' : isNewspaper ? 'S.C.' : 'SC';

    return (
        <>
            <nav
                className={clsx(
                    'flex items-center justify-between px-4 py-2 shrink-0 z-40 relative',
                    isWin98 && 'win-chrome',
                    isSynthwave && 'border-b border-[var(--border)]',
                    isNewspaper && 'border-b-2 border-[var(--fg)]',
                    !isWin98 && !isSynthwave && !isNewspaper && 'border-b border-[var(--border)]'
                )}
                style={{ background: isWin98 ? 'var(--card-bg)' : 'var(--bg)' }}
            >
                {/* Win98 titlebar */}
                {isWin98 && (
                    <div className="win-titlebar absolute top-0 left-0 right-0 text-xs px-2 py-0.5">
                        <span>Shantanoo Chandorkar, Portfolio</span>
                        <div className="win-titlebar-dots">
                            <span className="win-btn">_</span>
                            <span className="win-btn">□</span>
                            <span className="win-btn">×</span>
                        </div>
                    </div>
                )}

                {/* Logo */}
                <button
                    onClick={() => handleNav('hero')}
                    className="font-bold text-lg shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--accent)',
                        marginTop: isWin98 ? '18px' : 0,
                        textShadow: isSynthwave ? 'var(--glow)' : 'none',
                    }}
                >
                    {logoText}
                </button>

                {/* Desktop nav links */}
                <div
                    className="hidden md:flex items-center gap-1"
                    style={{ marginTop: isWin98 ? '18px' : 0 }}
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={clsx(
                                    'px-3 py-1.5 text-sm transition-all cursor-pointer',
                                    isWin98 && isActive ? 'win-btn' : '',
                                    !isWin98 && 'hover:text-[var(--accent)]'
                                )}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    borderRadius: 'var(--radius)',
                                    color: isActive ? 'var(--accent)' : 'var(--fg-muted)',
                                    textShadow: isSynthwave && isActive ? 'var(--glow)' : 'none',
                                    textDecorationLine: isNewspaper && isActive ? 'underline' : 'none',
                                    textDecorationColor: 'var(--accent)',
                                    fontWeight: isActive ? '600' : '400',
                                }}
                            >
                                {isTerminal && isActive ? `> ${item.label}` : item.label}
                            </button>
                        );
                    })}
                </div>

                {/* Right: theme dropdown + hamburger */}
                <div
                    className="flex items-center gap-2"
                    style={{ marginTop: isWin98 ? '18px' : 0 }}
                >
                    <div className="hidden md:block">
                        <ThemeDropdown />
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="md:hidden px-2 py-1 border border-[var(--border)] cursor-pointer"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg)', borderRadius: 'var(--radius)' }}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? '×' : '≡'}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown menu */}
            {mobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-30"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div
                        className={clsx(
                            'absolute left-0 right-0 z-40 border-b',
                            isWin98 ? 'win-chrome' : 'border-[var(--border)]'
                        )}
                        style={{ background: 'var(--card-bg)', top: isWin98 ? '52px' : '44px' }}
                    >
                        {NAV_ITEMS.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNav(item.id)}
                                    className="w-full text-left px-4 py-3 text-sm transition-all cursor-pointer hover:bg-[var(--accent)]/10 border-b border-[var(--border)]"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: isActive ? 'var(--accent)' : 'var(--fg)',
                                        fontWeight: isActive ? '600' : '400',
                                    }}
                                >
                                    {isTerminal && isActive ? `> ${item.label}` : item.label}
                                </button>
                            );
                        })}
                        <div className="px-4 py-3">
                            <ThemeDropdown />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
