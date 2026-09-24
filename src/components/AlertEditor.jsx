import { useState } from 'react'
import { interpret, TOPICS } from '../domain'
import { blankAlert } from './constants'
import { topic } from './helpers'

export default function AlertEditor({ initial, close, save }) {
  const [alert, setAlert] = useState({
    ...blankAlert,
    ...initial,
    conditions: { ...blankAlert.conditions, ...initial.conditions },
  })
  const [text, setText] = useState('')

  const setCondition = (key, value) => {
    setAlert((current) => ({
      ...current,
      conditions: { ...current.conditions, [key]: value },
    }))
  }

  const chooseTopic = (topicId) => {
    const conditions =
      topicId === 'earthquake'
        ? { magnitude: 7, region: 'Japan' }
        : topicId === 'market'
          ? { change: 4 }
          : { severity: 'high', keyword: 'infrastructure' }

    setAlert((current) => ({ ...current, topic: topicId, conditions }))
  }

  const interpretDescription = () => {
    const parsed = interpret(text)
    setAlert((current) => ({
      ...current,
      topic: parsed.topic,
      conditions: { ...current.conditions, ...parsed.conditions },
    }))
  }

  const toggleChannel = (channel) => {
    setAlert((current) => ({
      ...current,
      channels: current.channels.includes(channel)
        ? current.channels.filter((item) => item !== channel)
        : [...current.channels, channel],
    }))
  }

  const saveAlert = () => {
    save({
      ...alert,
      id: alert.id || crypto.randomUUID(),
      name: `${topic(alert.topic).label} monitor`,
    })
  }

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="header">
          <div>
            <p className="eyebrow">{initial.id ? 'EDIT ALERT' : 'NEW ALERT'}</p>
            <h2>Define what matters</h2>
          </div>
          <button className="close" onClick={close}>×</button>
        </div>

        <label className="label">
          START WITH A DESCRIPTION <span>Mock interpretation</span>
        </label>
        <div className="natural">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="e.g. magnitude 7 earthquake near Japan"
          />
          <button onClick={interpretDescription}>Interpret</button>
        </div>
        <p className="mock">
          ✦ Interpretation is deterministic and editable. No AI or external
          service is connected.
        </p>

        <label className="label">EVENT TOPIC</label>
        <div className="choices">
          {TOPICS.map((item) => (
            <button
              className={alert.topic === item.id ? 'selected' : ''}
              key={item.id}
              onClick={() => chooseTopic(item.id)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {alert.topic === 'earthquake' && (
          <div className="form-grid">
            <Field
              label="Minimum magnitude"
              value={alert.conditions.magnitude}
              change={(event) => setCondition('magnitude', event.target.value)}
            />
            <Field
              label="Region contains"
              value={alert.conditions.region}
              change={(event) => setCondition('region', event.target.value)}
            />
          </div>
        )}
        {alert.topic === 'market' && (
          <div className="form-grid">
            <Field
              label="Minimum move %"
              value={alert.conditions.change}
              change={(event) => setCondition('change', event.target.value)}
            />
            <Field
              label="Asset or region"
              value={alert.conditions.keyword || ''}
              change={(event) => setCondition('keyword', event.target.value)}
            />
          </div>
        )}
        {alert.topic === 'news' && (
          <div className="form-grid">
            <Field
              label="Severity"
              value={alert.conditions.severity}
              change={(event) => setCondition('severity', event.target.value)}
            />
            <Field
              label="Keyword"
              value={alert.conditions.keyword || ''}
              change={(event) => setCondition('keyword', event.target.value)}
            />
          </div>
        )}

        <label className="label">NOTIFY ME VIA</label>
        <div className="choices">
          {['email', 'slack'].map((channel) => (
            <button
              className={alert.channels.includes(channel) ? 'selected' : ''}
              key={channel}
              onClick={() => toggleChannel(channel)}
            >
              {channel === 'email' ? '✉' : '#'}{' '}
              {channel[0].toUpperCase() + channel.slice(1)}
            </button>
          ))}
        </div>

        <footer>
          <button className="secondary" onClick={close}>Cancel</button>
          <button className="primary" disabled={!alert.channels.length} onClick={saveAlert}>
            Save alert
          </button>
        </footer>
      </div>
    </div>
  )
}

function Field({ label, value, change }) {
  return (
    <label className="field">
      {label}
      <input value={value || ''} onChange={change} />
    </label>
  )
}
