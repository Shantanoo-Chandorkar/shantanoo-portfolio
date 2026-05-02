'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSection } from '@/context/SectionContext';

interface SectionTransitionProps {
    children: ReactNode;
}

/**
 * Wraps section content with a fade + subtle scale transition
 * whenever the active section changes. Duration: 250ms.
 */
export function SectionTransition({ children }: SectionTransitionProps) {
    const { activeSection } = useSection();
    const [visible, setVisible] = useState(true);
    const prevSection = useRef(activeSection);

    useEffect(() => {
        if (prevSection.current === activeSection) return;
        prevSection.current = activeSection;

        setVisible(false);
        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setVisible(true);
            });
        });

        return () => cancelAnimationFrame(raf);
    }, [activeSection]);

    return (
        <div
            className="flex-1 min-h-0 overflow-hidden"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.98)',
                transition: 'opacity 250ms ease, transform 250ms ease',
            }}
        >
            {children}
        </div>
    );
}
