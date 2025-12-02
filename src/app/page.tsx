'use client';

import { useState, useEffect } from 'react';
import IDELayout from '@/components/IDELayout';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const [view, setView] = useState<'landing' | 'ide' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Always show landing page first - no auto-redirect based on saved choice
    // This allows users to switch between views easily
    setView('landing');
  }, []);

  const handleSelectIDE = () => {
    localStorage.setItem('ide-experience', 'ide');
    setView('ide');
  };

  if (!mounted || view === null) {
    return null;
  }

  if (view === 'landing') {
    return <LandingPage onSelectIDE={handleSelectIDE} />;
  }

  return <IDELayout />;
}
