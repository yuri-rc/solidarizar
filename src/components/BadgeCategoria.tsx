import type { CategoriaFixa } from '../types'
import { IconFood, IconClothing, IconHygiene, IconHealth, IconPackage } from '../icons'
import { CATEGORIAS_CONFIG } from '../data'

const categoryIcon = {
  'Alimentação': IconFood,
  'Roupas e Agasalhos': IconClothing,
  'Higiene e Limpeza': IconHygiene,
  'Saúde e Insumos': IconHealth,
  'Geral e Outros': IconPackage,
}

export function BadgeCategoria({ categoria }: { categoria: CategoriaFixa }) {
  const config = CATEGORIAS_CONFIG[categoria] || CATEGORIAS_CONFIG['Geral e Outros']
  const Icon = categoryIcon[categoria] || IconPackage
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.corBg} ${config.corTexto} border ${config.corBorder}`}>
      <Icon size={14} />
      <span>{categoria}</span>
    </span>
  )
}
