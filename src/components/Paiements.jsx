import React from 'react'
import { fmt, Badge } from '../utils.jsx'

export default function Paiements({ clients, commandes }) {
  const totalMontant = commandes.reduce((s, c) => s + (c.montant || 0), 0)
  const totalAvances = commandes.reduce((s, c) => s + (c.avance || 0), 0)
  const totalReste = totalMontant - totalAvances
  const soldes = commandes.filter(c => (c.montant - (c.avance || 0)) <= 0).length

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Chiffre d\'affaires', value: fmt(totalMontant), color: 'var(--teal)' },
          { label: 'Encaissé (avances)', value: fmt(totalAvances), color: '#185FA5' },
          { label: 'Reste à percevoir', value: fmt(totalReste), color: totalReste > 0 ? 'var(--red)' : 'var(--teal)' },
          { label: 'Commandes soldées', value: soldes, color: '#639922' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem', borderTop: `3px solid ${s.color}` }}>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead style={{ background: 'var(--surface2)' }}>
            <tr>
              {['Client', 'Article', 'Montant total', 'Avance', 'Progression', 'Reste', 'Statut'].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 500, fontSize: 11, color: 'var(--text3)', borderBottom: '0.5px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {commandes.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text3)' }}>Aucune commande enregistrée.</td></tr>
            ) : commandes.map((c, i) => {
              const cl = clients[c.clientIndex] || {}
              const reste = (c.montant || 0) - (c.avance || 0)
              const pct = c.montant > 0 ? Math.min(100, Math.round(((c.avance || 0) / c.montant) * 100)) : 0
              const label = reste <= 0 ? 'Soldé' : c.avance > 0 ? 'Partiel' : 'Impayé'
              return (
                <tr key={i} style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{cl.prenom} {cl.nom}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{c.article}</td>
                  <td style={{ padding: '10px 12px' }}>{fmt(c.montant)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{fmt(c.avance || 0)}</td>
                  <td style={{ padding: '10px 12px', width: 120 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, height: 6, background: 'var(--surface2)', borderRadius: 3 }}>
                        <div style={{ height: 6, width: `${pct}%`, background: pct >= 100 ? 'var(--teal)' : 'var(--amber)', borderRadius: 3, transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--text3)', minWidth: 28 }}>{pct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: reste > 0 ? 'var(--red-text)' : 'var(--green-text)' }}>
                    {reste > 0 ? fmt(reste) : '✓ Soldé'}
                  </td>
                  <td style={{ padding: '10px 12px' }}><Badge label={label} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
