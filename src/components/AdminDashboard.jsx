import AlertRow from './AlertRow'
import Empty from './Empty'
import EventRow from './EventRow'
import Header from './Header'
import Panel from './Panel'
import Stat from './Stat'

export default function AdminDashboard({ data }) {
  const failures = data.deliveries.filter((item) => item.status === 'failed')
  const activeAlerts = data.alerts.filter((alert) => alert.enabled).length

  return (
    <>
      <Header
        kicker="OPERATIONS / MONITORING"
        title="System overview"
        action={<span className="admin-badge">⌘ Admin mode</span>}
      />
      <div className="stats">
        <Stat
          label="Incoming events"
          value={data.events.length}
          note="All simulated sources"
        />
        <Stat
          label="Active alerts"
          value={activeAlerts}
          note={`${data.alerts.length} total configured`}
        />
        <Stat
          label="Delivery failures"
          value={failures.length}
          note={failures.length ? 'Needs attention' : 'All clear'}
        />
      </div>
      <div className="two-col">
        <Panel title="Incoming events">
          {[...data.events].reverse().map((event) => (
            <EventRow event={event} key={event.id} />
          ))}
          {!data.events.length && (
            <Empty
              title="No events received"
              text="Evaluated events will appear here."
            />
          )}
        </Panel>
        <Panel title="Delivery records">
          {[...data.deliveries].reverse().map((delivery) => (
            <div className="row" key={delivery.id}>
              <b className="topic-icon">
                {delivery.channel === 'email' ? '✉' : '#'}
              </b>
              <span>
                <strong>
                  {delivery.channel} · {delivery.status}
                </strong>
                <small>
                  {delivery.error || new Date(delivery.timestamp).toLocaleString()}
                </small>
              </span>
            </div>
          ))}
          {!data.deliveries.length && (
            <Empty
              title="No deliveries yet"
              text="Matched events create records here."
            />
          )}
        </Panel>
      </div>
      <Panel title="Configured alerts">
        {data.alerts.map((alert) => (
          <AlertRow alert={alert} key={alert.id} />
        ))}
        {!data.alerts.length && (
          <Empty
            title="No alerts configured"
            text="User-created alerts appear here."
          />
        )}
      </Panel>
    </>
  )
}
