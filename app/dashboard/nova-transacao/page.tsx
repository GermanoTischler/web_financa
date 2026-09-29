import Link from 'next/link';
import { NovaTransacaoForm } from '../components/NovaTransacaoForm';

export default function NovaTransacaoPage() {
  return (
    <main className="p-4 sm:p-8 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-blue-600 text-sm">← Voltar</Link>
      <h1 className="text-2xl font-bold my-4">Adicionar Transação</h1>
      <NovaTransacaoForm />
    </main>
  );
}
