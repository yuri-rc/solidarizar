import type { PrioridadeNecessidade } from '../types'

const map: Record<PrioridadeNecessidade, { label: string; cls: string; dotCls: string }> = {
  urgente: { label: 'Alta Urgência', cls: 'bg-red-50 text-red-700 border border-red-200', dotCls: 'bg-red-600' },
  necessario: { label: 'Necessário', cls: 'bg-orange-50 text-orange-700 border border-orange-200', dotCls: 'bg-orange-500' },
  meta_atingida: { label: 'Meta Atingida', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotCls: 'bg-emerald-600' },
}

export function BadgePrioridade({ p }: { p: PrioridadeNecessidade }) {
  const { label, cls, dotCls } = map[p]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotCls}`} />
      {label}
    </span>
  )
}
