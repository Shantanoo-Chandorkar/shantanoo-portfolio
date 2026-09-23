'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { SectionId } from '@/lib/types';

const SECTION_IDS: SectionId[] = ['hero', 'experience', 'projects', 'techstack', 'contact'];

function isSectionId(value: string | null): value is SectionId {
    return value !== null && (SECTION_IDS as string[]).includes(value);
}

interface SectionContextValue {
    activeSection: SectionId;
    setActiveSection: (section: SectionId) => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [activeSection, setActiveSectionState] = useState<SectionId>(() => {
        const page = searchParams.get('page');
        return isSectionId(page) ? page : 'hero';
    });

    function setActiveSection(section: SectionId) {
        setActiveSectionState(section);
        router.replace(section === 'hero' ? pathname : `${pathname}?page=${section}`, { scroll: false });
    }

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
