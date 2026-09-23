import type { Tela } from '../types'
import { IconHeartLogo } from '../icons'

export function HeaderAdmin({
  telaAtual,
  setTela,
}: {
  telaAtual: Tela
  setTela: (t: Tela) => void
}) {
  const tabs: { id: Tela; label: string }[] = [
    { id: 'painel', label: 'Doações Recebidas' },
    { id: 'necessidades', label: 'Publicar Causas' },
    { id: 'lista-espera', label: 'Lista de Espera' },
  ]
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <IconHeartLogo size={18} />
            <span className="text-stone-800 font-bold text-lg tracking-tight" style={{ fontFamily: 'Sora, ui-sans-serif, system-ui, sans-serif' }}>solidarizar</span>
            <span className="bg-primary text-white font-black text-[11px] px-1.5 py-0.5 rounded tracking-wider">ADMIN</span>
          </div>
          <button
            onClick={() => setTela('home')}
            className="text-sm text-stone-500 hover:text-rose-600 transition-colors font-medium flex items-center gap-1"
          >
            <span>Sair</span>
            <span>&rarr;</span>
          </button>
        </div>
        <div className="flex gap-2 pb-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTela(tab.id)}
              className={`px-3 py-2.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap -mb-px ${
                telaAtual === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
