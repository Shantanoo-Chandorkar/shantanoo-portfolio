'use client';

import { useTheme } from '@/context/ThemeContext';
import { useSection } from '@/context/SectionContext';
import { hero } from '@/data/hero';
import { socialLinks } from '@/data/social';
import { clsx } from 'clsx';

function TerminalCenterpiece() {
    return (
        <div
            className="border border-[var(--accent)] p-6 w-full max-w-sm"
            style={{ background: 'var(--card-bg)', fontFamily: 'var(--font-mono)', boxShadow: 'var(--glow)' }}
        >
            <div className="text-[var(--fg-muted)] text-xs mb-4">
                <span className="text-[var(--accent)]">visitor@portfolio</span>
                <span className="text-[var(--fg-muted)]">:~$</span>
            </div>
            <div className="text-4xl font-bold text-[var(--accent)] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                &lt;/&gt;
            </div>
            <div className="text-xs text-[var(--fg-muted)] mt-3 space-y-1">
                <div><span className="text-[var(--accent)]">const</span> <span className="text-[var(--accent-2)]">dev</span> = <span className="text-[var(--fg)]">&apos;full-stack&apos;</span>;</div>
                <div><span className="text-[var(--accent)]">const</span> <span className="text-[var(--accent-2)]">status</span> = <span className="text-green-400">&apos;available&apos;</span>;</div>
                <div className="mt-2 text-[var(--fg-muted)]">
                    <span className="text-[var(--accent)]">visitor@portfolio:~$</span> <span className="cursor-blink">█</span>
                </div>
            </div>
        </div>
    );
}

function SynthwaveCenterpiece() {
    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            {/* Neon sun */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '160px',
                    height: '160px',
                    background: 'linear-gradient(180deg, #ff2d78 0%, #ff8c00 50%, #0d0221 100%)',
                    boxShadow: '0 0 30px #ff2d78, 0 0 60px #ff2d7855',
                    overflow: 'hidden',
                }}
            >
                {/* Horizontal lines on sun */}
                {[40, 55, 65, 73, 79, 84, 88, 91, 94, 97].map((pct, i) => (
                    <div
                        key={i}
                        className="absolute w-full"
                        style={{
                            top: `${pct}%`,
                            height: '2px',
                            background: '#0d0221',
                            opacity: 0.7,
                        }}
                    />
                ))}
            </div>
            {/* Palm silhouette left */}
            <div
                className="absolute bottom-0 left-0 text-5xl"
                style={{ textShadow: '0 0 10px #ff2d78', filter: 'brightness(0) saturate(100%) invert(15%) sepia(90%) saturate(500%) hue-rotate(290deg)' }}
            >
                🌴
            </div>
            {/* Palm silhouette right */}
            <div
                className="absolute bottom-0 right-0 text-5xl scale-x-[-1]"
                style={{ textShadow: '0 0 10px #ff2d78', filter: 'brightness(0) saturate(100%) invert(15%) sepia(90%) saturate(500%) hue-rotate(290deg)' }}
            >
                🌴
            </div>
        </div>
    );
}

function Win98Centerpiece() {
    return (
        <div className="win-chrome w-full max-w-xs">
            <div className="win-titlebar">
                <span>My Computer</span>
                <div className="win-titlebar-dots">
                    <span className="win-btn">_</span>
                    <span className="win-btn">□</span>
                    <span className="win-btn">×</span>
                </div>
            </div>
            <div
                className="p-6 flex flex-col items-center gap-3"
                style={{ background: 'var(--card-bg)', border: '1px solid #808080', borderTop: 'none' }}
            >
                <div className="text-6xl">🖥️</div>
                <div className="text-center text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                    <div className="font-bold">Shantanoo&apos;s PC</div>
                    <div className="text-[var(--fg-muted)]">Full Stack Developer</div>
                </div>
                <div
                    className="w-full border text-xs p-1 text-center"
                    style={{ borderColor: '#808080', background: 'white', color: '#000' }}
                >
                    C:\Users\Shantanoo\Portfolio&gt;_
                </div>
            </div>
        </div>
    );
}

