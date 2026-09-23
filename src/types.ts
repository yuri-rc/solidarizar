export type Tela =
  | 'home'
  | 'formulario'
  | 'confirmacao'
  | 'autorizacao'
  | 'login'
  | 'painel'
  | 'necessidades'
  | 'lista-espera'

export type StatusDoacao = 'pendente' | 'em_transito' | 'entregue'
export type PrioridadeNecessidade = 'urgente' | 'necessario' | 'meta_atingida'

export type CategoriaFixa = 'Alimentação' | 'Roupas e Agasalhos' | 'Higiene e Limpeza' | 'Saúde e Insumos' | 'Geral e Outros'

export interface CategoriaConfig {
  corBg: string
  corTexto: string
  corBorder: string
}

export interface PostNecessidade {
  id: string
  titulo: string
  organizacao: string
  localizacao: string
  categoria: CategoriaFixa
  descricao: string
  meta: number
  coletado: number
  unidade: string
  prioridade: PrioridadeNecessidade
  dataPublicacao: string
  curtidasCount: number
}

export interface Doacao {
  id: string
  causaId?: string
  causaTitulo?: string
  nome: string
  telefone: string
  email: string
  tipo: CategoriaFixa | string
  descricao: string
  quantidade: number
  unidade: string
  status: StatusDoacao
  aprovada: boolean
  emFilaEspera: boolean
  posicaoFila?: number
  codigoAutorizacao?: string
  dataHora: string
}

export interface FormData {
  causaId?: string
  causaTitulo?: string
  tipo: CategoriaFixa
  descricao: string
  quantidade: string
  unidade: string
  nome: string
  telefone: string
  email: string
}

export interface FormErrors {
  tipo?: string
  descricao?: string
  quantidade?: string
  nome?: string
  telefone?: string
}

export type FiltroDoacao = 'todos' | 'pendente' | 'em_transito' | 'entregue'
