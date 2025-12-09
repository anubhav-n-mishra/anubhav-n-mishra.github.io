'use client';

import { useState, useEffect } from 'react';
import IDELayout from '@/components/IDELayout';
import LandingPage from '@/components/LandingPage';

export default function Home() {
    const [view, setView] = useState<'landing' | 'ide' | null>(null);
    const [mounted, setMounted] = useState(false);
    const [ideKey, setIdeKey] = useState(0); // Force remount key

    useEffect(() => {
        setMounted(true);
        // Always show landing page first - no auto-redirect based on saved choice
        // This allows users to switch between views easily
        setView('landing');
    }, []);

    const handleSelectIDE = () => {
        // Aggressive cleanup before switching to IDE
        window.scrollTo(0, 0);

        // Remove all data attributes from html and body
        document.documentElement.removeAttribute('data-theme');
        document.body.removeAttribute('data-theme');

        // Remove any portfolio-specific classes
        document.body.className = document.body.className
            .split(' ')
            .filter(cls => !cls.includes('portfolio'))
            .join(' ');

        // Force scroll restoration to manual
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        localStorage.setItem('ide-experience', 'ide');
        setIdeKey(prev => prev + 1); // Increment key to force remount
        setView('ide');
    };

    if (!mounted || view === null) {
        return null;
    }

    if (view === 'landing') {
        return <LandingPage onSelectIDE={handleSelectIDE} />;
    }

    return <IDELayout key={ideKey} />;
}
