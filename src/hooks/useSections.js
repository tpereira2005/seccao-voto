import { useState, useCallback } from 'react'
import defaultSections from '../data/defaultSections'

const STORAGE_KEY = 'voting-sections'

function loadSections() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
    } catch {
        // Corrupted data — fall back to defaults
    }
    return defaultSections
}

function saveSections(sections) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections))
}

function nextId(sections) {
    return sections.length > 0
        ? Math.max(...sections.map(s => s.id)) + 1
        : 1
}

/**
 * Hook for managing voting sections with localStorage persistence.
 * Provides CRUD operations and reset-to-defaults.
 */
export default function useSections() {
    const [sections, setSections] = useState(loadSections)

    const updateAndSave = useCallback((updater) => {
        setSections(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater
            saveSections(next)
            return next
        })
    }, [])

    const addSection = useCallback((section) => {
        updateAndSave(prev => {
            const id = nextId(prev)
            const num = prev.length > 0 ? Math.max(...prev.map(s => s.num)) + 1 : 1
            return [...prev, { ...section, id, num }]
        })
    }, [updateAndSave])

    const updateSection = useCallback((id, updates) => {
        updateAndSave(prev =>
            prev.map(s => (s.id === id ? { ...s, ...updates } : s))
        )
    }, [updateAndSave])

    const deleteSection = useCallback((id) => {
        updateAndSave(prev => {
            const filtered = prev.filter(s => s.id !== id)
            // Re-number sections
            return filtered.map((s, i) => ({ ...s, num: i + 1 }))
        })
    }, [updateAndSave])

    const resetToDefault = useCallback(() => {
        updateAndSave(defaultSections)
    }, [updateAndSave])

    const replaceAll = useCallback((newSections) => {
        const withIds = newSections.map((s, i) => ({
            ...s,
            id: i + 1,
            num: s.num ?? i + 1,
        }))
        updateAndSave(withIds)
    }, [updateAndSave])

    const reorderSection = useCallback((fromIndex, toIndex) => {
        updateAndSave(prev => {
            const next = [...prev]
            const [moved] = next.splice(fromIndex, 1)
            next.splice(toIndex, 0, moved)
            return next.map((s, i) => ({ ...s, num: i + 1 }))
        })
    }, [updateAndSave])

    return {
        sections,
        addSection,
        updateSection,
        deleteSection,
        resetToDefault,
        replaceAll,
        reorderSection,
    }
}
