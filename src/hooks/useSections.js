import { useState, useCallback } from 'react'
import defaultSections from '../data/defaultSections'

const STORAGE_KEY = 'seccao-voto-sections'

function loadSections(postoId) {
    const key = postoId ? `${STORAGE_KEY}-${postoId}` : STORAGE_KEY
    try {
        const raw = localStorage.getItem(key)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore */ }
    return postoId === 'default' || !postoId ? defaultSections : []
}

function saveSections(sections, postoId) {
    const key = postoId ? `${STORAGE_KEY}-${postoId}` : STORAGE_KEY
    localStorage.setItem(key, JSON.stringify(sections))
}

function renumber(sections) {
    return sections.map((s, i) => ({ ...s, num: i + 1 }))
}

export default function useSections(postoId) {
    const [sections, setSections] = useState(() => loadSections(postoId))

    const persist = useCallback((next) => {
        setSections(next)
        saveSections(next, postoId)
    }, [postoId])

    const addSection = useCallback((data) => {
        persist(prev => {
            const maxId = prev.reduce((m, s) => Math.max(m, s.id), 0)
            const next = [...prev, { id: maxId + 1, num: prev.length + 1, ...data }]
            return renumber(next)
        })
    }, [persist])

    const updateSection = useCallback((id, data) => {
        persist(prev => renumber(prev.map(s => s.id === id ? { ...s, ...data } : s)))
    }, [persist])

    const deleteSection = useCallback((id) => {
        persist(prev => renumber(prev.filter(s => s.id !== id)))
    }, [persist])

    const resetToDefault = useCallback(() => {
        persist(defaultSections)
    }, [persist])

    const replaceAll = useCallback((newSections) => {
        persist(renumber(newSections))
    }, [persist])

    const reload = useCallback(() => {
        setSections(loadSections(postoId))
    }, [postoId])

    return {
        sections,
        addSection,
        updateSection,
        deleteSection,
        resetToDefault,
        replaceAll,
        reload,
    }
}
