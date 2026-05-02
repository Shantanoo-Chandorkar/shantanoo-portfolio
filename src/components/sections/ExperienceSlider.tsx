'use client';

import { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SliderControls } from '@/components/shared/SliderControls';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { useSwipe } from '@/hooks/useSwipe';
import { experiences } from '@/data/experiences';
import { clsx } from 'clsx';

interface ExperienceSliderProps {
    currentIndex: number;
    onChange: (index: number) => void;
}

/**
 * Full slider view for a single experience entry.
 * Left: timeline rail. Right: full details.
 */
export function ExperienceSlider({ currentIndex, onChange }: ExperienceSliderProps) {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    const isWin98 = theme === 'win98';
    const isSynthwave = theme === 'synthwave';

    function prev() { onChange((currentIndex - 1 + experiences.length) % experiences.length); }
    function next() { onChange((currentIndex + 1) % experiences.length); }

    useKeyboardNav(containerRef, { onPrev: prev, onNext: next });
    useSwipe(containerRef, { onSwipeLeft: next, onSwipeRight: prev });

    const entry = experiences[currentIndex];

    return (
        <div ref={containerRef} className="h-full flex flex-col p-4 md:p-6 gap-4 overflow-hidden">
            <SliderControls
                total={experiences.length}
                current={currentIndex}
                onChange={onChange}
                onPrev={prev}
                onNext={next}
                labels={experiences.map((_, i) => String(i + 1).padStart(2, '0'))}
            />

            <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 overflow-hidden">
                {/* Timeline rail */}
                <div
                    className={clsx(
                        'hidden md:flex flex-col items-center gap-0 shrink-0 pt-2',
                        isWin98 && 'win-chrome p-2'
                    )}
                    style={{ width: '180px' }}
                >
                    {experiences.map((exp, i) => {
                        const isActive = i === currentIndex;
                        return (
                            <button
                                key={exp.id}
                                onClick={() => onChange(i)}
                                className="flex flex-col items-center cursor-pointer group w-full"
                            >
                                <div
                                    className={clsx(
                                        'w-3 h-3 rounded-full border-2 transition-all',
                                        isActive
                                            ? 'border-[var(--accent)] bg-[var(--accent)] scale-125'
                                            : 'border-[var(--border)] bg-transparent group-hover:border-[var(--accent)]'
                                    )}
                                    style={isSynthwave && isActive ? { boxShadow: 'var(--glow)' } : {}}
                                />
                                <div className="text-center py-2 px-1">
                                    <div
                                        className="text-xs font-semibold"
                                        style={{ color: isActive ? 'var(--accent)' : 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}
                                    >
                                        {exp.company}
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                                    >
                                        {exp.period}
                                    </div>
                                </div>
                                {i < experiences.length - 1 && (
                                    <div className="w-px h-8 bg-[var(--border)]" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Entry details */}
                <div
                    className={clsx(
                        'flex-1 min-w-0 overflow-y-auto',
                        isWin98 && 'win-chrome'
                    )}
                    style={{ borderRadius: 'var(--radius)' }}
                >
                    {isWin98 && (
                        <div className="win-titlebar">
                            <span>{entry.company}, {entry.position}</span>
                            <div className="win-titlebar-dots">
                                <span className="win-btn">_</span>
                                <span className="win-btn">□</span>
                                <span className="win-btn">×</span>
                            </div>
                        </div>
                    )}
                    <div
                        className="p-4 md:p-6 h-full"
                        style={{ background: 'var(--card-bg)' }}
                    >
                        {/* Header */}
                        <div className="mb-4">
                            <h2
                                className={clsx('text-xl font-bold', isSynthwave && 'neon-glow')}
                                style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                            >
                                {entry.company}
                            </h2>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                <span
                                    className="text-sm font-semibold"
                                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                                >
                                    {entry.position}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                                    {entry.period}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                                    {entry.location}
                                </span>
                            </div>
                        </div>

                        {/* Bullet points */}
                        <ul className="space-y-2 mb-4">
                            {entry.description.map((line, i) => (
                                <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--fg)', fontFamily: 'var(--font-body)' }}>
                                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>
                                        {theme === 'terminal' ? '>' : theme === 'newspaper' ? '◆' : '▸'}
                                    </span>
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Highlights */}
                        {entry.highlights.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {entry.highlights.map((h, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-0.5 border"
                                        style={{
                                            borderColor: 'var(--accent-2)',
                                            color: 'var(--accent-2)',
                                            fontFamily: 'var(--font-mono)',
                                            borderRadius: 'var(--radius)',
                                            background: 'transparent',
                                        }}
                                    >
                                        ✓ {h}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Tech chips */}
                        <div className="flex flex-wrap gap-2">
                            {entry.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2 py-0.5 border"
                                    style={{
                                        borderColor: 'var(--border)',
                                        color: 'var(--fg-muted)',
                                        fontFamily: 'var(--font-mono)',
                                        borderRadius: 'var(--radius)',
                                        background: 'var(--bg)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
