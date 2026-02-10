import { useState } from 'react'

export default function PostoSelector({ postos, activePosto, onSwitch, onAdd, onUpdate, onDelete }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({ name: '', location: '', address: '' })

    const handleSelect = (id) => {
        onSwitch(id)
        setIsOpen(false)
    }

    const handleStartAdd = () => {
        setFormData({ name: '', location: '', address: '' })
        setShowAdd(true)
    }

    const handleSaveNew = () => {
        if (!formData.name.trim()) return
        onAdd(formData)
        setShowAdd(false)
        setIsOpen(false)
    }

    const handleStartEdit = (posto) => {
        setFormData({ name: posto.name, location: posto.location || '', address: posto.address || '' })
        setEditingId(posto.id)
    }

    const handleSaveEdit = () => {
        if (!formData.name.trim()) return
        onUpdate(editingId, formData)
        setEditingId(null)
    }

    return (
        <div className="posto-selector">
            <button
                className="header-badge posto-badge"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="dot" />
                {activePosto?.name || 'Posto'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {isOpen && (
                <div className="posto-dropdown">
                    <div className="posto-dropdown-list">
                        {postos.map(posto => (
                            <div key={posto.id} className="posto-dropdown-item">
                                {editingId === posto.id ? (
                                    <div className="posto-edit-form">
                                        <input
                                            className="form-input form-input-sm"
                                            value={formData.name}
                                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                            placeholder="Nome do posto"
                                            autoFocus
                                        />
                                        <input
                                            className="form-input form-input-sm"
                                            value={formData.location}
                                            onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                                            placeholder="Local (ex: Escola...)"
                                        />
                                        <input
                                            className="form-input form-input-sm"
                                            value={formData.address}
                                            onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                                            placeholder="Morada"
                                        />
                                        <div className="posto-edit-actions">
                                            <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>Guardar</button>
                                            <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Cancelar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        className={`posto-option ${posto.id === activePosto?.id ? 'active' : ''}`}
                                        onClick={() => handleSelect(posto.id)}
                                    >
                                        <div className="posto-option-info">
                                            <span className="posto-option-name">{posto.name}</span>
                                            {posto.location && <span className="posto-option-loc">{posto.location}</span>}
                                        </div>
                                        <div className="posto-option-actions" onClick={e => e.stopPropagation()}>
                                            <button className="icon-btn icon-btn-sm" onClick={() => handleStartEdit(posto)} title="Editar">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                </svg>
                                            </button>
                                            {postos.length > 1 && (
                                                <button className="icon-btn icon-btn-sm icon-btn-danger" onClick={() => onDelete(posto.id)} title="Remover">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {showAdd ? (
                        <div className="posto-add-form">
                            <input
                                className="form-input form-input-sm"
                                value={formData.name}
                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                placeholder="Nome do posto"
                                autoFocus
                            />
                            <input
                                className="form-input form-input-sm"
                                value={formData.location}
                                onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                                placeholder="Local"
                            />
                            <input
                                className="form-input form-input-sm"
                                value={formData.address}
                                onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                                placeholder="Morada"
                            />
                            <div className="posto-edit-actions">
                                <button className="btn btn-primary btn-sm" onClick={handleSaveNew}>Criar</button>
                                <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <button className="posto-add-btn" onClick={handleStartAdd}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Novo Posto
                        </button>
                    )}
                </div>
            )}

            {isOpen && <div className="posto-backdrop" onClick={() => setIsOpen(false)} />}
        </div>
    )
}
