'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface EmailTemplateProps {
  children: React.ReactNode
  className?: string
}

export function EmailTemplate({ children, className }: EmailTemplateProps) {
  const { resolvedTheme } = useTheme()
  
  return (
    <div className="h-full flex-1 overflow-auto px-4 py-8">
      <div 
        className={cn(
          "w-full max-w-3xl mx-auto rounded-lg overflow-hidden",
          "bg-card border shadow-sm",
          className
        )}
      >
        <div className={cn(
          "p-6 relative",
          resolvedTheme === 'dark' ? 'bg-card' : 'bg-white',
        )}>
          {children}
        </div>
      </div>
    </div>
  )
} 