export default function Panel({ title, action, children }) {
  return (
    <section className="panel">
      <div className="panel-title">
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}
