export default function Empty({ title, text }) {
  return (
    <div className="empty">
      ✦
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  )
}
