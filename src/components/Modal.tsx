import type { ReactNode } from 'react'
import { IconClose } from '../icons'

export function Modal({ titulo, onClose, children }: { titulo: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs px-4 pb-4 sm:pb-0">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl border border-stone-200">
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="font-bold text-stone-800 text-sm">{titulo}</h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-lg hover:bg-stone-100"
          >
            <IconClose size={18} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
