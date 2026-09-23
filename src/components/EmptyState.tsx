import { IconEmpty } from '../icons'

export function EmptyState({ mensagem }: { mensagem: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-300">
        <IconEmpty size={24} />
      </div>
      <p className="text-stone-500 text-xs max-w-xs">{mensagem}</p>
    </div>
  )
}
