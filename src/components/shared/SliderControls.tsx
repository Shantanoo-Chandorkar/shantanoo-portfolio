'use client';

import { useTheme } from '@/context/ThemeContext';
import { clsx } from 'clsx';

interface SliderControlsProps {
    total: number;
    current: number;
    onChange: (index: number) => void;
    onPrev: () => void;
    onNext: () => void;
    labels?: string[];
}

/**
 * Reusable slider navigation: numbered tabs, left/right arrows, dot pagination.
 * Styling adapts automatically via CSS variables per theme.
 */
export function SliderControls({
    total,
    current,
    onChange,
    onPrev,
    onNext,
    labels,
}: SliderControlsProps) {
    const { theme } = useTheme();

    const isTerminal = theme === 'terminal';
    const isSynthwave = theme === 'synthwave';
    const isWin98 = theme === 'win98';

    const arrowLeft = isTerminal ? '<' : isWin98 ? '◄' : '←';
    const arrowRight = isTerminal ? '>' : isWin98 ? '►' : '→';

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            {/* Numbered tabs */}
            <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: total }, (_, i) => {
                    const label = labels?.[i] ?? String(i + 1).padStart(2, '0');
                    const isActive = i === current;
                    return (
                        <button
                            key={i}
                            onClick={() => onChange(i)}
                            className={clsx(
                                'px-3 py-1 text-sm font-mono transition-all cursor-pointer',
                                isWin98 ? 'win-btn' : 'border',
                                isActive
                                    ? isSynthwave
                                        ? 'neon-border text-[var(--accent)]'
                                        : 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                                    : 'border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]'
                            )}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                borderRadius: 'var(--radius)',
                            }}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Arrows row */}
            <div className="flex items-center gap-6">
                <button
                    onClick={onPrev}
                    disabled={total <= 1}
                    aria-label="Previous"
                    className={clsx(
                        'px-4 py-2 text-lg transition-all cursor-pointer disabled:opacity-30',
                        isWin98 ? 'win-btn text-sm' : 'border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
                        isSynthwave && 'neon-border'
                    )}
                    style={{ fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius)' }}
                >
                    {arrowLeft}
                </button>

                {/* Dot pagination */}
                <div className="flex gap-2">
                    {Array.from({ length: total }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={clsx(
                                'rounded-full transition-all cursor-pointer',
                                i === current
                                    ? 'w-4 h-3 bg-[var(--accent)]'
                                    : 'w-2 h-2 mt-0.5 bg-[var(--border)] hover:bg-[var(--fg-muted)]'
                            )}
                        />
                    ))}
                </div>

                <button
                    onClick={onNext}
                    disabled={total <= 1}
                    aria-label="Next"
                    className={clsx(
                        'px-4 py-2 text-lg transition-all cursor-pointer disabled:opacity-30',
                        isWin98 ? 'win-btn text-sm' : 'border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
                        isSynthwave && 'neon-border'
                    )}
                    style={{ fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius)' }}
                >
                    {arrowRight}
                </button>
            </div>
        </div>
    );
}
