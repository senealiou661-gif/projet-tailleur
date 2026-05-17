export const fmt = (n) =>
  Number(n || 0).toLocaleString('fr-FR') + ' FCFA'

export const fmtDate = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR')
}

export const initials = (prenom = '', nom = '') =>
  (prenom[0] || '').toUpperCase() + (nom[0] || '').toUpperCase()

export const STATUTS = ['En cours', 'Prêt', 'Livré']

export const BADGE_COLORS = {
  'Livré':    { bg: 'var(--green-light)',  color: 'var(--green-text)' },
  'Prêt':     { bg: 'var(--blue-light)',   color: 'var(--blue-text)'  },
  'En cours': { bg: 'var(--amber-light)',  color: 'var(--amber-text)' },
  'Soldé':    { bg: 'var(--green-light)',  color: 'var(--green-text)' },
  'Partiel':  { bg: 'var(--amber-light)',  color: 'var(--amber-text)' },
  'Impayé':   { bg: 'var(--red-light)',    color: 'var(--red-text)'   },
}

export function Badge({ label }) {
  const style = BADGE_COLORS[label] || { bg: '#eee', color: '#333' }
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      background: style.bg,
      color: style.color,
    }}>
      {label}
    </span>
  )
}

export function Avatar({ prenom, nom }) {
  return (
    <div style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--teal-light)',
      color: 'var(--teal-text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 12,
      flexShrink: 0,
    }}>
      {initials(prenom, nom)}
    </div>
  )
}
