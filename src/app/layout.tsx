import type { Metadata } from 'next';
import {
    IBM_Plex_Mono,
    VT323,
    Orbitron,
    Rajdhani,
    Playfair_Display,
    Special_Elite,
} from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { SectionProvider } from '@/context/SectionContext';

const ibmPlexMono = IBM_Plex_Mono({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    variable: '--font-ibm-plex-mono',
    display: 'swap',
});

const vt323 = VT323({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-vt323',
    display: 'swap',
});

const orbitron = Orbitron({
    weight: ['400', '500', '700', '900'],
    subsets: ['latin'],
    variable: '--font-orbitron',
    display: 'swap',
});

const rajdhani = Rajdhani({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-rajdhani',
    display: 'swap',
});

const playfairDisplay = Playfair_Display({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-playfair-display',
    display: 'swap',
});

const specialElite = Special_Elite({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-special-elite',
    display: 'swap',
});

const w95fa = localFont({
    src: '../../public/fonts/w95f.woff2',
    variable: '--font-w95fa',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Shantanoo Chandorkar, Full Stack Developer',
    description: 'Full Stack Developer building scalable web apps',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const fontVars = [
        ibmPlexMono.variable,
        vt323.variable,
        orbitron.variable,
        rajdhani.variable,
        playfairDisplay.variable,
        specialElite.variable,
        w95fa.variable,
    ].join(' ');

    return (
        <html lang="en" className={`${fontVars} h-full`} suppressHydrationWarning>
            <body className="h-full overflow-hidden">
                <ThemeProvider>
                    <SectionProvider>
                        {children}
                    </SectionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
