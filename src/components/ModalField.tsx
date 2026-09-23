import type { ReactNode } from 'react'

export function ModalField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="text-[11px] font-bold text-stone-600 uppercase">{label}</label>
      {children}
    </div>
  )
}
