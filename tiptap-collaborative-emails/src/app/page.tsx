'use client'

import { useState, useEffect } from 'react';
import { UserAuth } from './components/auth/UserAuth';
import { LogoutButton } from './components/auth/LogoutButton';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('userData'));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <UserAuth />
      {isAuthenticated && <LogoutButton />}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Collaborative Emails</h1>
        <p className="text-gray-600">Collaborate on your emails with your team</p>
      </header>
    </div>
  );
}