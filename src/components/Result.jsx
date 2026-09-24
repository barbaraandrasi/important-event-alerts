export default function Result({ result }) {
  return (
    <section className="result">
      <div className="result-top">
        <div>
          <p className="eyebrow">LATEST EVALUATION</p>
          <h3>{result.event.headline}</h3>
          <small>
            {result.matches.length ? `${result.matches.length} alert matched` : 'No alert matched'}{' '}
            · {new Date(result.event.timestamp).toLocaleString()}
          </small>
        </div>
        <div className="score">
          <strong>{result.score.score}</strong>
          <span>{result.score.level} importance</span>
        </div>
      </div>
      <div className="result-grid">
        <div>
          <small className="label">WHY IT MATTERED</small>
          {result.score.reasons.map((reason) => (
            <p className="reason" key={reason}>
              ✓ {reason}
            </p>
          ))}
        </div>
        <div>
          <small className="label">DELIVERY PREVIEWS</small>
          {result.deliveries.length ? (
            result.deliveries.map((delivery) => (
              <div className="delivery" key={delivery.id}>
                <b>{delivery.channel === 'email' ? '✉ Email' : '# Slack'}</b>
                <span className={delivery.status}>{delivery.status}</span>
                <small>
                  {delivery.error ||
                    `Sent at ${new Date(delivery.timestamp).toLocaleTimeString()}`}
                </small>
              </div>
            ))
          ) : (
            <p>No deliveries — only enabled matching alerts create notifications.</p>
          )}
        </div>
      </div>
    </section>
  )
}
