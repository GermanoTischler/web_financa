export type TipoTransacao = 'receita' | 'despesa';

export type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  criado_em: string;
};
