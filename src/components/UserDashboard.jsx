import AlertRow from './AlertRow'
import Alerts from './Alerts'
import Empty from './Empty'
import EventRow from './EventRow'
import Header from './Header'
import Panel from './Panel'
import Result from './Result'
import Simulator from './Simulator'
import Stat from './Stat'
import { blankAlert } from './constants'

export default function UserDashboard({
  data,
  setData,
  page,
  setEdit,
  result,
  setResult,
}) {
  if (page === 'alerts') {
    return <Alerts data={data} setData={setData} setEdit={setEdit} />
  }

  if (page === 'simulate') {
    return <Simulator data={data} setData={setData} setResult={setResult} />
  }

  const activeAlerts = data.alerts.filter((alert) => alert.enabled)
  const recentEvents = [...data.events].reverse().slice(0, 4)

  return (
    <>
      <Header
        kicker="YOUR COMMAND CENTER"
        title="Good morning, Ava"
        action={
          <button className="primary" onClick={() => setEdit(blankAlert)}>
            + Create alert
          </button>
        }
      />
      <div className="stats">
        <Stat
          label="Active alerts"
          value={activeAlerts.length}
          note="Monitoring continuously"
        />
        <Stat
          label="Events evaluated"
          value={data.events.length}
          note="Across all topics"
        />
        <Stat
          label="Deliveries"
          value={data.deliveries.length}
          note="Mock channel activity"
        />
      </div>
      <div className="two-col">
        <Panel title="Recent activity">
          {recentEvents.length ? (
            recentEvents.map((event) => <EventRow event={event} key={event.id} />)
          ) : (
            <Empty
              title="No events yet"
              text="Simulate an event to see the matching pipeline."
            />
          )}
        </Panel>
        <Panel
          title="Active alerts"
          action={
            <button className="link" onClick={() => setEdit(blankAlert)}>
              + New alert
            </button>
          }
        >
          {activeAlerts.length ? (
            activeAlerts.map((alert) => <AlertRow alert={alert} key={alert.id} />)
          ) : (
            <Empty
              title="Nothing is being watched"
              text="Start with an earthquake alert for Japan."
            />
          )}
        </Panel>
      </div>
      {result && <Result result={result} />}
    </>
  )
}
