export function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-xs text-stone-400 shrink-0 font-medium">{label}</span>
      <span className="text-xs font-bold text-stone-800 text-right">{value}</span>
    </div>
  )
}
