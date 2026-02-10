import { useState, useCallback } from 'react'

const STATS_KEY = 'seccao-voto-stats'

function loadStats(postoId) {
    try {
        const raw = localStorage.getItem(`${STATS_KEY}-${postoId}`)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore */ }
    return { totalSearches: 0, uniqueNames: [], lastSearchTime: null }
}

function saveStats(stats, postoId) {
    localStorage.setItem(`${STATS_KEY}-${postoId}`, JSON.stringify(stats))
}

export default function useStats(postoId) {
    const [stats, setStats] = useState(() => loadStats(postoId))

    const trackSearch = useCallback((query) => {
        const trimmed = query.trim().toUpperCase()
        if (!trimmed) return

        setStats(prev => {
            const uniqueNames = prev.uniqueNames.includes(trimmed)
                ? prev.uniqueNames
                : [...prev.uniqueNames, trimmed]
            const next = {
                totalSearches: prev.totalSearches + 1,
                uniqueNames,
                lastSearchTime: new Date().toISOString(),
            }
            saveStats(next, postoId)
            return next
        })
    }, [postoId])

    const resetStats = useCallback(() => {
        const empty = { totalSearches: 0, uniqueNames: [], lastSearchTime: null }
        setStats(empty)
        saveStats(empty, postoId)
    }, [postoId])

    const reload = useCallback(() => {
        setStats(loadStats(postoId))
    }, [postoId])

    return {
        totalSearches: stats.totalSearches,
        uniqueNamesCount: stats.uniqueNames.length,
        lastSearchTime: stats.lastSearchTime,
        trackSearch,
        resetStats,
        reload,
    }
}
