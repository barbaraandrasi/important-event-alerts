export const STORAGE_KEY = 'important-event-alerts'
export const VERSION = 2

export const DEMO_ACCOUNTS = [
  { id: 'user-1', name: 'Ava Martin', role: 'user', email: 'ava@example.com' },
  { id: 'admin-1', name: 'Morgan Chen', role: 'admin', email: 'admin@example.com' },
]

export const TOPICS = [
  { id: 'earthquake', label: 'Earthquake', icon: '⌁' },
  { id: 'news', label: 'Breaking news', icon: '◉' },
  { id: 'market', label: 'Market movement', icon: '↗' },
]

export const seedState = () => ({
  version: VERSION,
  alerts: [],
  events: [],
  deliveries: [],
})

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedState()

    const value = JSON.parse(raw)
    if (value.version === 1) return migrateV1(value)

    return value.version === VERSION && isState(value) ? value : seedState()
  } catch {
    return seedState()
  }
}

function migrateV1(value) {
  return {
    version: VERSION,
    alerts: (value.alerts || []).map((alert) => ({
      ...alert,
      channels: alert.channels || ['email'],
      enabled: alert.enabled !== false,
    })),
    events: value.events || [],
    deliveries: value.deliveries || [],
  }
}

function isState(value) {
  return ['alerts', 'events', 'deliveries'].every((key) =>
    Array.isArray(value[key]),
  )
}

export function saveState(state) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...state, version: VERSION }),
  )
}

export function evaluateEvent(event, alert) {
  if (!alert.enabled || alert.topic !== event.topic) {
    return { matches: false, reasons: [] }
  }

  const conditions = alert.conditions || {}
  const fail = (reason) => ({ matches: false, reasons: [reason] })

  if (
    conditions.magnitude != null &&
    Number(event.magnitude || 0) < Number(conditions.magnitude)
  ) {
    return fail('Magnitude is below the configured threshold.')
  }

  if (
    conditions.region &&
    !String(event.region || '')
      .toLowerCase()
      .includes(String(conditions.region).toLowerCase())
  ) {
    return fail('Event region does not match the configured region.')
  }

  if (
    conditions.keyword &&
    !String(event.headline || event.asset || '')
      .toLowerCase()
      .includes(String(conditions.keyword).toLowerCase())
  ) {
    return fail('Event does not contain the configured keyword.')
  }

  if (
    conditions.change != null &&
    Math.abs(Number(event.change || 0)) < Number(conditions.change)
  ) {
    return fail('Market move is below the configured threshold.')
  }

  if (conditions.severity && event.severity !== conditions.severity) {
    return fail('News severity does not match.')
  }

  const reasons = []
  if (conditions.magnitude != null) {
    reasons.push(
      `Magnitude ${event.magnitude} meets the ${conditions.magnitude}+ threshold.`,
    )
  }
  if (conditions.region) reasons.push(`The event is in ${conditions.region}.`)
  if (conditions.keyword) {
    reasons.push(`Headline includes “${conditions.keyword}”.`)
  }
  if (conditions.change != null) {
    reasons.push(`Move of ${event.change}% meets the ${conditions.change}% threshold.`)
  }

  return { matches: true, reasons }
}

export function importance(event, matchReasons = []) {
  const severity = getSeverityScore(event)
  const score = Math.min(
    100,
    severity + (event.sourceReliability || 20) + (event.region ? 10 : 0),
  )
  const level = score >= 75 ? 'High' : score >= 50 ? 'Medium' : 'Low'

  return {
    score,
    level,
    reasons: [
      ...matchReasons,
      `Source reliability contributes ${event.sourceReliability || 20} points.`,
      `Recent ${event.topic} activity contributes to the ${level.toLowerCase()} importance.`,
    ],
  }
}

function getSeverityScore(event) {
  if (event.topic === 'earthquake') {
    return Math.min(60, Math.round(Number(event.magnitude || 0) * 8))
  }
  if (event.topic === 'market') {
    return Math.min(55, Math.round(Math.abs(Number(event.change || 0)) * 5))
  }
  return event.severity === 'high' ? 55 : 35
}

export function interpret(text) {
  const input = text.toLowerCase()
  const magnitude = input.match(
    /(?:magnitude|mag)\s*(?:of|at least)?\s*(\d+(?:\.\d+)?)/,
  )
  const region = input.match(/(?:near|in)\s+([a-z][a-z ]+)/)
  const change = input.match(/(\d+(?:\.\d+)?)%/)

  return {
    topic: input.includes('market') || input.includes('stock')
      ? 'market'
      : input.includes('news')
        ? 'news'
        : 'earthquake',
    conditions: {
      ...(magnitude ? { magnitude: magnitude[1] } : {}),
      ...(region
        ? {
            region: region[1]
              .trim()
              .replace(/\b(and|with|for)\b.*$/, '')
              .trim(),
          }
        : {}),
      ...(change ? { change: change[1] } : {}),
    },
  }
}

export function demoEvent(topic, overrides = {}) {
  const defaults = {
    earthquake: {
      magnitude: 7.2,
      region: 'Japan',
      headline: 'Strong earthquake detected near Japan',
      sourceReliability: 30,
    },
    news: {
      severity: 'high',
      region: 'Global',
      headline: 'Breaking news: major infrastructure response',
      sourceReliability: 25,
    },
    market: {
      change: 4.8,
      asset: 'Nikkei 225',
      region: 'Japan',
      headline: 'Nikkei 225 moves sharply',
      sourceReliability: 28,
    },
  }

  return {
    id: crypto.randomUUID(),
    topic,
    timestamp: new Date().toISOString(),
    ...defaults[topic],
    ...overrides,
  }
}

export function selfCheck() {
  const alert = {
    topic: 'earthquake',
    enabled: true,
    conditions: { magnitude: 7, region: 'Japan' },
  }

  console.assert(evaluateEvent(demoEvent('earthquake'), alert).matches)
  console.assert(
    !evaluateEvent(demoEvent('earthquake', { magnitude: 6.9 }), alert).matches,
  )
}
