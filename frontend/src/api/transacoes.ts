import type { CriarTransacaoInput, Transacao } from "../types";
import { request } from "./client";


export function listarTransacoes(){
    return request<Transacao[]>('/Transacoes');
}

export function criarTransacao(dados: CriarTransacaoInput){
    return request<Transacao>('/Transacoes' , {
        method: 'POST',
        body: JSON.stringify(dados)
    });
}

