import { useState } from 'react'
import type { Doacao, Tela, CategoriaFixa, FiltroDoacao, StatusDoacao, FormData } from '../types'
import { BadgeStatus } from '../components/BadgeStatus'
import { BadgeCategoria } from '../components/BadgeCategoria'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { Modal } from '../components/Modal'
import { ModalField } from '../components/ModalField'
import { EmptyState } from '../components/EmptyState'
import { IconTarget, IconTrash, IconCheck } from '../icons'
import { gerarId, gerarCodigo } from '../data'

export function TelaPainel({
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
  const [filtro, setFiltro] = useState<FiltroDoacao>('todos')
  const [modalAberto, setModalAberto] = useState(false)
  const [novaDoacao, setNovaDoacao] = useState<Partial<FormData>>({ tipo: 'Alimentação' })

  const filtrados = doacoes.filter((d) => filtro === 'todos' || d.status === filtro)

  const atualizarStatus = (id: string, status: StatusDoacao) => {
    setDoacoes(
      doacoes.map((d) =>
        d.id === id
          ? {
              ...d,
              status,
              aprovada: status !== 'pendente',
              codigoAutorizacao: d.codigoAutorizacao || gerarCodigo(),
            }
          : d,
      ),
    )
  }

  const excluir = (id: string) => {
    setDoacoes(doacoes.filter((d) => d.id !== id))
  }

  const adicionarDoacaoPresencial = () => {
    if (!novaDoacao.nome || !novaDoacao.tipo) return
    const d: Doacao = {
      id: gerarId(),
      nome: novaDoacao.nome ?? '',
      telefone: novaDoacao.telefone ?? '',
      email: novaDoacao.email ?? '',
      tipo: novaDoacao.tipo as CategoriaFixa,
      descricao: novaDoacao.descricao ?? '',
      quantidade: Number(novaDoacao.quantidade) || 1,
      unidade: novaDoacao.unidade ?? 'unidades',
      status: 'entregue',
      aprovada: true,
      emFilaEspera: false,
      codigoAutorizacao: gerarCodigo(),
      dataHora: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + 'h',
    }
    setDoacoes([d, ...doacoes])
    setModalAberto(false)
    setNovaDoacao({ tipo: 'Alimentação' })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <HeaderAdmin telaAtual={telaAtual} setTela={setTela} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-stone-800">Doações Recebidas</h1>
            <p className="text-xs text-stone-500">Gerencie e aprove os itens oferecidos pelos doadores</p>
          </div>
          <button
            onClick={() => setModalAberto(true)}
            className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            + Registrar Doação Balcão
          </button>
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {(['todos', 'pendente', 'em_transito', 'entregue'] as FiltroDoacao[]).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filtro === f
                  ? 'bg-primary text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {f === 'todos' ? 'Todas' : f === 'pendente' ? 'Pendentes' : f === 'em_transito' ? 'Em Trânsito' : 'Entregues'}
            </button>
          ))}
        </div>

        {filtrados.length === 0 ? (
          <EmptyState mensagem="Nenhuma doação encontrada para este filtro." />
        ) : (
          <div className="flex flex-col gap-3">
            {filtrados.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-lg border border-stone-200 p-4 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-xs font-bold text-stone-800">{d.nome}</span>
                    <p className="text-[11px] text-stone-400">{d.telefone} · {d.dataHora}</p>
                  </div>
                  <BadgeStatus status={d.status} />
                </div>

                {d.causaTitulo && (
                  <p className="text-xs text-primary-dark font-semibold bg-primary-light px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                    <IconTarget size={12} />
                    Causa: {d.causaTitulo}
                  </p>
                )}

                <div className="flex items-center gap-3 text-xs text-stone-700">
                  <BadgeCategoria categoria={d.tipo as CategoriaFixa} />
                  <span><strong>Qtd:</strong> {d.quantidade} {d.unidade}</span>
                </div>

                <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg">
                  {d.descricao}
                </p>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100 flex-wrap">
                  {d.codigoAutorizacao && (
                    <span className="text-[11px] font-mono font-bold text-stone-500">
                      Código: {d.codigoAutorizacao}
                    </span>
                  )}

                  <div className="flex gap-2 ml-auto">
                    {d.status === 'pendente' && (
                      <button
                        onClick={() => atualizarStatus(d.id, 'em_transito')}
                        className="text-xs font-bold text-primary border border-primary-border bg-primary-light hover:bg-orange-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                      >
                        <IconCheck size={12} />
                        Aprovar Doação
                      </button>
                    )}
                    {d.status === 'em_transito' && (
                      <button
                        onClick={() => atualizarStatus(d.id, 'entregue')}
                        className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                      >
                        <IconCheck size={12} />
                        Confirmar Recebimento
                      </button>
                    )}
                    <button
                      onClick={() => excluir(d.id)}
                      className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg inline-flex items-center gap-1"
                    >
                      <IconTrash size={12} />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalAberto && (
        <Modal titulo="Registrar Doação em Balcão" onClose={() => setModalAberto(false)}>
          <div className="flex flex-col gap-3">
            <ModalField label="Nome do Doador">
              <input
                type="text"
                className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                value={novaDoacao.nome ?? ''}
                onChange={(e) => setNovaDoacao({ ...novaDoacao, nome: e.target.value })}
              />
            </ModalField>
            <ModalField label="Telefone">
              <input
                type="tel"
                className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                value={novaDoacao.telefone ?? ''}
                onChange={(e) => setNovaDoacao({ ...novaDoacao, telefone: e.target.value })}
              />
            </ModalField>
            <ModalField label="Categoria Fixa">
              <select
                className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                value={novaDoacao.tipo ?? 'Alimentação'}
                onChange={(e) => setNovaDoacao({ ...novaDoacao, tipo: e.target.value as CategoriaFixa })}
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Roupas e Agasalhos">Roupas e Agasalhos</option>
                <option value="Higiene e Limpeza">Higiene e Limpeza</option>
                <option value="Saúde e Insumos">Saúde e Insumos</option>
                <option value="Geral e Outros">Geral e Outros</option>
              </select>
            </ModalField>
            <ModalField label="Descrição">
              <input
                type="text"
                className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                value={novaDoacao.descricao ?? ''}
                onChange={(e) => setNovaDoacao({ ...novaDoacao, descricao: e.target.value })}
              />
            </ModalField>
            <div className="flex gap-2">
              <ModalField label="Quantidade">
                <input
                  type="number"
                  min="1"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                  value={novaDoacao.quantidade ?? ''}
                  onChange={(e) => setNovaDoacao({ ...novaDoacao, quantidade: e.target.value })}
                />
              </ModalField>
              <ModalField label="Unidade">
                <input
                  type="text"
                    placeholder="unidades/kg"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                  value={novaDoacao.unidade ?? ''}
                  onChange={(e) => setNovaDoacao({ ...novaDoacao, unidade: e.target.value })}
                />
              </ModalField>
            </div>
            <button
              onClick={adicionarDoacaoPresencial}
              className="mt-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg py-2.5 text-xs"
            >
              Salvar Doação
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
