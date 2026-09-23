import type { Doacao, Tela } from '../types'
import { Row } from '../components/Row'
import { IconCheckCircle, IconClock, IconLightbulb, IconArrowRight } from '../icons'

export function TelaConfirmacao({
  doacao,
  setTela,
}: {
  doacao: Doacao | null
  setTela: (t: Tela) => void
}) {
  if (!doacao) return null
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-sm w-full flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
          <IconCheckCircle size={40} className="text-emerald-600" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-stone-900">Doação Registrada!</h1>
          <p className="mt-1.5 text-xs text-stone-500">
            Muito obrigado por fazer a diferença em nossa comunidade.
          </p>
        </div>

        <div className="w-full bg-white border border-stone-200 rounded-lg p-5 flex flex-col gap-3">
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 pb-2">
            Resumo do Envio
          </p>
          {doacao.causaTitulo && (
            <Row label="Causa" value={doacao.causaTitulo} />
          )}
          <Row label="Categoria" value={doacao.tipo} />
          <Row label="Descrição" value={doacao.descricao} />
          <Row label="Quantidade" value={`${doacao.quantidade} ${doacao.unidade}`} />
          <Row label="Doador" value={doacao.nome} />
          <Row label="Contato" value={doacao.telefone} />
        </div>

        <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <p className="text-xs text-amber-900 leading-relaxed flex items-center justify-center gap-1.5">
            <IconClock size={14} className="shrink-0" />
            <span><strong>Status: Pendente de Aprovação.</strong><br />A equipe da organização vai validar a necessidade e liberar o seu código de autorização de entrega.</span>
          </p>
        </div>

        <div className="w-full bg-primary-light border border-primary-border rounded-lg p-3 text-center">
          <p className="text-[11px] text-primary-dark mb-1 flex items-center justify-center gap-1">
            <IconLightbulb size={12} />
            <strong>Modo Demonstração:</strong>
          </p>
          <button
            onClick={() => setTela('autorizacao')}
            className="text-xs font-bold text-primary hover:text-primary-dark underline transition-colors inline-flex items-center gap-1"
          >
            Simular Tela de Doação Aprovada pela ONG
            <IconArrowRight size={10} />
          </button>
        </div>

        <button
          onClick={() => setTela('home')}
          className="w-full bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-lg py-3.5 transition-colors"
        >
          Voltar ao Feed Principal
        </button>
      </div>
    </div>
  )
}
