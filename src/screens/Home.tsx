import { useState } from 'react'
import type { PostNecessidade, Tela } from '../types'
import { BadgeCategoria } from '../components/BadgeCategoria'
import { BadgePrioridade } from '../components/BadgePrioridade'
import { Modal } from '../components/Modal'
import { EmptyState } from '../components/EmptyState'
import { IconBuilding, IconPin, IconHeart, IconHeartFilled, IconArrowRight, IconFood, IconClothing, IconHygiene, IconHealth, IconPackage, IconTarget, IconHeartLogo } from '../icons'

const categoriasMenu: { id: string; label: string; icon: 'all' | 'food' | 'clothing' | 'hygiene' | 'health' | 'package' }[] = [
  { id: 'todas', label: 'Todas', icon: 'all' },
  { id: 'Alimentação', label: 'Alimentação', icon: 'food' },
  { id: 'Roupas e Agasalhos', label: 'Agasalhos', icon: 'clothing' },
  { id: 'Higiene e Limpeza', label: 'Higiene', icon: 'hygiene' },
  { id: 'Saúde e Insumos', label: 'Saúde', icon: 'health' },
  { id: 'Geral e Outros', label: 'Outros', icon: 'package' },
]

const iconMap = {
  all: IconTarget,
  food: IconFood,
  clothing: IconClothing,
  hygiene: IconHygiene,
  health: IconHealth,
  package: IconPackage,
}

