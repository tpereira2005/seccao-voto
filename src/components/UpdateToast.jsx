import { useState, useEffect } from 'react'

export default function UpdateToast() {
    const [showUpdate, setShowUpdate] = useState(false)

    useEffect(() => {
        // Listen for service worker updates
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setShowUpdate(true)
                            }
                        })
                    }
                })
            })
        }
    }, [])

    if (!showUpdate) return null

    return (
        <div className="update-toast">
            <div className="update-toast-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M21 21v-5h-5" />
                </svg>
                <span>Nova versão disponível</span>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => window.location.reload()}
                >
                    Atualizar
                </button>
                <button
                    className="update-toast-close"
                    onClick={() => setShowUpdate(false)}
                    aria-label="Fechar"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
