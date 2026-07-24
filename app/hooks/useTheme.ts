'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    const resolveTheme = () => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return theme
    }

    const currentTheme = resolveTheme()
    setResolvedTheme(currentTheme)

    root.classList.remove('light', 'dark')
    root.classList.add(currentTheme)
    root.style.colorScheme = currentTheme

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark'
    })
  }

  const setThemeDirectly = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme: setThemeDirectly,
  }
}