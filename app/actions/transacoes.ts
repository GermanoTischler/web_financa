"use server"; // Estas funções rodam apenas no servidor

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type FormState = { erro?: string };

export async function criarTransacao(_estadoAnterior: FormState, formData: FormData): Promise<FormState> {
  const descricao = String(formData.get('descricao') ?? '').trim();
  const valor = parseFloat(String(formData.get('valor') ?? ''));
  const tipo = String(formData.get('tipo') ?? '');

  // Validação no servidor (nunca confiar apenas no HTML do cliente)
  if (!descricao) return { erro: 'Informe uma descrição.' };
  if (!Number.isFinite(valor) || valor <= 0) return { erro: 'Informe um valor maior que zero.' };
  if (tipo !== 'receita' && tipo !== 'despesa') return { erro: 'Tipo de transação inválido.' };

  const { error } = await supabase.from('transacoes').insert([{ descricao, valor, tipo }]);
  if (error) return { erro: 'Falha ao salvar no banco de dados.' };

  // Descarta o cache para o saldo ser recalculado
  revalidatePath('/dashboard');
  redirect('/dashboard'); // redirect deve ficar fora de try/catch
}

export async function excluirTransacao(id: string) {
  const { error } = await supabase.from('transacoes').delete().eq('id', id);
  if (error) throw new Error('Falha ao excluir a transação.');
  revalidatePath('/dashboard');
}
