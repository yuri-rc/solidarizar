import type { PostNecessidade, Doacao, CategoriaFixa, CategoriaConfig } from './types'

export const CATEGORIAS_CONFIG: Record<CategoriaFixa, CategoriaConfig> = {
  'Alimentação': { corBg: 'bg-amber-50', corTexto: 'text-amber-800', corBorder: 'border-amber-200' },
  'Roupas e Agasalhos': { corBg: 'bg-blue-50', corTexto: 'text-blue-800', corBorder: 'border-blue-200' },
  'Higiene e Limpeza': { corBg: 'bg-purple-50', corTexto: 'text-purple-800', corBorder: 'border-purple-200' },
  'Saúde e Insumos': { corBg: 'bg-rose-50', corTexto: 'text-rose-800', corBorder: 'border-rose-200' },
  'Geral e Outros': { corBg: 'bg-stone-50', corTexto: 'text-stone-800', corBorder: 'border-stone-200' },
}

export const necessidadesIniciais: PostNecessidade[] = [
  {
    id: 'n1',
    titulo: 'Campanha de Agasalho: Cobertores de Inverno para o Abrigo Central',
    organizacao: 'Secretaria de Assistência Social e Direitos Humanos',
    localizacao: 'Centro · Resende - RJ',
    categoria: 'Roupas e Agasalhos',
    descricao: 'Com a chegada da frente fria na serra, precisamos urgentemente de cobertores e mantas para aquecer as mais de 120 famílias atendidas no Abrigo Municipal.',
    meta: 200,
    coletado: 140,
    unidade: 'cobertores',
    prioridade: 'urgente',
    dataPublicacao: 'Há 2 horas',
    curtidasCount: 34,
  },
  {
    id: 'n2',
    titulo: 'Cestas Básicas e Alimentos Não Perecíveis para Famílias da Cidade Alegria',
    organizacao: 'Banco de Alimentos Municipal de Resende',
    localizacao: 'Cidade Alegria · Resende - RJ',
    categoria: 'Alimentação',
    descricao: 'Estamos arrecadando arroz, feijão, óleo e macarrão para reforçar as marmitas e cestas das famílias cadastradas nos Centros de Referência.',
    meta: 500,
    coletado: 310,
    unidade: 'kg',
    prioridade: 'necessario',
    dataPublicacao: 'Há 5 horas',
    curtidasCount: 52,
  },
  {
    id: 'n3',
    titulo: 'Kits de Higiene Pessoal e Fraldas Infantis G/EG',
    organizacao: 'CRAS Cidade Alegria',
    localizacao: 'Manejo · Resende - RJ',
    categoria: 'Higiene e Limpeza',
    descricao: 'Arrecadação especial de sabonetes, cremes dentais, absorventes e fraldas infantis para mães atendidas nos programas sociais comunitários.',
    meta: 150,
    coletado: 150,
    unidade: 'kits',
    prioridade: 'meta_atingida',
    dataPublicacao: 'Ontem',
    curtidasCount: 89,
  },
]

export const doacoesIniciais: Doacao[] = [
  {
    id: 'd1',
    causaId: 'n2',
    causaTitulo: 'Cestas Básicas e Alimentos Não Perecíveis para Famílias da Cidade Alegria',
    nome: 'Maria Santos',
    telefone: '(24) 99123-4567',
    email: 'maria@email.com',
    tipo: 'Alimentação',
    descricao: '3 caixas com arroz, feijão e macarrão',
    quantidade: 15,
    unidade: 'kg',
    status: 'pendente',
    aprovada: false,
    emFilaEspera: false,
    dataHora: '25/07/2026 às 14h30',
  },
  {
    id: 'd2',
    causaId: 'n1',
    causaTitulo: 'Campanha de Agasalho: Cobertores de Inverno para o Abrigo Central',
    nome: 'José Oliveira',
    telefone: '(24) 98765-4321',
    email: 'jose@email.com',
    tipo: 'Roupas e Agasalhos',
    descricao: '2 cobertores de casal em ótimo estado',
    quantidade: 2,
    unidade: 'cobertores',
    status: 'pendente',
    aprovada: false,
    emFilaEspera: true,
    posicaoFila: 1,
    dataHora: '25/07/2026 às 09h15',
  },
]

export function gerarId() {
  return Math.random().toString(36).slice(2, 9)
}

export function gerarCodigo() {
  return 'SOL-' + Math.random().toString(36).toUpperCase().slice(2, 7)
}
