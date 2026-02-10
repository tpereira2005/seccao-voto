import { useState, useCallback } from 'react'

const POSTOS_KEY = 'seccao-voto-postos'
const ACTIVE_KEY = 'seccao-voto-active-posto'

const DEFAULT_POSTOS = [
    {
        id: 'default',
        name: 'Posto A',
        location: 'Escola EB 2/3 Maria Lamas',
        address: 'Travessa da Prelada, Porto',
    },
]

function loadPostos() {
    try {
        const raw = localStorage.getItem(POSTOS_KEY)
        if (raw) return JSON.parse(raw)
    } catch { /* ignore */ }
    return DEFAULT_POSTOS
}

function loadActiveId() {
    try {
        return localStorage.getItem(ACTIVE_KEY) || 'default'
    } catch {
        return 'default'
    }
}

export default function usePostos() {
    const [postos, setPostos] = useState(loadPostos)
    const [activeId, setActiveId] = useState(loadActiveId)

    const persist = useCallback((next) => {
        setPostos(next)
        localStorage.setItem(POSTOS_KEY, JSON.stringify(next))
    }, [])

    const switchPosto = useCallback((id) => {
        setActiveId(id)
        localStorage.setItem(ACTIVE_KEY, id)
    }, [])

    const addPosto = useCallback((data) => {
        const id = `posto-${Date.now()}`
        const newPosto = { id, ...data }
        persist(prev => [...prev, newPosto])
        switchPosto(id)
        return id
    }, [persist, switchPosto])

    const updatePosto = useCallback((id, data) => {
        persist(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
    }, [persist])

    const deletePosto = useCallback((id) => {
        persist(prev => prev.filter(p => p.id !== id))
        // If we deleted the active one, switch to first available
        setPostos(current => {
            const remaining = current.filter(p => p.id !== id)
            if (id === activeId && remaining.length > 0) {
                switchPosto(remaining[0].id)
            }
            return remaining
        })
    }, [activeId, switchPosto])

    const activePosto = postos.find(p => p.id === activeId) || postos[0]

    return {
        postos,
        activePosto,
        activeId: activePosto?.id || 'default',
        switchPosto,
        addPosto,
        updatePosto,
        deletePosto,
    }
}
