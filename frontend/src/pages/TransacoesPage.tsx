/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { listarTransacoes, criarTransacao } from '../api/transacoes'
import { listarPessoas } from '../api/pessoas'
import { ApiError } from '../api/client'
import { TipoTransacao } from '../types'
import type { Transacao, Pessoa } from '../types'

export function TransacoesPage() {

  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  async function carregarDados() {
    setCarregando(true);
    try {
      const [listaTransacoes, listaPessoas] = await Promise.all([
        listarTransacoes(),
        listarPessoas(),
      ]);
      setTransacoes(listaTransacoes);
      setPessoas(listaPessoas);
    } 
    catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Erro ao carregar dados.');
    } 
    finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
        carregarDados();
    }, [])

    async function handleSubmit(event: FormEvent) {
        
        event.preventDefault();
        setErro(null);
        setCarregando(true);

        try {
            await criarTransacao({
                descricao,
                valor: Number(valor),
                tipo,
                pessoaId: Number(pessoaId),
            });

            setDescricao('');
            setValor('');
            setTipo(TipoTransacao.Despesa);
            await carregarDados();
        } 
        catch (err) {
            setErro(err instanceof ApiError ? err.message : 'Erro ao criar transação.');
            setCarregando(false);
        }
    }

  function nomeDaPessoa(id: number) {
    return pessoas.find((p) => p.id === id)?.nome ?? `Pessoa #${id}`;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl text-text">Transações</h1>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-card p-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="bg-surface-2 border border-border rounded-card px-3 py-2 flex-1 min-w-[160px] text-text placeholder-muted outline-none focus:border-accent"
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          min={0}
          step="0.01"
          className="bg-surface-2 border border-border rounded-card px-3 py-2 w-28 text-text placeholder-muted outline-none focus:border-accent"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
          className="bg-surface-2 border border-border rounded-card px-3 py-2 text-text outline-none focus:border-accent"
        >
          <option value={TipoTransacao.Despesa}>Despesa</option>
          <option value={TipoTransacao.Receita}>Receita</option>
        </select>
        <select
          value={pessoaId}
          onChange={(e) => setPessoaId(e.target.value)}
          required
          className="bg-surface-2 border border-border rounded-card px-3 py-2 text-text outline-none focus:border-accent"
        >
          <option value="" disabled>Selecione a pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-accent text-white font-heading font-bold rounded-card px-5 py-2.5 hover:opacity-90"
        >
          Adicionar
        </button>
      </form>

      {erro && <p className="text-danger text-sm">{erro}</p>}

      {carregando ? (
        <p className="text-muted">Carregando...</p>
      ) : (
        <ul className="bg-surface border border-border rounded-card divide-y divide-border">
          {transacoes.map((transacao) => (
            <li key={transacao.id} className="flex justify-between items-center px-5 py-3">
              <span className="text-text">
                {transacao.descricao} <span className="text-muted text-sm">— {nomeDaPessoa(transacao.pessoaId)}</span>
              </span>
              <span className={transacao.tipo === TipoTransacao.Receita ? 'text-success' : 'text-danger'}>
                {transacao.tipo === TipoTransacao.Receita ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}