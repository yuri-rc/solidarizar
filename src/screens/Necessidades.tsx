import { useState } from 'react'
import type { PostNecessidade, Tela, CategoriaFixa, PrioridadeNecessidade } from '../types'
import { BadgeCategoria } from '../components/BadgeCategoria'
import { BadgePrioridade } from '../components/BadgePrioridade'
import { HeaderAdmin } from '../components/HeaderAdmin'
import { Modal } from '../components/Modal'
import { ModalField } from '../components/ModalField'
import { EmptyState } from '../components/EmptyState'
import { IconEdit, IconTrash } from '../icons'
import { gerarId } from '../data'

export function TelaNecessidades({
  necessidades,
  setNecessidades,
  telaAtual,
  setTela,
}: {
  necessidades: PostNecessidade[]
  setNecessidades: (n: PostNecessidade[]) => void
  telaAtual: Tela
  setTela: (t: Tela) => void
}) {
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<PostNecessidade | null>(null)
  const [form, setForm] = useState<Partial<PostNecessidade>>({
    categoria: 'Alimentação',
    prioridade: 'necessario',
    organizacao: 'Secretaria de Assistência Social e Direitos Humanos',
    localizacao: 'Centro · Resende - RJ',
    unidade: 'unidades',
  })

  const abrirNova = () => {
    setEditando(null)
    setForm({
      categoria: 'Alimentação',
      prioridade: 'necessario',
      organizacao: 'Secretaria de Assistência Social e Direitos Humanos',
      localizacao: 'Centro · Resende - RJ',
      unidade: 'unidades',
    })
    setModalAberto(true)
  }

  const abrirEditar = (n: PostNecessidade) => {
    setEditando(n)
    setForm({ ...n })
    setModalAberto(true)
  }

  const salvar = () => {
    if (!form.titulo || !form.descricao) return
    if (editando) {
      setNecessidades(
        necessidades.map((n) =>
          n.id === editando.id ? ({ ...n, ...form } as PostNecessidade) : n,
        ),
      )
    } else {
      const nova: PostNecessidade = {
        id: gerarId(),
        titulo: form.titulo ?? '',
        organizacao: form.organizacao ?? 'Organização Municipal',
        localizacao: form.localizacao ?? 'Resende - RJ',
        categoria: (form.categoria as CategoriaFixa) ?? 'Alimentação',
        descricao: form.descricao ?? '',
        meta: Number(form.meta) || 100,
        coletado: Number(form.coletado) || 0,
        unidade: form.unidade ?? 'unidades',
        prioridade: (form.prioridade as PrioridadeNecessidade) ?? 'necessario',
        dataPublicacao: 'Agora mesmo',
        curtidasCount: 0,
      }
      setNecessidades([nova, ...necessidades])
    }
    setModalAberto(false)
  }

  const excluir = (id: string) => {
    setNecessidades(necessidades.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <HeaderAdmin telaAtual={telaAtual} setTela={setTela} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold text-stone-800">Publicações de Necessidades</h1>
            <p className="text-xs text-stone-500">Crie causas que aparecerão como posts no feed dos doadores</p>
          </div>
          <button
            onClick={abrirNova}
            className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            + Publicar Nova Causa
          </button>
        </div>

        {necessidades.length === 0 ? (
          <EmptyState mensagem="Nenhuma causa cadastrada ainda." />
        ) : (
          <div className="flex flex-col gap-4">
            {necessidades.map((n) => {
              const pct = Math.min(100, Math.round((n.coletado / n.meta) * 100))
              return (
                <div key={n.id} className="bg-white rounded-lg border border-stone-200 p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <BadgeCategoria categoria={n.categoria} />
                        <BadgePrioridade p={n.prioridade} />
                      </div>
                      <h3 className="font-bold text-stone-800 text-base leading-snug mt-1">
                        {n.titulo}
                      </h3>
                      <p className="text-xs text-stone-500">{n.organizacao} · {n.localizacao}</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 bg-stone-50 p-2.5 rounded-lg">
                    {n.descricao}
                  </p>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-600 mb-1">
                      <span>Progresso</span>
                      <span>{n.coletado} de {n.meta} {n.unidade} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end border-t border-stone-100 pt-2">
                    <button
                      onClick={() => abrirEditar(n)}
                      className="text-xs font-semibold text-primary border border-primary-border bg-primary-light hover:bg-orange-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                    >
                      <IconEdit size={12} />
                      Editar Post
                    </button>
                    <button
                      onClick={() => excluir(n.id)}
                      className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                    >
                      <IconTrash size={12} />
                      Excluir
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {modalAberto && (
        <Modal
          titulo={editando ? 'Editar Publicação de Causa' : 'Nova Publicação de Causa'}
          onClose={() => setModalAberto(false)}
        >
          <div className="flex flex-col gap-3">
            <ModalField label="Título do Post">
              <input
                type="text"
                placeholder="Ex: Campanha do Agasalho para o Abrigo Central"
                className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                value={form.titulo ?? ''}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
            </ModalField>

            <div className="flex gap-2">
              <ModalField label="Categoria Fixa">
                <select
                  className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                  value={form.categoria ?? 'Alimentação'}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value as CategoriaFixa })}
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Roupas e Agasalhos">Roupas e Agasalhos</option>
                  <option value="Higiene e Limpeza">Higiene e Limpeza</option>
                  <option value="Saúde e Insumos">Saúde e Insumos</option>
                  <option value="Geral e Outros">Geral e Outros</option>
                </select>
              </ModalField>

              <ModalField label="Nível de Urgência">
                <select
                  className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                  value={form.prioridade ?? 'necessario'}
                  onChange={(e) => setForm({ ...form, prioridade: e.target.value as PrioridadeNecessidade })}
                >
                  <option value="urgente">Alta Urgência</option>
                  <option value="necessario">Necessário</option>
                  <option value="meta_atingida">Meta Atingida</option>
                </select>
              </ModalField>
            </div>

            <ModalField label="Histórico / Descrição da Necessidade">
              <textarea
                rows={3}
                placeholder="Explique o contexto e o impacto das doações..."
                className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                value={form.descricao ?? ''}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              />
            </ModalField>

            <div className="flex gap-2">
              <ModalField label="Meta de Quantidade">
                <input
                  type="number"
                  min="1"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                  value={form.meta ?? ''}
                  onChange={(e) => setForm({ ...form, meta: Number(e.target.value) })}
                />
              </ModalField>

              <ModalField label="Unidade">
                <input
                  type="text"
                  placeholder="ex: cobertores, kg, kits"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-xs outline-none w-full focus:ring-2 focus:ring-primary-light"
                  value={form.unidade ?? ''}
                  onChange={(e) => setForm({ ...form, unidade: e.target.value })}
                />
              </ModalField>
            </div>

            <button
              onClick={salvar}
              className="mt-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg py-2.5 text-xs"
            >
              {editando ? 'Salvar Alterações' : 'Publicar no Feed'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
