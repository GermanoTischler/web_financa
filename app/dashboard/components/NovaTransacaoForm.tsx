"use client"; // usa hooks (useActionState / useFormStatus) para feedback ao usuário

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { criarTransacao, type FormState } from '@/app/actions/transacoes';

function BotaoSalvar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white p-2 rounded"
    >
      {pending ? 'Salvando...' : 'Salvar'}
    </button>
  );
}

export function NovaTransacaoForm() {
  const [state, formAction] = useActionState<FormState, FormData>(criarTransacao, {});

  return (
    <form action={formAction} className="flex flex-col space-y-4">
      <label className="flex flex-col text-sm gap-1">
        Descrição
        <input type="text" name="descricao" placeholder="Ex: Salário, Mercado..." required className="border p-2 rounded" />
      </label>

      <label className="flex flex-col text-sm gap-1">
        Valor (R$)
        <input type="number" name="valor" step="0.01" min="0.01" placeholder="0,00" required className="border p-2 rounded" />
      </label>

      <label className="flex flex-col text-sm gap-1">
        Tipo
        <select name="tipo" defaultValue="despesa" className="border p-2 rounded">
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
      </label>

      {state.erro && <p className="text-red-600 text-sm">{state.erro}</p>}

      <BotaoSalvar />
    </form>
  );
}
