import { conditions, topic } from './helpers'

export default function AlertRow({ alert }) {
  return (
    <div className="row">
      <b className="topic-icon">{topic(alert.topic).icon}</b>
      <span>
        <strong>{alert.name || `${topic(alert.topic).label} alert`}</strong>
        <small>
          {conditions(alert)} · {alert.channels.join(' + ')}
        </small>
      </span>
      <i className="pill">{alert.enabled ? 'Live' : 'Paused'}</i>
    </div>
  )
}
