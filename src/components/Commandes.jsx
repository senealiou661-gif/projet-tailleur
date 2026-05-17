import React, { useState } from 'react'
import { fmt, fmtDate, Badge } from '../utils.jsx'

export default function Commandes({ clients, commandes, addCommande, deleteCommande, toggleStatut }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ clientIndex: '', article: '', date: '', montant: '', avance: '', notes: '', statut: 'En cours' })
  const [search, setSearch] = useState('')
  const [err, setErr] = useState('')

  const filtered = commandes.filter((c, i) => {
    const cl = clients[c.clientIndex] || {}
    return `${cl.prenom} ${cl.nom} ${c.article}`.toLowerCase().includes(search.toLowerCase())
  })

  const handleSubmit = () => {
    if (form.clientIndex === '' || !form.article.trim()) { setErr('Client et article requis.'); return }
    addCommande({
      clientIndex: parseInt(form.clientIndex),
      article: form.article.trim(),
      date: form.date,
      montant: parseFloat(form.montant) || 0,
      avance: parseFloat(form.avance) || 0,
      notes: form.notes.trim(),
      statut: 'En cours',
    })
    setOpen(false)
    setForm({ clientIndex: '', article: '', date: '', montant: '', avance: '', notes: '', statut: 'En cours' })
    setErr('')
  }

  const inputStyle = {
    width: '100%', padding: '8px 10px', borderRadius: 8,
    border: '1px solid var(--border-strong)', background: 'var(--surface)',
    color: 'var(--text)', fontSize: 13, outline: 'none',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <input type="text" placeholder="🔍 Rechercher une commande..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, width: 260 }} />
        <button onClick={() => {
          if (clients.length === 0) { alert('Ajoutez d\'abord un client.'); return }
          setOpen(true)
        }} style={{ background: 'var(--teal)', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: 8, fontWeight: 600, fontSize: 13 }}>
          + Nouvelle commande
        </button>
      </div>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead style={{ background: 'var(--surface2)' }}>
            <tr>
              {['Client', 'Article', 'Notes / Mesures', 'Statut', 'Montant', 'Livraison', ''].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 500, fontSize: 11, color: 'var(--text3)', borderBottom: '0.5px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text3)' }}>Aucune commande trouvée.</td></tr>
            ) : filtered.map((c, i) => {
              const realIndex = commandes.indexOf(c)
              const cl = clients[c.clientIndex] || {}
              return (
                <tr key={i} style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{cl.prenom} {cl.nom}</td>
                  <td style={{ padding: '10px 12px' }}>{c.article}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text3)', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.notes || cl.mesures || '—'}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span onClick={() => toggleStatut(realIndex)} title="Cliquer pour changer" style={{ cursor: 'pointer' }}>
                      <Badge label={c.statut} />
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{fmt(c.montant)}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{fmtDate(c.date)}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <button onClick={() => { if(window.confirm('Supprimer ?')) deleteCommande(realIndex) }}
                      style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 16 }}>🗑</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', width: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>📋 Nouvelle commande</h3>
            {err && <p style={{ color: 'var(--red)', fontSize: 12, marginBottom: 10 }}>{err}</p>}
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Client *</label>
              <select style={inputStyle} value={form.clientIndex} onChange={e => setForm({ ...form, clientIndex: e.target.value })}>
                <option value="">— Sélectionner —</option>
                {clients.map((c, i) => <option key={i} value={i}>{c.prenom} {c.nom}</option>)}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Article *</label>
                <input style={inputStyle} value={form.article} onChange={e => setForm({ ...form, article: e.target.value })} placeholder="Boubou, Costume..." />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Date de livraison</label>
                <input type="date" style={inputStyle} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Montant total (FCFA)</label>
                <input type="number" style={inputStyle} value={form.montant} onChange={e => setForm({ ...form, montant: e.target.value })} placeholder="25000" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Avance versée (FCFA)</label>
                <input type="number" style={inputStyle} value={form.avance} onChange={e => setForm({ ...form, avance: e.target.value })} placeholder="10000" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Notes / mesures spécifiques</label>
              <textarea style={{ ...inputStyle, height: 70, resize: 'none' }} value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="Col rond, boutons dorés, sans poche..." />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => { setOpen(false); setErr('') }} style={{ padding: '8px 16px', border: '1px solid var(--border-strong)', borderRadius: 8, background: 'none', color: 'var(--text2)' }}>Annuler</button>
              <button onClick={handleSubmit} style={{ padding: '8px 20px', background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600 }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
