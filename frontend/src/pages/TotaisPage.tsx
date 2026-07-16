import { useEffect, useState } from "react"
import type { Totais } from "../types"
import { obterTotais } from "../api/totais";
import { ApiError } from "../api/client";

export function TotaisPage(){

    const [totais , setTotais] = useState<Totais | null>(null);
    const [erro , setErro] = useState<string | null>(null);
    const [carregando , setCarregando ] = useState(true);

    useEffect(() => {
        async function carregar(){
            try{
                const dados = await obterTotais();
                setTotais(dados);
            }
            catch(err){
                setErro(err instanceof ApiError ? err.message : 'Erro ao carregar totais.');
            }
            finally{
                setCarregando(false);
            }
        }

        carregar();
    } , []);

    function formatar(valor: number){
        return valor.toLocaleString('pt-BR' , {style: 'currency' , currency: 'BRL'});
    }

    if (carregando) return <p>Carregando...</p>
    if (erro) return <p className="text-red-600">{erro}</p>
    if (!totais) return null

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Totais</h1>

            <ul className="divide-y border rounded mb-6">
                {totais.pessoas.map((pessoa) => (
                <li key={pessoa.id} className="px-4 py-2">
                    <div className="flex justify-between font-medium">
                        <span>{pessoa.nome}</span>
                        <span className={pessoa.saldo >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatar(pessoa.saldo)}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 flex gap-4">
                        <span>Receitas: {formatar(pessoa.totalReceitas)}</span>
                        <span>Despesas: {formatar(pessoa.totalDespesas)}</span>
                    </div>
                </li>
                ))}
            </ul>

            <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-2">Resumo geral</h2>
                <div className="flex justify-between">
                    <span>Total de receitas</span>
                    <span className="text-green-600">{formatar(totais.resumoGeral.totalReceitas)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total de despesas</span>
                    <span className="text-red-600">{formatar(totais.resumoGeral.totalDespesas)}</span>
                </div>
                <div className="flex justify-between font-bold border-t mt-2 pt-2">
                    <span>Saldo geral</span>
                    <span className={totais.resumoGeral.saldoGeral >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatar(totais.resumoGeral.saldoGeral)}
                    </span>
                </div>
            </div>
        </div>
        );
    }