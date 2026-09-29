// Componente sem interatividade: continua sendo Server Component
type Props = { titulo: string; valor: string; cor: string; destaque?: boolean };

export function ResumoCard({ titulo, valor, cor, destaque }: Props) {
  return (
    <div className={`p-6 rounded-lg ${destaque ? 'bg-gray-100 border' : 'bg-white border shadow-sm'}`}>
      <h3 className="text-gray-600 text-sm">{titulo}</h3>
      <p className={`text-2xl sm:text-3xl font-bold mt-1 ${cor}`}>{valor}</p>
    </div>
  );
}
