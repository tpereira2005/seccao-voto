export default function StatsPanel({ totalSearches, uniqueNamesCount, lastSearchTime, onReset }) {
    const formatTime = (iso) => {
        if (!iso) return '—'
        try {
            const d = new Date(iso)
            return d.toLocaleString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })
        } catch {
            return '—'
        }
    }

    return (
        <div className="stats-panel">
            <div className="stats-header">
                <h3 className="stats-title">Estatísticas</h3>
                {totalSearches > 0 && (
                    <button className="icon-btn" onClick={onReset} title="Limpar estatísticas">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-value">{totalSearches}</span>
                    <span className="stat-label">Pesquisas</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{uniqueNamesCount}</span>
                    <span className="stat-label">Nomes Únicos</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{formatTime(lastSearchTime)}</span>
                    <span className="stat-label">Última Pesquisa</span>
                </div>
            </div>
        </div>
    )
}
