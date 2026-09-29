create table if not exists transacoes (
  id uuid default gen_random_uuid() primary key,
  descricao text not null,
  valor numeric not null check (valor > 0),
  tipo text not null check (tipo in ('receita', 'despesa')),
  criado_em timestamp with time zone default now()
);

alter table transacoes enable row level security;

create policy "anon pode ler" on transacoes for select to anon using (true);
create policy "anon pode inserir" on transacoes for insert to anon with check (true);
create policy "anon pode excluir" on transacoes for delete to anon using (true);
