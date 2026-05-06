'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { SliderControls } from '@/components/shared/SliderControls';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { useSwipe } from '@/hooks/useSwipe';
import { projects } from '@/data/projects';
import { clsx } from 'clsx';

interface ProjectsSliderProps {
    currentIndex: number;
    onChange: (index: number) => void;
}

/**
 * Full slider view for a single project.
 * Left: project screenshot in a themed frame. Right: title, description, tech, links.
 */
export function ProjectsSlider({ currentIndex, onChange }: ProjectsSliderProps) {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    const isWin98 = theme === 'win98';
    const isSynthwave = theme === 'synthwave';
    const isTerminal = theme === 'terminal';

    function prev() { onChange((currentIndex - 1 + projects.length) % projects.length); }
    function next() { onChange((currentIndex + 1) % projects.length); }

    useKeyboardNav(containerRef, { onPrev: prev, onNext: next });
    useSwipe(containerRef, { onSwipeLeft: next, onSwipeRight: prev });

    const project = projects[currentIndex];

    return (
        <div ref={containerRef} className="h-full flex flex-col p-4 md:p-6 gap-4 overflow-hidden">
            <SliderControls
                total={projects.length}
                current={currentIndex}
                onChange={onChange}
                onPrev={prev}
                onNext={next}
                labels={projects.map((_, i) => String(i + 1).padStart(2, '0'))}
            />

            <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 overflow-hidden">
                {/* Image panel */}
                <div
                    className={clsx(
                        'md:w-1/2 shrink-0 flex flex-col overflow-hidden',
                        isWin98 && 'win-chrome',
                        isSynthwave && 'neon-border rounded',
                        isTerminal && 'border border-[var(--border)]'
                    )}
                    style={{ borderRadius: 'var(--radius)' }}
                >
                    {isWin98 && (
                        <div className="win-titlebar shrink-0">
                            <span>{project.title}.bmp</span>
                            <div className="win-titlebar-dots">
                                <span className="win-btn">_</span>
                                <span className="win-btn">□</span>
                                <span className="win-btn">×</span>
                            </div>
                        </div>
                    )}
                    {isTerminal && (
                        <div className="px-2 py-1 text-xs" style={{ background: 'var(--card-bg)', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                            $ cat {project.title.toLowerCase().replace(/\s+/g, '_')}.png
                        </div>
                    )}
                    <div className="relative flex-1 min-h-0" style={{ minHeight: '180px' }}>
                        <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                        />
                        {project.inProgress && (
                            <div
                                className="absolute top-2 left-2 text-xs px-2 py-0.5 border"
                                style={{
                                    background: 'var(--accent)',
                                    color: 'var(--bg)',
                                    borderColor: 'var(--accent)',
                                    fontFamily: 'var(--font-mono)',
                                    borderRadius: 'var(--radius)',
                                }}
                            >
                                In Progress
                            </div>
                        )}
                    </div>
                </div>

                {/* Details panel */}
                <div
                    className={clsx(
                        'flex-1 min-w-0 overflow-y-auto',
                        isWin98 && 'win-chrome'
                    )}
                    style={{ borderRadius: 'var(--radius)' }}
                >
                    {isWin98 && (
                        <div className="win-titlebar">
                            <span>{project.title}, Details</span>
                            <div className="win-titlebar-dots">
                                <span className="win-btn">_</span>
                                <span className="win-btn">□</span>
                                <span className="win-btn">×</span>
                            </div>
                        </div>
                    )}
                    <div className="p-4 pb-20 md:p-6" style={{ background: 'var(--card-bg)' }}>
                        <h2
                            className={clsx('text-xl font-bold mb-1', isSynthwave && 'neon-glow')}
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                        >
                            {project.title}
                        </h2>

                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
                            {project.longDescription}
                        </p>

                        {/* Features */}
                        <div className="mb-4">
                            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                                {isTerminal ? '// Features' : 'Features'}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {project.features.map((f) => (
                                    <span
                                        key={f}
                                        className="text-xs px-2 py-0.5 border"
                                        style={{
                                            borderColor: isWin98 ? 'var(--accent)' : 'var(--accent-2)',
                                            color: isWin98 ? 'var(--accent)' : 'var(--accent-2)',
                                            fontFamily: 'var(--font-mono)',
                                            borderRadius: 'var(--radius)',
                                        }}
                                    >
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tech chips */}
                        <div className="mb-4 flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2 py-0.5 border"
                                    style={{
                                        borderColor: 'var(--border)',
                                        color: 'var(--accent-2)',
                                        fontFamily: 'var(--font-mono)',
                                        borderRadius: 'var(--radius)',
                                        background: 'var(--bg)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3 flex-wrap">
                            {project.githubUrl && project.githubUrl !== '#' && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={clsx(
                                        'text-sm px-4 py-2 border transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]',
                                        isWin98 ? 'win-btn' : 'border-[var(--border)]'
                                    )}
                                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg)', borderRadius: 'var(--radius)' }}
                                >
                                    {isTerminal ? '$ git clone' : 'GitHub'}
                                </a>
                            )}
                            {project.liveUrl && project.liveUrl !== '#' && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={clsx(
                                        'text-sm px-4 py-2 border transition-all',
                                        isWin98 ? 'win-btn' : 'border-[var(--accent)]',
                                        isSynthwave && 'neon-border'
                                    )}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        background: isWin98 ? 'var(--card-bg)' : 'var(--accent)',
                                        color: isWin98 ? '#000' : 'var(--bg)',
                                        borderRadius: 'var(--radius)',
                                    }}
                                >
                                    {isTerminal ? '$ open ./live' : 'Live'}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
