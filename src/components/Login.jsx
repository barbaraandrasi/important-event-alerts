import { DEMO_ACCOUNTS } from '../domain'

export default function Login({ onLogin }) {
  return (
    <main className="login">
      <div className="mark">✦</div>
      <p className="eyebrow">IMPORTANT EVENT ALERTS</p>
      <h1>
        Know what matters.
        <br />
        <em>When it matters.</em>
      </h1>
      <p className="lede">
        A transparent demo for monitoring the events that deserve your
        attention.
      </p>
      <section className="login-card">
        <div className="card-top">
          <b>DEMO ACCESS</b>
          <span>● Mock authentication</span>
        </div>
        <p>Choose a role to explore the experience. No real credentials are used.</p>
        {DEMO_ACCOUNTS.map((user) => (
          <button
            className="account"
            key={user.id}
            onClick={() => onLogin(user)}
          >
            <b>{user.role === 'admin' ? '⌘' : 'A'}</b>
            <span>
              <strong>{user.name}</strong>
              <small>
                {user.role === 'admin' ? 'Admin monitoring' : 'User dashboard'} ·{' '}
                {user.email}
              </small>
            </span>
            <i>→</i>
          </button>
        ))}
      </section>
      <small className="fine">All events, scoring, and deliveries are simulated.</small>
    </main>
  )
}
