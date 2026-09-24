export default function Shell({ account, page, setPage, signOut, children }) {
  return (
    <div className="app-shell">
      <aside>
        <div className="brand">
          ✦ <strong>event<span>alerts</span></strong>
        </div>
        <small className="workspace">
          {account.role === 'admin' ? 'OPERATIONS' : 'MY WORKSPACE'}
        </small>
        <nav>
          <button
            className={page === 'overview' ? 'active' : ''}
            onClick={() => setPage('overview')}
          >
            ◌ Overview
          </button>
          {account.role === 'user' && (
            <>
              <button
                className={page === 'alerts' ? 'active' : ''}
                onClick={() => setPage('alerts')}
              >
                ▣ My alerts
              </button>
              <button
                className={page === 'simulate' ? 'active' : ''}
                onClick={() => setPage('simulate')}
              >
                ⌁ Simulate event
              </button>
            </>
          )}
        </nav>
        <div className="side-bottom">
          <div className="mini">
            <b>{account.role === 'admin' ? '⌘' : 'A'}</b>
            <span>
              {account.name}
              <small>{account.role} · demo</small>
            </span>
          </div>
          <button className="signout" onClick={signOut}>↪ Sign out</button>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  )
}
