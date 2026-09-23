import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import type { Tela, Doacao, PostNecessidade, FormData } from './types'
import { necessidadesIniciais, doacoesIniciais } from './data'
import { TelaHome } from './screens/Home'
import { TelaFormulario } from './screens/Formulario'
import { TelaConfirmacao } from './screens/Confirmacao'
import { TelaAutorizacao } from './screens/Autorizacao'
import { TelaLogin } from './screens/Login'
import { TelaPainel } from './screens/Painel'
import { TelaNecessidades } from './screens/Necessidades'
import { TelaListaEspera } from './screens/ListaEspera'

const telaParaRota: Record<Tela, string> = {
  home: '/',
  formulario: '/doar',
  confirmacao: '/confirmacao',
  autorizacao: '/autorizacao',
  login: '/login',
  painel: '/painel',
  necessidades: '/necessidades',
  'lista-espera': '/lista-espera',
}

const rotaParaTela = (pathname: string): Tela => {
  if (pathname.startsWith('/doar')) return 'formulario'
  if (pathname.startsWith('/confirmacao')) return 'confirmacao'
  if (pathname.startsWith('/autorizacao')) return 'autorizacao'
  if (pathname.startsWith('/login')) return 'login'
  if (pathname.startsWith('/painel')) return 'painel'
  if (pathname.startsWith('/necessidades')) return 'necessidades'
  if (pathname.startsWith('/lista-espera')) return 'lista-espera'
  return 'home'
}

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const [doacoes, setDoacoes] = useState<Doacao[]>(doacoesIniciais)
  const [necessidades, setNecessidades] = useState<PostNecessidade[]>(necessidadesIniciais)
  const [causaSelecionada, setCausaSelecionada] = useState<PostNecessidade | null>(null)
  const [ultimaDoacao, setUltimaDoacao] = useState<Doacao | null>(null)

  const telaAtual = rotaParaTela(location.pathname)

  const setTela = (t: Tela) => {
    navigate(telaParaRota[t] || '/')
  }

  const handleNovaDoacao = (data: FormData) => {
    const novaDoacao: Doacao = {
      id: Math.random().toString(36).slice(2, 9),
      causaId: data.causaId,
      causaTitulo: data.causaTitulo,
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      tipo: data.tipo,
      descricao: data.descricao,
      quantidade: Number(data.quantidade),
      unidade: data.unidade,
      status: 'pendente',
      aprovada: false,
      emFilaEspera: false,
      dataHora:
        new Date().toLocaleDateString('pt-BR') +
        ' às ' +
        new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) +
        'h',
    }

    setDoacoes([novaDoacao, ...doacoes])
    setUltimaDoacao(novaDoacao)

    if (data.causaId) {
      setNecessidades((prev) =>
        prev.map((item) =>
          item.id === data.causaId
            ? { ...item, coletado: item.coletado + Number(data.quantidade) }
            : item,
        ),
      )
    }

    navigate('/confirmacao')
  }

  const doacaoAprovada = doacoes.find((d) => d.aprovada) ?? ultimaDoacao ?? doacoes[0]

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TelaHome
            necessidades={necessidades}
            setTela={setTela}
            onSelecionarCausa={(causa) => setCausaSelecionada(causa)}
          />
        }
      />
      <Route
        path="/doar"
        element={
          <TelaFormulario
            causaSelecionada={causaSelecionada}
            onSubmit={handleNovaDoacao}
            setTela={setTela}
          />
        }
      />
      <Route
        path="/confirmacao"
        element={<TelaConfirmacao doacao={ultimaDoacao ?? doacoes[0]} setTela={setTela} />}
      />
      <Route
        path="/autorizacao"
        element={<TelaAutorizacao doacao={doacaoAprovada} setTela={setTela} />}
      />
      <Route path="/login" element={<TelaLogin setTela={setTela} />} />
      <Route
        path="/painel"
        element={
          <TelaPainel
            doacoes={doacoes}
            setDoacoes={setDoacoes}
            telaAtual={telaAtual}
            setTela={setTela}
          />
        }
      />
      <Route
        path="/necessidades"
        element={
          <TelaNecessidades
            necessidades={necessidades}
            setNecessidades={setNecessidades}
            telaAtual={telaAtual}
            setTela={setTela}
          />
        }
      />
      <Route
        path="/lista-espera"
        element={
          <TelaListaEspera
            doacoes={doacoes}
            setDoacoes={setDoacoes}
            telaAtual={telaAtual}
            setTela={setTela}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
