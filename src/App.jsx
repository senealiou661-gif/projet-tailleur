import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import Clients from './components/Clients.jsx'
import Commandes from './components/Commandes.jsx'
import Paiements from './components/Paiements.jsx'
import { useStore } from './useStore.js'

const TITLES = {
  dashboard: 'Tableau de bord',
  clients: 'Clients',
  commandes: 'Commandes',
  paiements: 'Paiements',
}

export default function App() {
  const [section, setSection] = useState('dashboard')
  const store = useStore()

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <Dashboard clients={store.clients} commandes={store.commandes} />
      case 'clients':
        return <Clients clients={store.clients} commandes={store.commandes} addClient={store.addClient} deleteClient={store.deleteClient} />
      case 'commandes':
        return <Commandes clients={store.clients} commandes={store.commandes} addCommande={store.addCommande} deleteCommande={store.deleteCommande} toggleStatut={store.toggleStatut} />
      case 'paiements':
        return <Paiements clients={store.clients} commandes={store.commandes} />
      default:
        return null
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>
      <Sidebar active={section} onNavigate={setSection} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          height: 56,
          background: 'var(--surface)',
          borderBottom: '0.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          flexShrink: 0,
        }}>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{TITLES[section]}</h1>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>
              {store.clients.length} client{store.clients.length !== 1 ? 's' : ''} · {store.commandes.length} commande{store.commandes.length !== 1 ? 's' : ''}
            </span>
          </div>
        </header>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