function NewspaperCenterpiece() {
    return (
        <div className="relative flex flex-col items-center justify-center gap-4">
            <div
                className="w-44 h-44 rounded-full border-4 border-[var(--accent)] flex flex-col items-center justify-center text-center"
                style={{
                    background: 'var(--bg)',
                    boxShadow: '4px 4px 0 var(--accent)',
                    fontFamily: 'var(--font-display)',
                }}
            >
                <div className="text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">, est. 2022 ,</div>
                <div className="text-lg font-bold text-[var(--accent)] leading-tight mt-1">AVAILABLE</div>
                <div className="text-xs tracking-widest text-[var(--fg-muted)]">FOR HIRE</div>
                <div className="text-xs mt-2 text-[var(--fg-muted)]">✦ ✦ ✦</div>
            </div>
            <div className="text-xs tracking-[0.25em] uppercase text-[var(--fg-muted)] border-t border-b border-[var(--border)] py-1 px-4">
                Web Development
            </div>
        </div>
    );
}

/**
 * Hero section — name, tagline, bio, CTAs, and a theme-specific centerpiece.
 */
export function HeroSection() {
    const { theme } = useTheme();
    const { setActiveSection } = useSection();

    const isSynthwave = theme === 'synthwave';
    const isNewspaper = theme === 'newspaper';
    const isWin98 = theme === 'win98';
    const isTerminal = theme === 'terminal';

    return (
        <div
            className={clsx(
                'h-full flex items-center justify-center overflow-auto relative',
                isTerminal && 'scanlines'
            )}
            style={{ background: 'var(--bg)' }}
        >
            {/* Synthwave horizon grid */}
            {isSynthwave && <div className="synthwave-grid" />}

            {/* Halftone for Newspaper */}
            {isNewspaper && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
                        backgroundSize: '8px 8px',
                    }}
                />
            )}

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-8 max-w-5xl mx-auto w-full">
                {/* Centerpiece */}
                <div className="flex items-center justify-center shrink-0">
                    {isTerminal && <TerminalCenterpiece />}
                    {isSynthwave && <SynthwaveCenterpiece />}
                    {isWin98 && <Win98Centerpiece />}
                    {isNewspaper && <NewspaperCenterpiece />}
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-4 text-center md:text-left max-w-md">
                    {/* Newspaper column rule */}
                    {isNewspaper && (
                        <div className="text-xs tracking-[0.4em] uppercase text-[var(--fg-muted)] border-t border-b border-[var(--border)] py-1">
                            Portfolio · 2025
                        </div>
                    )}

                    <h1
                        className={clsx(
                            'font-bold leading-tight',
                            isSynthwave && 'neon-glow'
                        )}
                        style={{
                            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                            fontFamily: 'var(--font-display)',
                            color: 'var(--fg)',
                        }}
                    >
                        {hero.name}
                    </h1>

                    <h2
                        className={clsx(
                            'text-lg font-semibold',
                            isSynthwave && 'neon-glow'
                        )}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent)',
                        }}
                    >
                        {isTerminal ? `> ${hero.tagline}` : hero.tagline}
                    </h2>

                    <p
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--fg-muted)' }}
                    >
                        {hero.bio}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <button
                            onClick={() => setActiveSection('projects')}
                            className={clsx(
                                'px-5 py-2 text-sm font-semibold transition-all cursor-pointer',
                                isWin98 ? 'win-btn' : 'border border-[var(--accent)]',
                                isSynthwave && 'neon-border'
                            )}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                background: isWin98 ? 'var(--card-bg)' : 'var(--accent)',
                                color: isWin98 ? '#000' : 'var(--bg)',
                                borderRadius: 'var(--radius)',
                                // Win98 default button: extra outer border indicates primary action
                                outline: isWin98 ? '2px solid #000' : 'none',
                                outlineOffset: isWin98 ? '2px' : '0',
                            }}
                        >
                            {hero.primaryCTA}
                        </button>
                        <button
                            onClick={() => setActiveSection('contact')}
                            className={clsx(
                                'px-5 py-2 text-sm font-semibold transition-all cursor-pointer',
                                isWin98 ? 'win-btn' : 'border border-[var(--border)]',
                                'hover:border-[var(--accent)]'
                            )}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                background: isWin98 ? 'var(--card-bg)' : 'transparent',
                                color: isWin98 ? '#000' : 'var(--fg)',
                                borderRadius: 'var(--radius)',
                            }}
                        >
                            {hero.secondaryCTA}
                        </button>
                    </div>

                    {/* Social links row */}
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    title={link.label}
                                    className={clsx(
                                        'flex items-center justify-center w-9 h-9 border transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]',
                                        isWin98 ? 'win-btn' : 'border-[var(--border)]',
                                        isSynthwave && 'hover:neon-border'
                                    )}
                                    style={{
                                        color: 'var(--fg-muted)',
                                        borderRadius: 'var(--radius)',
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
