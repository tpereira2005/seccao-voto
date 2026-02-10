import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/Header'
import SearchView from './components/SearchView'
import AdminView from './components/AdminView'
import UpdateToast from './components/UpdateToast'
import SharePanel from './components/SharePanel'
import useSections from './hooks/useSections'
import usePostos from './hooks/usePostos'
import useTheme from './hooks/useTheme'
import useStats from './hooks/useStats'

export default function App() {
  const [view, setView] = useState('search')
  const [showShare, setShowShare] = useState(false)

  const { postos, activePosto, activeId, switchPosto, addPosto, updatePosto, deletePosto } = usePostos()
  const { theme, toggleTheme } = useTheme()
  const {
    sections,
    addSection,
    updateSection,
    deleteSection,
    resetToDefault,
    replaceAll,
    reload: reloadSections,
  } = useSections(activeId)
  const {
    totalSearches,
    uniqueNamesCount,
    lastSearchTime,
    trackSearch,
    resetStats,
    reload: reloadStats,
  } = useStats(activeId)

  // Reload data when switching postos
  useEffect(() => {
    reloadSections()
    reloadStats()
  }, [activeId, reloadSections, reloadStats])

  return (
    <>
      <div className="bg-gradient" />
      <div className="container">
        <Header
          view={view}
          onViewChange={setView}
          theme={theme}
          onToggleTheme={toggleTheme}
          onShare={() => setShowShare(true)}
          postos={postos}
          activePosto={activePosto}
          onSwitchPosto={switchPosto}
          onAddPosto={addPosto}
          onUpdatePosto={updatePosto}
          onDeletePosto={deletePosto}
        />

        {view === 'search' ? (
          <SearchView
            sections={sections}
            trackSearch={trackSearch}
          />
        ) : (
          <AdminView
            sections={sections}
            postoName={activePosto?.name}
            onAdd={addSection}
            onUpdate={updateSection}
            onDelete={deleteSection}
            onReset={resetToDefault}
            onReplaceAll={replaceAll}
            totalSearches={totalSearches}
            uniqueNamesCount={uniqueNamesCount}
            lastSearchTime={lastSearchTime}
            onResetStats={resetStats}
          />
        )}

        <footer className="footer">
          <p>
            {activePosto?.name}
            {activePosto?.location ? ` — ${activePosto.location}` : ''}
          </p>
        </footer>
      </div>

      {showShare && <SharePanel onClose={() => setShowShare(false)} />}
      <UpdateToast />
    </>
  )
}
