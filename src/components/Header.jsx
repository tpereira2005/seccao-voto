import PostoSelector from './PostoSelector'

export default function Header({
    view,
    onViewChange,
    theme,
    onToggleTheme,
    onShare,
    postos,
    activePosto,
    onSwitchPosto,
    onAddPosto,
    onUpdatePosto,
    onDeletePosto,
}) {
    return (
        <header className="header">
            <PostoSelector
                postos={postos}
                activePosto={activePosto}
                onSwitch={onSwitchPosto}
                onAdd={onAddPosto}
                onUpdate={onUpdatePosto}
                onDelete={onDeletePosto}
            />
            <h1>
                Secção
                <br />
                de Voto
            </h1>
            <p className="header-location">
                {activePosto?.location && (
                    <>
                        {activePosto.location}
                        <br />
                    </>
                )}
                {activePosto?.address && <span>{activePosto.address}</span>}
            </p>

            <div className="header-controls">
                <nav className="view-toggle">
                    <button
                        className={`toggle-btn ${view === 'search' ? 'active' : ''}`}
                        onClick={() => onViewChange('search')}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        Pesquisar
                    </button>
                    <button
                        className={`toggle-btn ${view === 'admin' ? 'active' : ''}`}
                        onClick={() => onViewChange('admin')}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        Gerir
                    </button>
                </nav>

                <div className="header-actions">
                    {/* Theme toggle */}
                    <button className="icon-btn" onClick={onToggleTheme} title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}>
                        {theme === 'dark' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2" /><path d="M12 20v2" />
                                <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                                <path d="M2 12h2" /><path d="M20 12h2" />
                                <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                        )}
                    </button>
                    {/* Share */}
                    <button className="icon-btn" onClick={onShare} title="Partilhar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
