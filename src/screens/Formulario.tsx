import { useState } from "react";
import type {
  PostNecessidade,
  Tela,
  CategoriaFixa,
  FormData,
  FormErrors,
} from "../types";
import { IconArrowLeft, IconTarget, IconLock } from "../icons";

export function TelaFormulario({
  causaSelecionada,
  onSubmit,
  setTela,
}: {
  causaSelecionada: PostNecessidade | null;
  onSubmit: (data: FormData) => void;
  setTela: (t: Tela) => void;
}) {
  const [form, setForm] = useState<FormData>({
    causaId: causaSelecionada?.id,
    causaTitulo: causaSelecionada?.titulo,
    tipo: causaSelecionada?.categoria ?? "Roupas e Agasalhos",
    descricao: causaSelecionada
      ? `Doação em resposta a: ${causaSelecionada.titulo}`
      : "",
    quantidade: "",
    unidade: causaSelecionada?.unidade ?? "unidades",
    nome: "",
    telefone: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const set = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.tipo) e.tipo = "Escolha a categoria";
    if (!form.descricao.trim())
      e.descricao = "Descreva os itens que deseja doá-los";
    if (
      !form.quantidade ||
      isNaN(Number(form.quantidade)) ||
      Number(form.quantidade) <= 0
    )
      e.quantidade = "Informe uma quantidade válida";
    if (!form.nome.trim()) e.nome = "Informe seu nome completo";
    if (!form.telefone.trim()) e.telefone = "Informe seu telefone ou WhatsApp";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  const field = (
    label: string,
    required: boolean,
    children: React.ReactNode,
    error?: string,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );

  const inputCls = (err?: string) =>
    `w-full border rounded-lg px-4 py-3 text-sm text-stone-800 outline-none transition-colors focus:ring-2 focus:ring-primary-light ${
      err
        ? "border-rose-400 bg-rose-50"
        : "border-stone-200 bg-white focus:border-primary"
    }`;

  return (
    <div className="min-h-screen bg-stone-50 pb-8">
      <div className="bg-white border-b border-stone-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => setTela("home")}
            className="text-stone-500 hover:text-stone-800 p-1 -ml-1 rounded-lg transition-colors"
            aria-label="Voltar"
          >
            <IconArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-base font-bold text-stone-800 leading-tight">
              Cadastrar Doação
            </h1>
            <p className="text-[11px] text-stone-400">
              Preencha os dados do item que você deseja doar
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">
        {causaSelecionada && (
          <div className="bg-primary-light border border-primary-border rounded-lg p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-dark flex items-center gap-1">
              <IconTarget size={12} />
              Você está doando para a Causa:
            </span>
            <h3 className="font-bold text-stone-800 text-sm leading-snug">
              {causaSelecionada.titulo}
            </h3>
            <p className="text-xs text-stone-500">
              Organização: <strong>{causaSelecionada.organizacao}</strong>
            </p>
          </div>
        )}

        <div className="bg-white border border-stone-200 rounded-lg p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-stone-800 border-b border-stone-100 pb-2">
            1. Informações dos Itens Doados
          </h2>

          {field(
            "Categoria Fixa",
            true,
            <select
              value={form.tipo}
              onChange={(e) => set("tipo", e.target.value as CategoriaFixa)}
              className={inputCls(errors.tipo)}
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Roupas e Agasalhos">Roupas e Agasalhos</option>
              <option value="Higiene e Limpeza">Higiene e Limpeza</option>
              <option value="Saúde e Insumos">Saúde e Insumos</option>
              <option value="Geral e Outros">Geral e Outros</option>
            </select>,
            errors.tipo,
          )}

          {field(
            "Descrição Detalhada do Item",
            true,
            <textarea
              rows={3}
              placeholder="Ex: 3 cobertores de solteiro de lã em perfeito estado e limpos"
              value={form.descricao}
              onChange={(e) => set("descricao", e.target.value)}
              className={inputCls(errors.descricao)}
            />,
            errors.descricao,
          )}

          <div className="flex gap-3">
            <div className="flex-1">
              {field(
                "Quantidade",
                true,
                <input
                  type="number"
                  min="1"
                  placeholder="Ex: 5"
                  value={form.quantidade}
                  onChange={(e) => set("quantidade", e.target.value)}
                  className={inputCls(errors.quantidade)}
                />,
                errors.quantidade,
              )}
            </div>
            <div className="flex-1">
              {field(
                "Unidade de Medida",
                false,
                <select
                  value={form.unidade}
                  onChange={(e) => set("unidade", e.target.value)}
                  className={inputCls()}
                >
                  <option>unidades</option>
                  <option>kg</option>
                  <option>caixas</option>
                  <option>cobertores</option>
                  <option>kits</option>
                  <option>pares</option>
                </select>,
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-stone-800 border-b border-stone-100 pb-2">
            2. Seus Dados de Contato
          </h2>

          {field(
            "Nome Completo",
            true,
            <input
              type="text"
              placeholder="Ex: Ana Maria Silva"
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
              className={inputCls(errors.nome)}
            />,
            errors.nome,
          )}

          {field(
            "Telefone / WhatsApp",
            true,
            <input
              type="tel"
              placeholder="(24) 99999-9999"
              value={form.telefone}
              onChange={(e) => set("telefone", e.target.value)}
              className={inputCls(errors.telefone)}
            />,
            errors.telefone,
          )}

          {field(
            "E-mail (opcional)",
            false,
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls()}
            />,
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary-dark active:bg-primary-dark text-white text-base font-bold rounded-lg py-4 min-h-[52px] transition-colors"
        >
          Confirmar e Enviar Doação
        </button>

        <p className="text-center text-xs text-stone-400 flex items-center justify-center gap-1">
          <IconLock size={12} />
          Seus dados serão mantidos seguros e compartilhados apenas com a
          organização responsável.
        </p>
      </main>
    </div>
  );
}
