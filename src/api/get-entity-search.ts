import type { Coluna } from './search-entity';

import { api } from '@/lib/axios';

export interface GetEntitySearchRequest {
  tipo: string;
}

export interface GetEntitySearchResponse {
  titulo: string;
  nomeEntidade: string;
  tipoDialogPesquisa: string;
  colunasFiltros: Coluna[];
}

export async function getEntitySearch({ tipo }: GetEntitySearchRequest) {
  const response = await api.get<GetEntitySearchResponse>(
    '/common/pesquisador',
    {
      params: {
        tipo: tipo,
      },
    }
  );

  return response.data;
}
