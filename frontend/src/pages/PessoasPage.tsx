import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { listarPessoas, criarPessoa, deletarPessoa } from '../api/pessoas'
import { ApiError } from '../api/client'
import type { Pessoa } from '../types'

export function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(true)

  async function carregarPessoas() {
    setCarregando(true)
    try {
      const dados = await listarPessoas()
      setPessoas(dados)
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Erro ao carregar pessoas.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    async function carregarInicial() {
      try {
        const dados = await listarPessoas()
        setPessoas(dados)
      } catch (err) {
        setErro(err instanceof ApiError ? err.message : 'Erro ao carregar pessoas.')
      } finally {
        setCarregando(false)
      }
    }
    carregarInicial()
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setErro(null)

    try {
      await criarPessoa({ nome, idade: Number(idade) })
      setNome('')
      setIdade('')
      await carregarPessoas()
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Erro ao criar pessoa.')
    }
  }

  async function handleDeletar(id: number) {
    setErro(null)
    try {
      await deletarPessoa(id)
      await carregarPessoas()
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Erro ao deletar pessoa.')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl text-text">Pessoas</h1>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-card p-6 flex gap-3">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="bg-surface-2 border border-border rounded-card px-3 py-2 flex-1 text-text placeholder-muted outline-none focus:border-accent"
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
          min={0}
          className="bg-surface-2 border border-border rounded-card px-3 py-2 w-24 text-text placeholder-muted outline-none focus:border-accent"
        />
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
          {pessoas.map((pessoa) => (
            <li key={pessoa.id} className="flex justify-between items-center px-5 py-3">
              <span className="text-text">{pessoa.nome} <span className="text-muted text-sm">({pessoa.idade} anos)</span></span>
              <button onClick={() => handleDeletar(pessoa.id)} className="text-danger text-sm hover:opacity-80">
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}