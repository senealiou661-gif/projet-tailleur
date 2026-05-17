import React from 'react'

const NAVS = [
  { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
  { id: 'clients',   label: 'Clients',         icon: '👥' },
  { id: 'commandes', label: 'Commandes',        icon: '📋' },
  { id: 'paiements', label: 'Paiements',        icon: '💰' },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside style={{
      width: 220,
      background: 'var(--surface)',
      borderRight: '0.5px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '1.25rem 1rem', borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>✂️</span>
          <div>
            <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>AtlierPro</p>
            <p style={{ fontSize: 11, color: 'var(--text3)' }}>Gestion atelier tailleur</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '0.5rem 0', flex: 1 }}>
        {NAVS.map(nav => (
          <button
            key={nav.id}
            onClick={() => onNavigate(nav.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 1rem',
              background: active === nav.id ? 'var(--teal-light)' : 'transparent',
              border: 'none',
              borderLeft: `3px solid ${active === nav.id ? 'var(--teal)' : 'transparent'}`,
              color: active === nav.id ? 'var(--teal-dark)' : 'var(--text2)',
              fontWeight: active === nav.id ? 600 : 400,
              fontSize: 13,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 15 }}>{nav.icon}</span>
            {nav.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '1rem', borderTop: '0.5px solid var(--border)' }}>
        <p style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center' }}>
          AtlierPro v1.0
        </p>
      </div>
    </aside>
  )
}
