import { FaGithub, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import type { SocialLink } from '@/lib/types';

export const socialLinks: SocialLink[] = [
    {
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/Shantanoo-Chandorkar',
    },
    {
        icon: SiLeetcode,
        label: 'LeetCode',
        href: 'https://leetcode.com/u/Shantanoo-Chandorkar',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/shantanoo-chandorkar',
    },
    {
        icon: FaHackerrank,
        label: 'HackerRank',
        href: 'https://hackerrank.com/profile/cshantanoo123',
    },
    {
        icon: SiGeeksforgeeks,
        label: 'GeeksForGeeks',
        href: 'https://geeksforgeeks.org/user/cshantanoo123',
    },
];
