export const TipoTransacao = {
  Despesa: 0,
  Receita: 1,
} as const

export type TipoTransacao = (typeof TipoTransacao)[keyof typeof TipoTransacao]

export interface Pessoa {
  id: number
  nome: string
  idade: number
}

export interface CriarPessoaInput {
  nome: string
  idade: number
}

export interface Transacao {
  id: number
  descricao: string
  valor: number
  tipo: TipoTransacao
  pessoaId: number
}

export interface CriarTransacaoInput {
  descricao: string
  valor: number
  tipo: TipoTransacao
  pessoaId: number
}

export interface PessoaTotal {
  id: number
  nome: string
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export interface ResumoGeral {
  totalReceitas: number
  totalDespesas: number
  saldoGeral: number
}

export interface Totais {
  pessoas: PessoaTotal[]
  resumoGeral: ResumoGeral
}