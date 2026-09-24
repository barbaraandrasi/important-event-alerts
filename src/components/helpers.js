import { TOPICS } from '../domain'

export const topic = (id) => TOPICS.find((item) => item.id === id)

export const conditions = (alert) =>
  Object.entries(alert.conditions || {})
    .map(([key, value]) => `${key} ${key === 'magnitude' ? `${value}+` : value}`)
    .join(' · ') || 'No conditions'
