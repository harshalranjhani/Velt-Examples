'use client'

import { useState, useEffect } from 'react';
import { UserAuth } from '@/components/auth/UserAuth';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { VeltPresence } from '@veltdev/react';
import { TiptapEditor } from '@/components/editor/TiptapEditor';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('userData'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <UserAuth />
        <div className="flex items-center">
          <ThemeSwitcher />
          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
      
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Collaborative Emails</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Collaborate on your emails with your team</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
        <div className="md:col-span-4 flex flex-col">
          <TiptapEditor />
        </div>
        
        <div className="md:col-span-1 flex flex-col space-y-4">
          <div className="p-4 border rounded-lg bg-card shadow-sm h-fit">
            <h2 className="text-lg font-medium mb-2">Collaborators</h2>
            <VeltPresence />
          </div>
        </div>
      </div>
    </div>
  );
}