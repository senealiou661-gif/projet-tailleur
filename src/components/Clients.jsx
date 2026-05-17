import React, { useState } from 'react'
import { Avatar } from '../utils.jsx'

export default function Clients({ clients, commandes, addClient, deleteClient }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ prenom: '', nom: '', tel: '', mesures: '' })
  const [search, setSearch] = useState('')
  const [err, setErr] = useState('')

  const filtered = clients.filter((c, i) =>
    `${c.prenom} ${c.nom} ${c.tel}`.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = () => {
    if (!form.prenom.trim() || !form.nom.trim()) { setErr('Prénom et nom requis.'); return }
    addClient({ ...form, prenom: form.prenom.trim(), nom: form.nom.trim(), tel: form.tel.trim(), mesures: form.mesures.trim() })
    setOpen(false)
    setForm({ prenom: '', nom: '', tel: '', mesures: '' })
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
        <input
          type="text" placeholder="🔍 Rechercher un client..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, width: 260 }}
        />
        <button onClick={() => setOpen(true)} style={{
          background: 'var(--teal)', color: '#fff', border: 'none',
          padding: '9px 16px', borderRadius: 8, fontWeight: 600, fontSize: 13,
        }}>
          + Nouveau client
        </button>
      </div>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead style={{ background: 'var(--surface2)' }}>
            <tr>
              {['', 'Nom complet', 'Téléphone', 'Commandes', 'Mesures', ''].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 500, fontSize: 11, color: 'var(--text3)', borderBottom: '0.5px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text3)' }}>Aucun client trouvé.</td></tr>
            ) : filtered.map((c, i) => {
              const realIndex = clients.indexOf(c)
              const nb = commandes.filter(cmd => cmd.clientIndex === realIndex).length
              return (
                <tr key={i} style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px' }}><Avatar prenom={c.prenom} nom={c.nom} /></td>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{c.prenom} {c.nom}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{c.tel || '—'}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: 'var(--teal-light)', color: 'var(--teal-text)', padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{nb}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {c.mesures
                      ? <span style={{ background: 'var(--teal-light)', color: 'var(--teal-text)', fontSize: 11, padding: '2px 8px', borderRadius: 12 }}>✓ Oui</span>
                      : <span style={{ color: 'var(--text3)', fontSize: 12 }}>—</span>}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <button onClick={() => { if(window.confirm('Supprimer ce client ?')) deleteClient(realIndex) }}
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
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', width: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>👤 Nouveau client</h3>
            {err && <p style={{ color: 'var(--red)', fontSize: 12, marginBottom: 10 }}>{err}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Prénom *</label>
                <input style={inputStyle} value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} placeholder="Moussa" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Nom *</label>
                <input style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Diallo" />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Téléphone</label>
              <input style={inputStyle} value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} placeholder="+221 77 000 00 00" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 4 }}>Mesures</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'none' }} value={form.mesures}
                onChange={e => setForm({ ...form, mesures: e.target.value })}
                placeholder="Poitrine: 96cm, Taille: 78cm, Hanches: 102cm..." />
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
