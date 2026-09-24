import AlertRow from './AlertRow'
import Empty from './Empty'
import Header from './Header'
import { blankAlert } from './constants'

export default function Alerts({ data, setData, setEdit }) {
  const toggleAlert = (alertId) => {
    setData((state) => ({
      ...state,
      alerts: state.alerts.map((alert) =>
        alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert,
      ),
    }))
  }

  const deleteAlert = (alertId) => {
    setData((state) => ({
      ...state,
      alerts: state.alerts.filter((alert) => alert.id !== alertId),
    }))
  }

  return (
    <>
      <Header
        kicker="ALERTS"
        title="What are you watching?"
        action={
          <button className="primary" onClick={() => setEdit(blankAlert)}>
            + Create alert
          </button>
        }
      />
      <div className="callout">
        ✦{' '}
        <span>
          <b>Tip:</b> Combine conditions to keep alerts focused. All conditions
          use AND logic.
        </span>
      </div>
      <div className="alert-list">
        {data.alerts.map((alert) => (
          <div className="alert-card" key={alert.id}>
            <AlertRow alert={alert} />
            <div className="alert-actions">
              <span className={alert.enabled ? 'green' : 'muted'}>
                ● {alert.enabled ? 'Enabled' : 'Paused'}
              </span>
              <button onClick={() => toggleAlert(alert.id)}>
                {alert.enabled ? 'Pause' : 'Enable'}
              </button>
              <button onClick={() => setEdit(alert)}>Edit</button>
              <button className="danger" onClick={() => deleteAlert(alert.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {!data.alerts.length && (
          <Empty
            title="Your alert list is empty"
            text="Create a structured alert to start monitoring."
          />
        )}
      </div>
    </>
  )
}
