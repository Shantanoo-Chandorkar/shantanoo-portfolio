'use client';

import { useSection } from '@/context/SectionContext';
import { SectionTransition } from '@/components/shared/SectionTransition';
import { Navbar } from '@/components/layout/Navbar';
import { ResumeButton } from '@/components/layout/ResumeButton';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
    const { activeSection } = useSection();

    return (
        <main className="h-screen overflow-hidden flex flex-col relative" style={{ background: 'var(--bg)' }}>
            <Navbar />
            <SectionTransition>
                {activeSection === 'hero' && <HeroSection />}
                {activeSection === 'experience' && <ExperienceSection />}
                {activeSection === 'projects' && <ProjectsSection />}
                {activeSection === 'techstack' && <TechStackSection />}
                {activeSection === 'contact' && <ContactSection />}
            </SectionTransition>
            <ResumeButton />
        </main>
    );
}
