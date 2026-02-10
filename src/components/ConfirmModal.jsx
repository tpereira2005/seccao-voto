export default function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        {confirmLabel || 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
