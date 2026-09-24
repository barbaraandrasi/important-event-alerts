export default function Stat({ label, value, note }) {
  return (
    <div className="stat">
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{note}</span>
    </div>
  )
}
