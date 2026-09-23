import type { Doacao, Tela } from '../types'
import { IconCheckCircle, IconPin } from '../icons'

export function TelaAutorizacao({
  doacao,
  setTela,
}: {
  doacao: Doacao | null
  setTela: (t: Tela) => void
}) {
  const codigo = doacao?.codigoAutorizacao ?? 'SOL-7A3F9'
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="bg-emerald-600 px-4 py-3 text-center text-white flex items-center justify-center gap-2">
        <IconCheckCircle size={16} />
        <p className="font-bold text-sm">Doação Aprovada pela Organização!</p>
      </div>

      <main className="flex-1 max-w-sm mx-auto w-full px-4 py-6 flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-stone-900">
            Ponto de Coleta e Entrega
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Apresente o código abaixo ao entregar os itens no local indicado.
          </p>
        </div>

        <div className="bg-primary rounded-lg p-5 text-center text-white shadow-sm flex flex-col gap-1">
          <p className="text-xs text-orange-100 font-medium uppercase tracking-wider">
            Seu Código de Autorização
          </p>
          <p className="text-3xl font-black tracking-widest my-1">{codigo}</p>
          <p className="text-[11px] text-orange-100">
            Validação rápida no balcão de recebimento
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Local de Entrega
          </p>
          <p className="text-sm font-bold text-stone-800">Centro de Coleta Municipal de Resende - Ponto Central</p>
          <p className="text-xs text-stone-500">Av. Rita Maria Ferreira da Rocha, 110 — Jardim Jalisco, Resende - RJ</p>

          <div className="mt-2 rounded-lg bg-stone-50 border border-stone-200 h-28 flex flex-col items-center justify-center text-center p-2">
            <IconPin size={28} className="text-primary" />
            <span className="text-xs font-bold text-stone-700 mt-1">Atendimento: Seg a Sex, 8h às 17h</span>
          </div>
        </div>

        {doacao && (
          <div className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col gap-1.5 text-xs">
            <span className="font-bold text-stone-400 uppercase text-[10px]">Item Autorizado</span>
            <p className="font-bold text-stone-800">{doacao.tipo} ({doacao.quantidade} {doacao.unidade})</p>
            <p className="text-stone-500">{doacao.descricao}</p>
          </div>
        )}

        <button
          onClick={() => setTela('home')}
          className="w-full bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-lg py-3.5 transition-colors"
        >
          Voltar ao Início
        </button>
      </main>
    </div>
  )
}
