export const StatsCard = ({ value, label }) => (
  <div className="bg-tertiary rounded-xl p-3 text-center">
    <p className="text-lg font-bold text-accent">{value}</p>
    <p className="text-xs text-text-tertiary">{label}</p>
  </div>
)
