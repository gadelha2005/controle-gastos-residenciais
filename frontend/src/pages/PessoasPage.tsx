import { useEffect, useState, type FormEvent } from "react"
import type { Pessoa } from "../types"
import { criarPessoa, deletarPessoa, listarPessoas } from "../api/pessoas";
import { ApiError } from "../api/client";

export function PessoasPage(){

    const [pessoas , setPessoas] = useState<Pessoa[]>([]);
    const [nome , setNome] = useState('');
    const [idade , setIdade] = useState('');
    const [erro , setErro] = useState<string | null>(null);
    const [carregando , setCarregando] = useState(true);

    async function carregarPessoas(){
       setCarregando(true)
       try{
        const dados = await listarPessoas();
        setPessoas(dados);
       }
       catch(err){
        setErro(err instanceof ApiError ? err.message : 'Erro ao carregar pessoas');
       }
       finally {
        setCarregando(false);
       }
    }

    useEffect(() => {
        async function carregarInicial() {
            try {
                const dados = await listarPessoas()
                setPessoas(dados)
            } 
            catch (err) {
                setErro(err instanceof ApiError ? err.message : 'Erro ao carregar pessoas.')
            } 
            finally {
                setCarregando(false)
            }
        }  

        carregarInicial()
        }, [])

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        setErro(null);

        try{
            await criarPessoa({nome , idade: Number(idade)});
            setNome('');
            setIdade('');
            await carregarPessoas();
        }
        catch(err){
            setErro(err instanceof ApiError ? err.message : 'Erro ao criar pessoa.');
        }
    }

    async function handleDeletar(id: number){
        setErro(null);
        try{
            await deletarPessoa(id);
            await carregarPessoas();
        }
        catch(err){
            setErro(err instanceof ApiError ? err.message : 'Erro ao deletar pessoa.');
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Pessoas</h1>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="border rounded px-3 py-2 flex-1"
                />
                <input
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
                min={0}
                className="border rounded px-3 py-2 w-24"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Adicionar
                </button>
            </form>

            {erro && <p className="text-red-600 mb-4">{erro}</p>}

            {carregando ? (
                <p>Carregando...</p>
            ) : (
                <ul className="divide-y border rounded">
                {pessoas.map((pessoa) => (
                    <li key={pessoa.id} className="flex justify-between items-center px-4 py-2">
                    <span>{pessoa.nome} ({pessoa.idade} anos)</span>
                    <button onClick={() => handleDeletar(pessoa.id)} className="text-red-600 hover:underline">
                        Excluir
                    </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}