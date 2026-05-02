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
            { name: 'PHP', note: 'Backend & WordPress' },
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
            { name: 'MySQL', note: 'Relational DB' },
            { name: 'MongoDB', note: 'Document DB' },
        ],
    },
    {
        label: 'Ecosystem',
        items: [
            { name: 'WordPress', note: 'CMS & plugins' },
            { name: 'WooCommerce', note: 'E-commerce' },
            { name: 'Docker', note: 'Containerization' },
            { name: 'REST APIs', note: 'HTTP integration' },
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
        description: 'React.js, Next.js, TypeScript, JavaScript, jQuery',
    },
    {
        title: 'Backend Development',
        description: 'PHP, Node.js, .NET Framework',
    },
    {
        title: 'Database Management',
        description: 'MySQL, MS-SQL, MongoDB',
    },
    {
        title: 'Programming Languages',
        description: 'JavaScript (ES6+), PHP, C#, TypeScript, C++, Java, Go',
    },
    {
        title: 'Core Concepts',
        description: 'Data Structures & Algorithms, Technical SEO, System Design, Database Management',
    },
    {
        title: 'Web Technologies',
        description: 'REST APIs, GraphQL, WordPress, WooCommerce, Magento',
    },
    {
        title: 'Performance',
        description: 'Core Web Vitals, Technical SEO, Lighthouse, Accessibility',
    },
    {
        title: 'Development Tools',
        description: 'Linux, Docker, Nginx, Apache, Postman, VS Code',
    },
    {
        title: 'Version Control',
        description: 'Git, GitHub, Bitbucket, SVN',
    },
    {
        title: 'Programming Tools',
        description: 'Webpack, ESLint, Babel, Grunt, PhpCodeSniffer',
    },
    {
        title: 'WordPress Plugins',
        description: 'WooCommerce, WPForms, Yoast SEO, Advanced Custom Fields, Elementor',
    },
];
