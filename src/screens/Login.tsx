import { useState } from 'react'
import type { Tela } from '../types'
import { IconArrowLeft, IconHeartLogo } from '../icons'

export function TelaLogin({ setTela }: { setTela: (t: Tela) => void }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleLogin = () => {
    if (email === 'admin@solidarizar.org' && senha === '1234') {
      setTela('painel')
    } else {
      setErro('Credenciais incorretas! Use: admin@solidarizar.org / 1234')
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-primary mb-4 flex justify-center">
            <IconHeartLogo size={48} />
          </div>
          <h1 className="text-xl font-bold text-stone-800">Solidarizar Admin</h1>
          <p className="text-stone-400 text-xs mt-0.5">Acesso Exclusivo para Organizações</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-6 flex flex-col gap-4">
          {erro && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-700 font-medium">
              {erro}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-stone-700 uppercase">E-mail corporativo</label>
            <input
              type="email"
              placeholder="admin@solidarizar.org"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErro('') }}
              className="border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-stone-700 uppercase">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => { setSenha(e.target.value); setErro('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-lg py-3 transition-colors text-sm"
          >
            Acessar Painel
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setTela('home')}
            className="text-xs font-semibold text-stone-400 hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <IconArrowLeft size={12} />
            Voltar ao Feed de doadores
          </button>
        </div>
      </div>
    </div>
  )
}
