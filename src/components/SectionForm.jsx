import { useState } from 'react'

export default function SectionForm({ initial, onSave, onCancel }) {
    const [from, setFrom] = useState(initial?.from || '')
    const [to, setTo] = useState(initial?.to || '')

    const isValid = from.trim().length > 0 && to.trim().length > 0

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isValid) return
        onSave({ from: from.trim().toUpperCase(), to: to.trim().toUpperCase() })
    }

    return (
        <form className="section-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">De (primeiro eleitor)</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="ex: MARIA JOANA SILVA"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    autoFocus
                />
            </div>
            <div className="form-group">
                <label className="form-label">Até (último eleitor)</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="ex: PEDRO MANUEL COSTA"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
            </div>
            <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={!isValid}>
                    {initial ? 'Guardar' : 'Adicionar'}
                </button>
            </div>
        </form>
    )
}
