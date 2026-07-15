import type { Totais } from "../types";
import { request } from "./client";

export function obterTotais(){
    return request<Totais>('/Totais');
}