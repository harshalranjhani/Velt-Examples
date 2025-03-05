'use client'

import { useState, useEffect } from 'react';
import { UserAuth } from './components/auth/UserAuth';
import { LogoutButton } from './components/auth/LogoutButton';
import { VeltPresence } from '@veltdev/react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('userData'));
  }, []);

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <UserAuth />
        {isAuthenticated && <LogoutButton />}
      </div>
      <VeltPresence />
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Collaborative Emails</h1>
        <p className="text-sm sm:text-base text-gray-600">Collaborate on your emails with your team</p>
      </header>
      <div className="flex-1">
        {/* Main content goes here */}
      </div>
    </div>
  );
}