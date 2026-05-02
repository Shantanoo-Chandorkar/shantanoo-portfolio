'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { techStackCompact, techStackFull } from '@/data/techstack';
import { clsx } from 'clsx';

type ViewMode = 'compact' | 'full';

/**
 * Tech Stack section.
 * Compact: 4 curated groups with chip + hover-note layout.
 * Full: all 11 categories in a list-grid after "View All Technologies".
 */
export function TechStackSection() {
    const { theme } = useTheme();
    const [hoveredChip, setHoveredChip] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('compact');

    const isTerminal = theme === 'terminal';
    const isSynthwave = theme === 'synthwave';
    const isWin98 = theme === 'win98';
    const isNewspaper = theme === 'newspaper';

    return (
        <div
            className={clsx(
                'h-full overflow-y-auto px-4 md:px-8 py-6',
                isTerminal && 'scanlines'
            )}
            style={{ background: 'var(--bg)' }}
        >
            {/* Section header */}
            <div className="mb-6">
                {isNewspaper && (
                    <div className="text-xs tracking-[0.4em] uppercase text-[var(--fg-muted)] border-b border-[var(--border)] pb-1 mb-2">
                        Technical Skills
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
                    {isTerminal ? '> Tech Stack' : 'Tech Stack'}
                </h1>
                {isNewspaper && <div className="w-16 h-1 mt-2" style={{ background: 'var(--accent)' }} />}
            </div>

            {viewMode === 'compact' ? (
                <>
                    {/* Compact: 4 groups */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {techStackCompact.map((group) => (
                            <div key={group.label}>
                                <div
                                    className={clsx(
                                        'text-md font-semibold mb-3 pb-1',
                                        isWin98 ? 'border-b-2 border-[var(--accent)]' : 'border-b border-[var(--border)]'
                                    )}
                                    style={{
                                        color: 'var(--accent)',
                                        fontFamily: 'var(--font-mono)',
                                        textTransform: 'uppercase',
                                        letterSpacing: isNewspaper ? '0.2em' : undefined,
                                    }}
                                >
                                    {isTerminal ? `// ${group.label}` : group.label}
                                </div>

                                <div className="flex flex-col flex-wrap gap-2">
                                    {group.items.map((item) => {
                                        const chipKey = `${group.label}-${item.name}`;
                                        const isHovered = hoveredChip === chipKey;
                                        return (
                                            <div
                                                key={item.name}
                                                className="relative"
                                                onMouseEnter={() => item.note && setHoveredChip(chipKey)}
                                                onMouseLeave={() => setHoveredChip(null)}
                                            >
                                                <span
                                                    className={clsx(
                                                        'inline-block text-sm px-2 py-1 border transition-all cursor-default',
                                                        isWin98 ? 'win-btn' : 'border-[var(--border)]',
                                                        isHovered && !isWin98 && 'border-[var(--accent)]',
                                                        isSynthwave && isHovered && 'neon-border'
                                                    )}
                                                    style={{
                                                        fontFamily: 'var(--font-mono)',
                                                        color: isHovered ? 'var(--accent)' : 'var(--fg)',
                                                        background: 'var(--card-bg)',
                                                        borderRadius: 'var(--radius)',
                                                    }}
                                                >
                                                    {item.name}
                                                </span>

                                                {isHovered && item.note && (
                                                    <div
                                                        className="absolute bottom-full left-0 mb-1 px-2 py-1 text-xs whitespace-nowrap z-10 pointer-events-none"
                                                        style={{
                                                            background: 'var(--accent)',
                                                            color: 'var(--bg)',
                                                            fontFamily: 'var(--font-mono)',
                                                            borderRadius: 'var(--radius)',
                                                        }}
                                                    >
                                                        {item.note}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All button */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setViewMode('full')}
                            className={clsx(
                                'px-6 py-2 text-sm border transition-all cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)]',
                                isWin98 ? 'win-btn' : 'border-[var(--border)]'
                            )}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--fg-muted)',
                                borderRadius: 'var(--radius)',
                            }}
                        >
                            View All Technologies
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Back button */}
                    <div className="mb-4">
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

                    {/* Full: 11 categories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                        {techStackFull.map((cat) => (
                            <div
                                key={cat.title}
                                className={clsx(
                                    'p-4 border',
                                    isWin98 ? 'win-chrome' : 'border-[var(--border)]'
                                )}
                                style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius)' }}
                            >
                                {isWin98 && (
                                    <div className="win-titlebar -mx-4 -mt-4 mb-3 px-2 text-xs">
                                        <span>{cat.title}</span>
                                    </div>
                                )}
                                <div
                                    className={clsx(
                                        'text-xs font-semibold mb-2',
                                        isSynthwave && 'neon-glow',
                                        isWin98 && 'hidden'
                                    )}
                                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
                                >
                                    {isTerminal ? `// ${cat.title}` : cat.title}
                                </div>
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: 'var(--fg)', fontFamily: 'var(--font-body)' }}
                                >
                                    {cat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
