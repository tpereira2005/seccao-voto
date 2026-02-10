import { useRef, useEffect } from 'react'

export default function SearchBar({ value, onChange }) {
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleClear = () => {
        onChange('')
        inputRef.current?.focus()
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onChange('')
                inputRef.current?.focus()
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [onChange])

    return (
        <div className="search-card">
            <label className="search-label" htmlFor="nameInput">
                Introduza o nome completo do eleitor
            </label>
            <div className="search-input-wrapper">
                <svg
                    className="search-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    id="nameInput"
                    className="search-input"
                    placeholder="ex: Maria Joana Silva…"
                    autoComplete="off"
                    spellCheck="false"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    className={`clear-btn ${value.length > 0 ? 'visible' : ''}`}
                    onClick={handleClear}
                    title="Limpar"
                >
                    ESC
                </button>
            </div>
        </div>
    )
}
