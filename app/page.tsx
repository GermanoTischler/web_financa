import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold mb-4">💰 FinanceWallet</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Controle suas receitas e despesas em tempo real. Projeto desenvolvido com Next.js
        (App Router), Tailwind CSS e Supabase.
      </p>
      <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
        Acessar minha carteira
      </Link>
    </main>
  );
}
