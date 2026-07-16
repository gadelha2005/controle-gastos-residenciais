import { useEffect, useState } from 'react'
import { obterTotais } from '../api/totais'
import { ApiError } from '../api/client'
import type { Totais } from '../types'

export function TotaisPage() {
  const [totais, setTotais] = useState<Totais | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await obterTotais();
        setTotais(dados);
      } 
      catch (err) {
        setErro(err instanceof ApiError ? err.message : 'Erro ao carregar totais.');
      } 
      finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [])

  function formatar(valor: number) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  if (carregando) return <p className="text-muted">Carregando...</p>;
  if (erro) return <p className="text-danger">{erro}</p>;
  if (!totais) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl text-text">Totais</h1>

      <ul className="bg-surface border border-border rounded-card divide-y divide-border">
        {totais.pessoas.map((pessoa) => (
          <li key={pessoa.id} className="px-5 py-4">
            <div className="flex justify-between font-medium">
              <span className="text-text">{pessoa.nome}</span>
              <span className={pessoa.saldo >= 0 ? 'text-success' : 'text-danger'}>
                {formatar(pessoa.saldo)}
              </span>
            </div>
            <div className="text-sm text-muted flex gap-4 mt-1">
              <span>Receitas: {formatar(pessoa.totalReceitas)}</span>
              <span>Despesas: {formatar(pessoa.totalDespesas)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-surface border border-border rounded-card p-6">
        <h2 className="text-lg text-text mb-3">Resumo geral</h2>
        <div className="flex justify-between text-text">
          <span>Total de receitas</span>
          <span className="text-success">{formatar(totais.resumoGeral.totalReceitas)}</span>
        </div>
        <div className="flex justify-between text-text mt-2">
          <span>Total de despesas</span>
          <span className="text-danger">{formatar(totais.resumoGeral.totalDespesas)}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-border mt-3 pt-3 text-text">
          <span>Saldo geral</span>
          <span className={totais.resumoGeral.saldoGeral >= 0 ? 'text-success' : 'text-danger'}>
            {formatar(totais.resumoGeral.saldoGeral)}
          </span>
        </div>
      </div>
    </div>
  )
}