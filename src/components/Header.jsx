export default function Header({ kicker, title, action }) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {action}
    </header>
  )
}
