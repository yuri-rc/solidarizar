import type { StatusDoacao } from '../types'

export function BadgeStatus({ status }: { status: StatusDoacao }) {
  const map: Record<StatusDoacao, { label: string; cls: string }> = {
    pendente: { label: 'Pendente', cls: 'bg-amber-100 text-amber-800' },
    em_transito: { label: 'Em Trânsito', cls: 'bg-blue-100 text-blue-800' },
    entregue: { label: 'Entregue', cls: 'bg-emerald-100 text-emerald-800' },
  }
  const { label, cls } = map[status]
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {label}
    </span>
  )
}
