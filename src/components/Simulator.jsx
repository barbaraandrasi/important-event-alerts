import { useCallback, useEffect, useState } from 'react';
import { demoEvent, evaluateEvent, importance, TOPICS } from '../domain';
import Header from './Header';

export default function Simulator({ data, setData, setResult }) {
  const [type, setType] = useState('earthquake');
  const [event, setEvent] = useState(demoEvent('earthquake'));
  const [live, setLive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  const run = useCallback(
    (nextEvent) => {
      const matches = data.alerts.flatMap((alert) => {
        const evaluation = evaluateEvent(nextEvent, alert);
        return evaluation.matches ? [{ alert, evaluation }] : [];
      });
      const score = importance(nextEvent, matches[0]?.evaluation.reasons || []);
      const deliveries = matches.flatMap(({ alert }) =>
        alert.channels.map((channel) => {
          const failed = channel === 'slack' && nextEvent.topic === 'market';
          return {
            id: crypto.randomUUID(),
            alertId: alert.id,
            eventId: nextEvent.id,
            channel,
            status: failed ? 'failed' : 'delivered',
            error: failed ? 'Webhook is unavailable in mock mode.' : '',
            timestamp: new Date().toISOString(),
          };
        }),
      );

      setData((state) => ({
        ...state,
        events: [
          ...state.events.filter((item) => item.id !== nextEvent.id),
          {
            ...nextEvent,
            matches: matches.map((item) => item.alert.id),
          },
        ],
        deliveries: [...state.deliveries, ...deliveries],
      }));
      setResult({ event: nextEvent, matches, score, deliveries });
    },
    [data.alerts, setData, setResult],
  );

  useEffect(() => {
    if (!live) return undefined;
    const timer = setInterval(() => {
      run(demoEvent(type));
      setSecondsRemaining(3);
    }, 3000);
    return () => clearInterval(timer);
  }, [live, run, type]);

  useEffect(() => {
    if (!live) return undefined;

    const timer = setInterval(() => {
      setSecondsRemaining((seconds) => (seconds > 1 ? seconds - 1 : 3));
    }, 1000);

    return () => clearInterval(timer);
  }, [live]);

  const toggleLiveFeed = () => {
    setLive((current) => !current);
    if (live) setSecondsRemaining(3);
  };

  const chooseTopic = (topicId) => {
    setType(topicId);
    setEvent(demoEvent(topicId));
  };

  return (
    <>
      <Header
        kicker="SIMULATE"
        title="Put the system to work"
        action={
          <div className="feed-actions">
            <span className="feed-timer">
              Next event in {live ? `${secondsRemaining}s` : '—'}
            </span>
            <button
              className={live ? 'secondary' : 'primary'}
              onClick={toggleLiveFeed}
            >
              {live ? 'Pause live feed (3s)' : 'Start live feed (3s)'}
            </button>
          </div>
        }
      />
      <div className="simulator">
        <section className="sim-controls">
          <p className="eyebrow">MANUAL EVENT</p>
          <h3>Send a test event</h3>
          <p>
            Every event uses the same evaluation path, manually or
            automatically.
          </p>
          <div className="choices">
            {TOPICS.map((item) => (
              <button
                className={type === item.id ? 'selected' : ''}
                key={item.id}
                onClick={() => chooseTopic(item.id)}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
          <div className="form-grid">
            {type === 'earthquake' && (
              <>
                <Field
                  label="Magnitude"
                  value={event.magnitude}
                  change={(change) =>
                    setEvent({ ...event, magnitude: change.target.value })
                  }
                />
                <Field
                  label="Region"
                  value={event.region}
                  change={(change) =>
                    setEvent({ ...event, region: change.target.value })
                  }
                />
              </>
            )}
            {type === 'market' && (
              <>
                <Field
                  label="Move %"
                  value={event.change}
                  change={(change) =>
                    setEvent({ ...event, change: change.target.value })
                  }
                />
                <Field
                  label="Asset"
                  value={event.asset}
                  change={(change) =>
                    setEvent({ ...event, asset: change.target.value })
                  }
                />
              </>
            )}
            {type === 'news' && (
              <>
                <Field
                  label="Severity"
                  value={event.severity}
                  change={(change) =>
                    setEvent({ ...event, severity: change.target.value })
                  }
                />
                <Field
                  label="Headline"
                  value={event.headline}
                  change={(change) =>
                    setEvent({ ...event, headline: change.target.value })
                  }
                />
              </>
            )}
          </div>
          <button
            className="primary wide"
            onClick={() =>
              run({
                ...event,
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
              })
            }
          >
            Evaluate event →
          </button>
        </section>
        <section className="sim-visual">
          <div className="radar">
            ✦<small>ready</small>
          </div>
          <b>{live ? 'Monitoring automatically' : 'Ready to evaluate'}</b>
          <span>
            {data.alerts.filter((alert) => alert.enabled).length} active alerts
            in the pipeline
          </span>
        </section>
      </div>
    </>
  );
}

function Field({ label, value, change }) {
  return (
    <label className="field">
      {label}
      <input value={value || ''} onChange={change} />
    </label>
  );
}
