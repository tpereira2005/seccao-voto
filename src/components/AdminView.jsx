import { useState } from 'react'
import SectionForm from './SectionForm'
import ConfirmModal from './ConfirmModal'

export default function AdminView({ sections, onAdd, onUpdate, onDelete, onReset }) {
    const [editingId, setEditingId] = useState(null)
    const [showAdd, setShowAdd] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(null) // section id
    const [confirmReset, setConfirmReset] = useState(false)

    const handleSaveEdit = (id, data) => {
        onUpdate(id, data)
        setEditingId(null)
    }

    const handleAdd = (data) => {
        onAdd(data)
        setShowAdd(false)
    }

    const handleConfirmDelete = () => {
        if (confirmDelete !== null) {
            onDelete(confirmDelete)
            setConfirmDelete(null)
        }
    }

    const handleConfirmReset = () => {
        onReset()
        setConfirmReset(false)
    }

    return (
        <div className="admin-view fade-in">
            <div className="admin-header">
                <div>
                    <h2 className="admin-title">Gerir Secções de Voto</h2>
                    <p className="admin-subtitle">{sections.length} secções configuradas</p>
                </div>
                <div className="admin-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                        Repor Original
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Adicionar
                    </button>
                </div>
            </div>

            {showAdd && (
                <div className="admin-form-card">
                    <h3 className="form-card-title">Nova Secção</h3>
                    <SectionForm onSave={handleAdd} onCancel={() => setShowAdd(false)} />
                </div>
            )}

            <div className="admin-list">
                {sections.map((section) => (
                    <div key={section.id} className="admin-card">
                        {editingId === section.id ? (
                            <div className="admin-form-inline">
                                <SectionForm
                                    initial={section}
                                    onSave={(data) => handleSaveEdit(section.id, data)}
                                    onCancel={() => setEditingId(null)}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="admin-card-header">
                                    <div className="admin-card-num">
                                        <span className="num">{section.num}</span>
                                        Secção n.º {section.num}
                                    </div>
                                    <div className="admin-card-actions">
                                        <button
                                            className="icon-btn"
                                            onClick={() => setEditingId(section.id)}
                                            title="Editar"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                <path d="m15 5 4 4" />
                                            </svg>
                                        </button>
                                        <button
                                            className="icon-btn icon-btn-danger"
                                            onClick={() => setConfirmDelete(section.id)}
                                            title="Remover"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="admin-card-range">
                                    <div className="range-row">
                                        <span className="range-label">De</span>
                                        <span className="range-name">{section.from}</span>
                                    </div>
                                    <div className="range-divider" />
                                    <div className="range-row">
                                        <span className="range-label">Até</span>
                                        <span className="range-name">{section.to}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {sections.length === 0 && (
                <div className="empty-state">
                    <div className="icon">📋</div>
                    <p>Nenhuma secção configurada</p>
                    <p className="hint">Adicione secções ou reponha os dados originais</p>
                </div>
            )}

            {confirmDelete !== null && (
                <ConfirmModal
                    title="Remover Secção"
                    message="Tem a certeza que deseja remover esta secção? As restantes serão renumeradas automaticamente."
                    confirmLabel="Remover"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}

            {confirmReset && (
                <ConfirmModal
                    title="Repor Dados Originais"
                    message="Todas as secções atuais serão substituídas pelos dados originais. Esta ação não pode ser revertida."
                    confirmLabel="Repor"
                    onConfirm={handleConfirmReset}
                    onCancel={() => setConfirmReset(false)}
                />
            )}
        </div>
    )
}
