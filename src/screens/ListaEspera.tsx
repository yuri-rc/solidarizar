import type { Doacao, Tela } from '../types'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { EmptyState } from '../components/EmptyState'
import { IconCheck } from '../icons'
import { gerarCodigo } from '../data'

export function TelaListaEspera({
  doacoes,
  setDoacoes,
  telaAtual,
  setTela,
}: {
  doacoes: Doacao[]
  setDoacoes: (d: Doacao[]) => void
  telaAtual: Tela
  setTela: (t: Tela) => void
}) {
  const emEspera = doacoes
    .filter((d) => d.emFilaEspera && !d.aprovada)
    .sort((a, b) => (a.posicaoFila ?? 99) - (b.posicaoFila ?? 99))

  const aprovar = (id: string) => {
    setDoacoes(
      doacoes.map((d) =>
        d.id === id
          ? { ...d, aprovada: true, emFilaEspera: false, codigoAutorizacao: gerarCodigo(), status: 'em_transito' }
          : d,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <HeaderAdmin telaAtual={telaAtual} setTela={setTela} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-stone-800 mb-1">Fila de Espera por Capacidade</h1>
        <p className="text-xs text-stone-500 mb-5">Doações pausadas temporariamente por excesso de estoque ou alta demanda</p>

        {emEspera.length === 0 ? (
          <EmptyState mensagem="Nenhuma doação aguardando na fila de espera." />
        ) : (
          <div className="flex flex-col gap-3">
            {emEspera.map((d, i) => (
              <div
                key={d.id}
                className="bg-white rounded-lg border border-stone-200 p-4 flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-primary-dark">#{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-800 text-xs">{d.nome}</p>
                  <p className="text-xs text-stone-500">{d.tipo} · {d.descricao}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{d.dataHora} · {d.telefone}</p>
                </div>
                <button
                  onClick={() => aprovar(d.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shrink-0 inline-flex items-center gap-1"
                >
                  <IconCheck size={12} />
                  Liberar & Aprovar
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
