'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useSection } from '@/context/SectionContext';
import { ProjectsSlider } from './ProjectsSlider';
import { projects } from '@/data/projects';
import { clsx } from 'clsx';

type ViewMode = 'compact' | 'slider';

/**
 * Projects section. Compact card grid transitions to a full slider
 * when the user clicks "View All Projects".
 */
export function ProjectsSection() {
    const { theme } = useTheme();
    const { activeSection } = useSection();
    const [viewMode, setViewMode] = useState<ViewMode>('compact');
    const [sliderIndex, setSliderIndex] = useState(0);

    const isWin98 = theme === 'win98';
    const isSynthwave = theme === 'synthwave';
    const isTerminal = theme === 'terminal';
    const isNewspaper = theme === 'newspaper';

    useEffect(() => {
        if (activeSection !== 'projects') {
            setViewMode('compact');
            setSliderIndex(0);
        }
    }, [activeSection]);

    if (viewMode === 'slider') {
        return (
            <div className="h-full flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
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
                <ProjectsSlider currentIndex={sliderIndex} onChange={setSliderIndex} />
            </div>
        );
    }

    return (
        <div
            className={clsx(
                'h-full flex flex-col overflow-hidden px-4 md:px-8 pt-6 pb-20 md:py-6',
                isTerminal && 'scanlines'
            )}
            style={{ background: 'var(--bg)' }}
        >
            {/* Section header */}
            <div className="shrink-0 mb-6">
                {isNewspaper && (
                    <div className="text-xs tracking-[0.4em] uppercase text-[var(--fg-muted)] border-b border-[var(--border)] pb-1 mb-2">
                        Portfolio
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
                    {isTerminal ? '> Projects' : 'Projects'}
                </h1>
                {isNewspaper && <div className="w-16 h-1 mt-2" style={{ background: 'var(--accent)' }} />}
            </div>

            {/* Project cards grid */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 md:pb-4">
                    {projects.slice(0, 3).map((project, i) => (
                        <div
                            key={project.id}
                            className={clsx(
                                'border transition-all cursor-pointer hover:border-[var(--accent)] flex flex-col overflow-hidden',
                                isWin98 ? 'win-chrome' : 'border-[var(--border)]'
                            )}
                            style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius)' }}
                            onClick={() => {
                                setSliderIndex(i);
                                setViewMode('slider');
                            }}
                        >
                            {isWin98 ? (
                                <div className="win-titlebar">
                                    <span>{project.title}</span>
                                </div>
                            ) : null}

                            {/* Thumbnail */}
                            <div className="relative h-[15rem] overflow-hidden shrink-0">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} thumbnail`}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                                    }}
                                />
                                {project.inProgress && (
                                    <div
                                        className="absolute top-2 left-2 text-xs px-2 py-0.5"
                                        style={{
                                            background: 'var(--accent)',
                                            color: 'var(--bg)',
                                            fontFamily: 'var(--font-mono)',
                                            borderRadius: 'var(--radius)',
                                        }}
                                    >
                                        In Progress
                                    </div>
                                )}
                            </div>

                            {/* Card body */}
                            <div className="p-3 flex flex-col gap-3 flex-1">
                                {/* Title + description */}
                                <div>
                                    <h3
                                        className="font-semibold text-sm leading-tight"
                                        style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p
                                        className="text-xs leading-relaxed mt-1"
                                        style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}
                                    >
                                        {project.description}
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-1">
                                    {project.features.slice(0, 5).map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-xs px-1.5 py-0.5 border border-[var(--accent)]"
                                            style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius)' }}
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-1.5 py-0.5 border border-[var(--border)]"
                                            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius)' }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-2 mt-auto pt-1">
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className={clsx(
                                            'text-xs px-3 py-1 border transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]',
                                            isWin98 ? 'win-btn' : 'border-[var(--border)]'
                                        )}
                                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', borderRadius: 'var(--radius)' }}
                                    >
                                        GitHub
                                    </a>
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className={clsx(
                                                'text-xs px-3 py-1 border transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]',
                                                isWin98 ? 'win-btn' : 'border-[var(--border)]'
                                            )}
                                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', borderRadius: 'var(--radius)' }}
                                        >
                                            {isTerminal ? 'Live >>' : 'Live'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* View All button */}
            <div className="shrink-0 mt-4 flex justify-center">
                <button
                    onClick={() => setViewMode('slider')}
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
                    View All Projects
                </button>
            </div>
        </div>
    );
}
