'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useSection } from '@/context/SectionContext';
import { ExperienceSlider } from './ExperienceSlider';
import { experiences } from '@/data/experiences';
import { clsx } from 'clsx';

type ViewMode = 'compact' | 'slider';

/**
 * Experience section. Compact list view transitions to a full slider
 * when the user clicks "View All Experiences".
 */
export function ExperienceSection() {
    const { theme } = useTheme();
    const { activeSection } = useSection();
    const [viewMode, setViewMode] = useState<ViewMode>('compact');
    const [sliderIndex, setSliderIndex] = useState(0);

    const isWin98 = theme === 'win98';
    const isSynthwave = theme === 'synthwave';
    const isTerminal = theme === 'terminal';
    const isNewspaper = theme === 'newspaper';

    // Reset to compact when navigating away and back
    useEffect(() => {
        if (activeSection !== 'experience') {
            setViewMode('compact');
            setSliderIndex(0);
        }
    }, [activeSection]);

    if (viewMode === 'slider') {
        return (
            <div className="h-full flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
                {/* Back button */}
                <div className="shrink-0 px-4 pt-3">
                    <button
                        onClick={() => setViewMode('compact')}
                        className={clsx(
                            'text-sm px-3 py-1 border transition-all cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)]',
                            isWin98 ? 'win-btn' : 'border-[var(--border)]'
                        )}
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', borderRadius: 'var(--radius)' }}
                    >
                        {isTerminal ? '< Back' : '← Back'}
                    </button>
                </div>
                <ExperienceSlider currentIndex={sliderIndex} onChange={setSliderIndex} />
            </div>
        );
    }

    return (
        <div
            className={clsx(
                'h-full flex flex-col overflow-hidden px-4 md:px-8 py-6',
                isTerminal && 'scanlines'
            )}
            style={{ background: 'var(--bg)' }}
        >
            {/* Section header */}
            <div className="shrink-0 mb-6">
                {isNewspaper && (
                    <div className="text-xs tracking-[0.4em] uppercase text-[var(--fg-muted)] border-b border-[var(--border)] pb-1 mb-2">
                        Career History
                    </div>
                )}
                <h1
                    className={clsx('font-bold', isSynthwave && 'neon-glow')}
                    style={{
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        fontFamily: 'var(--font-display)',
                        color: 'var(--fg)',
                    }}
                >
                    {isTerminal ? '> Experience' : 'Experience'}
                </h1>
                {isNewspaper && (
                    <div className="w-16 h-1 mt-2" style={{ background: 'var(--accent)' }} />
                )}
            </div>

            {/* Compact list */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className={clsx(
                            'p-4 border transition-all cursor-pointer hover:border-[var(--accent)]',
                            isWin98 ? 'win-chrome' : 'border-[var(--border)]'
                        )}
                        style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius)' }}
                        onClick={() => {
                            setSliderIndex(exp.id - 1);
                            setViewMode('slider');
                        }}
                    >
                        {isWin98 && (
                            <div className="win-titlebar mb-2 -mx-4 -mt-4 px-2 text-xs">
                                <span>{exp.company}</span>
                            </div>
                        )}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3
                                    className="font-semibold text-base"
                                    style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                                >
                                    {exp.company}
                                </h3>
                                <div
                                    className="text-sm"
                                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                                >
                                    {exp.position}
                                </div>
                            </div>
                            <div className="text-right text-xs shrink-0" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                                <div>{exp.period}</div>
                                <div>{exp.location}</div>
                            </div>
                        </div>
                        <p className="text-sm mt-2" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
                            {exp.shortDescription}
                        </p>
                    </div>
                ))}
            </div>

            {/* View All button */}
            <div className="shrink-0 mt-4 flex justify-center">
                <button
                    onClick={() => setViewMode('slider')}
                    className={clsx(
                        'px-6 py-2 text-sm border transition-all cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)]',
                        isWin98 ? 'win-btn' : 'border-[var(--border)]',
                        isSynthwave && 'hover:neon-border'
                    )}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--fg-muted)',
                        borderRadius: 'var(--radius)',
                    }}
                >
                    View All Experiences
                </button>
            </div>
        </div>
    );
}
