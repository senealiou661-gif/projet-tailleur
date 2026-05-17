import React from 'react'
import { fmt, fmtDate, Badge, Avatar } from '../utils.jsx'

const MONTHS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']

function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1rem 1.25rem',
      borderTop: `3px solid ${accent || 'var(--teal)'}`,
    }}>
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 600, color: 'var(--text)' }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{sub}</p>}
    </div>
  )
}

export default function Dashboard({ clients, commandes }) {
  const totalAvances = commandes.reduce((s, c) => s + (c.avance || 0), 0)
  const enCours = commandes.filter(c => c.statut !== 'Livré').length

  // Chart: commandes by month
  const counts = new Array(12).fill(0)
  commandes.forEach(c => {
    const m = new Date(c.createdAt).getMonth()
    counts[m]++
  })
  const max = Math.max(...counts, 1)

  const recent = [...commandes].reverse().slice(0, 5)

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <StatCard icon="👥" label="Clients" value={clients.length} sub="enregistrés" accent="var(--teal)" />
        <StatCard icon="📋" label="Commandes" value={commandes.length} sub="total" accent="#185FA5" />
        <StatCard icon="⏳" label="En cours" value={enCours} sub="à livrer" accent="var(--amber)" />
        <StatCard icon="💵" label="Recettes" value={totalAvances.toLocaleString('fr-FR')} sub="FCFA encaissé" accent="#639922" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        {/* Recent orders */}
        <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem' }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Commandes récentes</p>
          {recent.length === 0 ? (
            <p style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '2rem 0' }}>Aucune commande pour l'instant.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Client','Article','Statut','Montant'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontWeight: 500, fontSize: 11, color: 'var(--text3)', paddingBottom: 8, borderBottom: '0.5px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((c, i) => {
                  const cl = clients[c.clientIndex] || {}
                  return (
                    <tr key={i}>
                      <td style={{ padding: '9px 0', borderBottom: '0.5px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Avatar prenom={cl.prenom} nom={cl.nom} />
                          <span>{cl.prenom} {cl.nom}</span>
                        </div>
                      </td>
                      <td style={{ padding: '9px 8px', borderBottom: '0.5px solid var(--border)', color: 'var(--text2)' }}>{c.article}</td>
                      <td style={{ padding: '9px 8px', borderBottom: '0.5px solid var(--border)' }}><Badge label={c.statut} /></td>
                      <td style={{ padding: '9px 0', borderBottom: '0.5px solid var(--border)', color: 'var(--text2)' }}>{fmt(c.montant)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Chart */}
        <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem' }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Activité mensuelle</p>
          {commandes.length === 0 ? (
            <p style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '2rem 0' }}>Aucune donnée.</p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
              {MONTHS.map((m, i) => {
                const h = Math.round((counts[i] / max) * 90)
                return (
                  <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 9, color: 'var(--text3)' }}>{counts[i] || ''}</span>
                    <div style={{ width: '100%', height: 90, display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{
                        width: '100%',
                        height: h || 3,
                        background: h > 0 ? 'var(--teal)' : 'var(--border)',
                        borderRadius: '3px 3px 0 0',
                        transition: 'height 0.3s',
                      }} />
                    </div>
                    <span style={{ fontSize: 8, color: 'var(--text3)' }}>{m}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
