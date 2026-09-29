"use client"; 

import type { Transacao } from '@/lib/types';
import { formatarMoeda, formatarData } from '@/lib/format';
import { excluirTransacao } from '@/app/actions/transacoes';

export function CardTransacao({ data }: { data: Transacao }) {
  const isReceita = data.tipo === 'receita';

  return (
    <div
      className={`flex items-center justify-between gap-3 p-4 border-l-4 border rounded-md bg-white shadow-sm ${
        isReceita ? 'border-l-green-500' : 'border-l-red-500'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl" aria-hidden>{isReceita ? '⬆️' : '⬇️'}</span>
        <div className="min-w-0">
          <p className="font-medium truncate">{data.descricao}</p>
          <p className="text-xs text-gray-500">{formatarData(data.criado_em)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`font-bold whitespace-nowrap ${isReceita ? 'text-green-500' : 'text-red-500'}`}>
          {isReceita ? '+' : '-'} {formatarMoeda(data.valor)}
        </span>
        <form
          action={excluirTransacao.bind(null, data.id)}
          onSubmit={(e) => {
            if (!confirm('Excluir esta transação?')) e.preventDefault();
          }}
        >
          <button type="submit" className="text-gray-400 hover:text-red-600 text-sm" aria-label="Excluir transação">
            ✕
          </button>
        </form>
      </div>
    </div>
  );
}
