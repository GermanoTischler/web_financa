import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Transacao } from '@/lib/types';
import { formatarMoeda } from '@/lib/format';
import { CardTransacao } from './components/CardTransacao';
import { ResumoCard } from './components/ResumoCard';

export const dynamic = 'force-dynamic';

async function getTransacoes(): Promise<{ dados: Transacao[]; erro: boolean }> {
  const { data, error } = await supabase
    .from('transacoes')
    .select('*')
    .order('criado_em', { ascending: false }); // mais recentes primeiro

  if (error) return { dados: [], erro: true };
  return { dados: (data ?? []).map((t) => ({ ...t, valor: Number(t.valor) })), erro: false };
}

export default async function DashboardPage() {
  const { dados: transacoes, erro } = await getTransacoes();

  const receitas = transacoes.filter((t) => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const despesas = transacoes.filter((t) => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
  const saldo = receitas - despesas;

  return (
    <main className="p-4 sm:p-8 max-w-4xl mx-auto">
      <header className="flex flex-wrap gap-3 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Minha Carteira</h1>
        <Link href="/dashboard/nova-transacao" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          + Nova Transação
        </Link>
      </header>

      {erro && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-6">
          Não foi possível carregar as transações. Verifique a conexão com o Supabase.
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-3 mb-8">
        <ResumoCard titulo="Saldo Atual" valor={formatarMoeda(saldo)} cor={saldo >= 0 ? 'text-green-600' : 'text-red-600'} destaque />
        <ResumoCard titulo="Total de Receitas" valor={formatarMoeda(receitas)} cor="text-green-600" />
        <ResumoCard titulo="Total de Despesas" valor={formatarMoeda(despesas)} cor="text-red-600" />
      </section>

      <h2 className="text-xl font-semibold mb-3">Histórico</h2>
      <div className="space-y-3">
        {transacoes.length === 0 && !erro && (
          <p className="text-gray-500 text-center py-8">Nenhuma transação ainda. Adicione a primeira!</p>
        )}
        {transacoes.map((t) => (
          <CardTransacao key={t.id} data={t} />
        ))}
      </div>
    </main>
  );
}
