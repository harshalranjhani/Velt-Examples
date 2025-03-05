'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/app/components/ui/button'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export function ThemeSwitcher() {
  // Add mounted state to handle client-side rendering
  const [mounted, setMounted] = useState(false)
  // Use resolvedTheme instead of theme
  const { resolvedTheme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Render a placeholder with the same dimensions during SSR to prevent layout shift
  if (!mounted) {
    return (
      <Button 
        variant="outline" 
        size="icon" 
        className="mr-2"
      >
        <span className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme} 
      className="mr-2"
      title={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </Button>
  )
} 