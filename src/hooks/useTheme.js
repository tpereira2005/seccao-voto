import { useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'seccao-voto-theme'

function getInitialTheme() {
    try {
        const saved = localStorage.getItem(THEME_KEY)
        if (saved === 'light' || saved === 'dark') return saved
    } catch { /* ignore */ }
    // Respect OS preference
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light'
    return 'dark'
}

export default function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }, [])

    return { theme, toggleTheme }
}
