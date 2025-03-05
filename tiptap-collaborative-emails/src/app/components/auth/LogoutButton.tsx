'use client'

import { useVeltClient } from '@veltdev/react';
import { Button } from '@/app/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { client } = useVeltClient();

  const handleLogout = async () => {
    if (client) {
      await client.signOutUser();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userData');
        window.location.reload();
      }
    }
  };

  if (typeof window === 'undefined') return null;
  
  const isAuthenticated = !!localStorage.getItem('userData');
  if (!isAuthenticated) return null;

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 gap-2"
    >
      <span>Logout</span>
      <LogOut className="h-4 w-4" />
    </Button>
  );
} 