export function TelaHome({
  necessidades,
  setTela,
  onSelecionarCausa,
}: {
  necessidades: PostNecessidade[]
  setTela: (t: Tela) => void
  onSelecionarCausa: (causa: PostNecessidade) => void
}) {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas')
  const [causaDetalhe, setCausaDetalhe] = useState<PostNecessidade | null>(null)
  const [curtidas, setCurtidas] = useState<Record<string, boolean>>({})

  const toggleCurtida = (id: string) => {
    setCurtidas((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filtrados = necessidades.filter(
    (n) => categoriaFiltro === 'todas' || n.categoria === categoriaFiltro,
  )

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center gap-2">
          <IconHeartLogo />
          <span className="text-lg font-bold text-stone-800 tracking-tight" style={{ fontFamily: 'Sora, ui-sans-serif, system-ui, sans-serif' }}>
            solidarizar
          </span>
        </div>
      </header>

      <div className="bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
        <div className="max-w-2xl mx-auto px-5 py-10 sm:py-16 text-white relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/[0.04] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-semibold text-orange-200 uppercase tracking-widest mb-2 sm:mb-3">
              Plataforma de Doações
            </p>
            <h1 className="text-xl sm:text-3xl font-bold leading-tight max-w-md" style={{ fontFamily: 'Sora, ui-sans-serif, system-ui, sans-serif' }}>
              Onde a solidariedade inspira e conscientizar transforma
            </h1>
            <p className="mt-2 sm:mt-3 text-sm text-orange-100 leading-relaxed max-w-sm">
              Causas e necessidades das organizações municipais, reunidas em um só lugar.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 overflow-x-auto pb-1 -mx-5 px-5">
          {categoriasMenu.map((cat) => {
            const IconComp = iconMap[cat.icon] || iconMap.all
            const ativa = categoriaFiltro === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setCategoriaFiltro(cat.id)}
                className={`flex items-center gap-1.5 px-0 pb-1.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all shrink-0 ${
                  ativa
                    ? 'text-primary border-primary'
                    : 'text-stone-400 border-transparent hover:text-stone-600'
                }`}
              >
                <IconComp size={14} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {filtrados.length === 0 ? (
          <div className="mt-8">
            <EmptyState mensagem="Nenhuma causa cadastrada para esta categoria no momento." />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtrados.map((item) => {
              const pct = Math.min(100, Math.round((item.coletado / item.meta) * 100))
              const estaCurtido = curtidas[item.id]
              const totalCurtidas = item.curtidasCount + (estaCurtido ? 1 : 0)
              const barColor = pct >= 100 ? 'bg-emerald-500' : pct < 30 ? 'bg-red-400' : 'bg-primary'

              return (
                <div key={item.id} className="bg-white rounded-lg px-4 py-3.5 border border-stone-200 hover:border-stone-300 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-light border border-primary-border flex items-center justify-center text-primary-dark shrink-0">
                        <IconBuilding size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-800 leading-tight truncate">
                          {item.organizacao}
                        </p>
                        <p className="text-[11px] text-stone-400 truncate">
                          {item.localizacao} &middot; {item.dataPublicacao}
                        </p>
                      </div>
                    </div>
                    <BadgePrioridade p={item.prioridade} />
                  </div>

                  <div className="mt-2">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <BadgeCategoria categoria={item.categoria} />
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-snug mb-1">
                      {item.titulo}
                    </h2>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-2.5">
                      {item.descricao}
                    </p>

                    <div className="mb-2.5">
                      <div className="flex justify-between items-center text-xs text-stone-500 mb-1">
                        <span className="font-semibold">{item.coletado} de {item.meta} {item.unidade}</span>
                        <span className="font-bold text-stone-700">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => toggleCurtida(item.id)}
                        className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          estaCurtido ? 'text-rose-600' : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        {estaCurtido ? <IconHeartFilled size={14} /> : <IconHeart size={14} />}
                        <span>{totalCurtidas}</span>
                      </button>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => setCausaDetalhe(item)}
                          className="text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors px-2 py-1"
                        >
                          Detalhes
                        </button>
                        <button
                          onClick={() => {
                            onSelecionarCausa(item)
                            setTela('formulario')
                          }}
                          className="text-xs font-bold text-white bg-primary hover:bg-primary-dark px-3.5 sm:px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                          Doar
                          <IconArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {causaDetalhe && (
        <Modal
          titulo="Detalhes da Publicação"
          onClose={() => setCausaDetalhe(null)}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
              <div className="w-12 h-12 rounded-full bg-primary-light border border-primary-border flex items-center justify-center text-primary-dark shrink-0">
                <IconBuilding size={22} />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm">{causaDetalhe.organizacao}</h4>
                <p className="text-xs text-stone-400">{causaDetalhe.localizacao}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <BadgeCategoria categoria={causaDetalhe.categoria} />
              <BadgePrioridade p={causaDetalhe.prioridade} />
            </div>

            <h3 className="text-lg font-bold text-stone-900 leading-snug">
              {causaDetalhe.titulo}
            </h3>

            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
                Sobre esta necessidade
              </p>
              <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {causaDetalhe.descricao}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3.5">
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-2">
                <span>Progresso da Arrecadação</span>
                <span className="text-primary">
                  {causaDetalhe.coletado} / {causaDetalhe.meta} {causaDetalhe.unidade}
                </span>
              </div>
              <div className="h-3 bg-stone-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, Math.round((causaDetalhe.coletado / causaDetalhe.meta) * 100))}%`,
                  }}
                />
              </div>
              <p className="text-[11px] text-stone-500 text-center">
                Faltam <strong>{Math.max(0, causaDetalhe.meta - causaDetalhe.coletado)} {causaDetalhe.unidade}</strong> para atingir a meta!
              </p>
            </div>

            <div className="bg-primary-light border border-primary-border rounded-lg p-3 text-xs text-primary-dark flex items-start gap-2">
              <IconPin size={16} className="mt-0.5 shrink-0" />
              <p>
                <strong>Ponto de Entrega:</strong> Centro de Coleta Principal &mdash; Rua das Acácias, 430, Centro (Segunda a Sexta, das 8h &agrave;s 17h).
              </p>
            </div>

            <button
              onClick={() => {
                onSelecionarCausa(causaDetalhe)
                setCausaDetalhe(null)
                setTela('formulario')
              }}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-lg py-3.5 transition-colors text-base"
            >
              Doar para esta Causa Agora
            </button>
          </div>
        </Modal>
      )}

      <footer className="border-t border-stone-200 text-center py-5 mt-8">
        <div className="flex items-center justify-center gap-1.5 text-stone-400">
          <IconHeartLogo size={14} />
          <span className="text-xs font-semibold tracking-tight" style={{ fontFamily: 'Sora, ui-sans-serif, system-ui, sans-serif' }}>
            solidarizar
          </span>
          <span className="text-[11px] text-stone-300 mx-1">&middot;</span>
          <button
            onClick={() => setTela('login')}
            className="text-[11px] text-stone-400 hover:text-primary transition-colors"
          >
            Administração
          </button>
        </div>
      </footer>
    </div>
  )
}
