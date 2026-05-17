import { useState, useEffect } from 'react'

const STORAGE_KEY = 'atelierpro_data'

const defaultData = {
  clients: [],
  commandes: [],
}

export function useStore() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Restore Date objects
        parsed.commandes = (parsed.commandes || []).map(c => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }))
        return parsed
      }
    } catch (e) {}
    return defaultData
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const addClient = (client) => {
    setData(d => ({ ...d, clients: [...d.clients, client] }))
  }

  const deleteClient = (index) => {
    setData(d => {
      const newCommandes = d.commandes
        .filter(c => c.clientIndex !== index)
        .map(c => ({ ...c, clientIndex: c.clientIndex > index ? c.clientIndex - 1 : c.clientIndex }))
      const newClients = d.clients.filter((_, i) => i !== index)
      return { clients: newClients, commandes: newCommandes }
    })
  }

  const addCommande = (commande) => {
    setData(d => ({ ...d, commandes: [...d.commandes, { ...commande, createdAt: new Date() }] }))
  }

  const deleteCommande = (index) => {
    setData(d => ({ ...d, commandes: d.commandes.filter((_, i) => i !== index) }))
  }

  const toggleStatut = (index) => {
    const statuts = ['En cours', 'Prêt', 'Livré']
    setData(d => {
      const updated = [...d.commandes]
      const current = updated[index].statut
      const next = statuts[(statuts.indexOf(current) + 1) % statuts.length]
      updated[index] = { ...updated[index], statut: next }
      return { ...d, commandes: updated }
    })
  }

  return {
    clients: data.clients,
    commandes: data.commandes,
    addClient,
    deleteClient,
    addCommande,
    deleteCommande,
    toggleStatut,
  }
}
