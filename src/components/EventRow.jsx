import { topic } from './helpers'

export default function EventRow({ event }) {
  return (
    <div className="row">
      <b className="topic-icon">{topic(event.topic).icon}</b>
      <span>
        <strong>{event.headline}</strong>
        <small>
          {topic(event.topic).label} ·{' '}
          {new Date(event.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </small>
      </span>
      <i className="pill orange">Evaluated</i>
    </div>
  )
}
