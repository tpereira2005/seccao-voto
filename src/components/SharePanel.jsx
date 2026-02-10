import { useState, useEffect } from 'react'
import { generateQRCodeURL, getShareURL } from '../utils/qr'

export default function SharePanel({ onClose }) {
    const [copied, setCopied] = useState(false)
    const shareURL = getShareURL()
    const qrURL = generateQRCodeURL(shareURL, 200)

    useEffect(() => {
        if (copied) {
            const t = setTimeout(() => setCopied(false), 2000)
            return () => clearTimeout(t)
        }
    }, [copied])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareURL)
            setCopied(true)
        } catch {
            // Fallback
            const input = document.createElement('input')
            input.value = shareURL
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            setCopied(true)
        }
    }

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Secção de Voto',
                    text: 'Descobre a tua secção de voto',
                    url: shareURL,
                })
            } catch { /* user cancelled */ }
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card share-modal" onClick={e => e.stopPropagation()}>
                <div className="share-header">
                    <h3 className="modal-title">Partilhar</h3>
                    <button className="icon-btn" onClick={onClose} aria-label="Fechar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="qr-container">
                    <img
                        src={qrURL}
                        alt="QR Code"
                        className="qr-image"
                        width="180"
                        height="180"
                    />
                </div>

                <p className="share-url">{shareURL}</p>

                <div className="share-actions">
                    <button className="btn btn-ghost" onClick={handleCopy}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        {copied ? 'Copiado!' : 'Copiar Link'}
                    </button>

                    {navigator.share && (
                        <button className="btn btn-primary" onClick={handleNativeShare}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                <polyline points="16 6 12 2 8 6" />
                                <line x1="12" y1="2" x2="12" y2="15" />
                            </svg>
                            Partilhar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
