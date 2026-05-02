'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { SectionId } from '@/lib/types';

interface SectionContextValue {
    activeSection: SectionId;
    setActiveSection: (section: SectionId) => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState<SectionId>('hero');

    return (
        <SectionContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </SectionContext.Provider>
    );
}

export function useSection(): SectionContextValue {
    const ctx = useContext(SectionContext);
    if (!ctx) throw new Error('useSection must be used inside SectionProvider');
    return ctx;
}
