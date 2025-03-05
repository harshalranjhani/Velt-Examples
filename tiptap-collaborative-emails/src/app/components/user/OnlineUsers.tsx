'use client'

import { useVeltClient, VeltPresence } from '@veltdev/react';

export function OnlineUsers() {
  const { client } = useVeltClient();

  if (!client) return null;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-medium mb-3">Who's Online</h2>
      <VeltPresence />
    </div>
  );
} 