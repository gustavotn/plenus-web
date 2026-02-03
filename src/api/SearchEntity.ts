import { api } from '@/lib/Axios';

interface SearchEntityRequest {
  tipo: string;
  procurarPor: string;
  em: string[];
  criterioPesquisa: string;
  pageNumber: number;
  pageSize: number;
}

export interface SearchEntityResponse {
  colunas: Coluna[];
  data: string[][];
  totalCount: number;
}

export interface Coluna {
  chave: string;
  nome: string;
}

export async function searchEntity(data: SearchEntityRequest) {
  const response = await api.get<SearchEntityResponse>(
    '/common/pesquisador/executar',
    {
      params: data,
    }
  );

  return response.data;
}
