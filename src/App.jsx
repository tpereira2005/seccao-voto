import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import SearchView from './components/SearchView'
import AdminView from './components/AdminView'
import useSections from './hooks/useSections'

export default function App() {
  const [view, setView] = useState('search') // 'search' | 'admin'
  const {
    sections,
    addSection,
    updateSection,
    deleteSection,
    resetToDefault,
  } = useSections()

  return (
    <>
      <div className="bg-gradient" />
      <div className="container">
        <Header view={view} onViewChange={setView} />

        {view === 'search' ? (
          <SearchView sections={sections} />
        ) : (
          <AdminView
            sections={sections}
            onAdd={addSection}
            onUpdate={updateSection}
            onDelete={deleteSection}
            onReset={resetToDefault}
          />
        )}

        <footer className="footer">
          <p>Dados referentes ao Posto A — Escola EB 2/3 Maria Lamas</p>
        </footer>
      </div>
    </>
  )
}
