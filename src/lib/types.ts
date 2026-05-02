import type { IconType } from 'react-icons';

export type Theme = 'terminal' | 'synthwave' | 'win98' | 'newspaper';

export type SectionId = 'hero' | 'experience' | 'projects' | 'techstack' | 'contact';

export interface ExperienceEntry {
    id: number;
    company: string;
    position: string;
    period: string;
    location: string;
    shortDescription: string;
    description: string[];
    technologies: string[];
    highlights: string[];
}

export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    image: string;
    githubUrl: string;
    liveUrl: string;
    features: string[];
    inProgress?: boolean;
}

export interface TechItem {
    name: string;
    note?: string;
}

export interface TechGroup {
    label: string;
    items: TechItem[];
}

export interface FullTechCategory {
    title: string;
    description: string;
}

export interface SocialLink {
    icon: IconType;
    label: string;
    href: string;
}

export interface HeroData {
    name: string;
    tagline: string;
    bio: string;
    primaryCTA: string;
    secondaryCTA: string;
}

export interface ContactData {
    email: string;
    location: string;
    locationHref: string;
}
