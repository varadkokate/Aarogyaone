'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'theme-trust' | 'theme-clinical' | 'theme-wellness' | 'theme-premium'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('theme-trust')

  useEffect(() => {
    const savedTheme = localStorage.getItem('hospital-theme') as Theme
    if (savedTheme && ['theme-trust', 'theme-clinical', 'theme-wellness', 'theme-premium'].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    // Remove all theme classes
    root.classList.remove('theme-trust', 'theme-clinical', 'theme-wellness', 'theme-premium')
    // Add the active theme class
    root.classList.add(theme)
    localStorage.setItem('hospital-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
