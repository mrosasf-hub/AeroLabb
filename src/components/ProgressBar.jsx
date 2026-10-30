export default function ProgressBar({ value = 0, label }) {
  return (
    <div className="progress-control">
      {label && <div className="progress-label"><span>{label}</span><b>{value}%</b></div>}
      <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>
    </div>
  )
}
