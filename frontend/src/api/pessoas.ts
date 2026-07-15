import {request} from './client';
import type { Pessoa , CriarPessoaInput } from '../types';

export function listarPessoas(){
    return request<Pessoa[]>('/Pessoas');
}

export function criarPessoa(dados: CriarPessoaInput){
    return request<Pessoa>('/Pessoas' , {
        method: 'POST',
        body: JSON.stringify(dados)
    });
}

export function deletarPessoa(id: number){
    return request<void>(`/Pessoas/${id}` , {method: 'DELETE'});
}


