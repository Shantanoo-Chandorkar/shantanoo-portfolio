import type { TechGroup, FullTechCategory } from '@/lib/types';

/**
 * High-impact technologies shown in the default 4-group compact view.
 * Curated to surface the most relevant skills immediately to employers.
 */
export const techStackCompact: TechGroup[] = [
    {
        label: 'Languages',
        items: [
            { name: 'JavaScript (ES6+)', note: 'Primary language' },
            { name: 'TypeScript', note: 'Strong typing' },
            { name: 'PHP', note: 'Backend & plugins' },
            { name: 'C#', note: '.NET ecosystem' },
        ],
    },
    {
        label: 'Frontend',
        items: [
            { name: 'React.js', note: 'Component-based UI' },
            { name: 'Next.js', note: 'Full-stack React' },
            { name: 'Tailwind CSS', note: 'Utility-first CSS' },
            { name: 'ReactFlow', note: 'Node-based diagrams' },
        ],
    },
    {
        label: 'Backend',
        items: [
            { name: 'Node.js', note: 'Server-side JS' },
            { name: '.NET Framework', note: 'C# applications' },
            { name: 'REST APIs', note: 'HTTP integration' },
            { name: 'OAuth 2.0', note: 'Auth protocol' },
        ],
    },
    {
        label: 'Databases',
        items: [
            { name: 'MySQL', note: 'Relational DB' },
            { name: 'PostgreSQL', note: 'Advanced relational' },
            { name: 'MongoDB', note: 'Document DB' },
            { name: 'Redis', note: 'In-memory cache' },
        ],
    },
];

/**
 * Full technology breakdown across all 11 categories.
 * Shown when user clicks "View All Technologies".
 */
export const techStackFull: FullTechCategory[] = [
    {
        title: 'Frontend Development',
        description: 'React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, ReactFlow',
    },
    {
        title: 'Backend Development',
        description: 'PHP, Node.js, .NET Framework, REST APIs, GraphQL, OAuth 2.0',
    },
    {
        title: 'Databases',
        description: 'MySQL, PostgreSQL, MongoDB, Redis',
    },
    {
        title: 'Programming Languages',
        description: 'JavaScript (ES6+), TypeScript, PHP, C#',
    },
    {
        title: 'Testing',
        description: 'PHPUnit, Playwright, Vitest, React Testing Library, PHPCS',
    },
    {
        title: 'Security',
        description: 'OAuth 2.0, Row-Level Security, XSS Prevention, CSRF Prevention, Email Enumeration Prevents, RBAC, CVSS Auditing, Brute-Force Protection',
    },
    {
        title: 'Performance',
        description: 'Core Web Vitals, Lighthouse, Accessibility, Lazy Loading, Profiling, Asynchronous Execution',
    },
    {
        title: 'Development Tools',
        description: 'Linux, Docker, Nginx, Apache, Postman, VS Code',
    },
    {
        title: 'Version Control',
        description: 'Git, GitHub',
    },
    {
        title: 'Build Tools',
        description: 'Vite, Webpack, ESLint, Babel, PhpCodeSniffer',
    },
    {
        title: 'WordPress Ecosystem',
        description: 'WordPress, WooCommerce, WordPress Hooks, Custom DB Tables, REST API Extensions',
    },
];
