import { api } from '@/lib/axios';

interface SelectEntitySearchRequest {
  tipo: string;
  procurarPor: string;
  em: string[];
  criterioPesquisa: string;
  index: number;
}

export async function selectEntitySearch(data: SelectEntitySearchRequest) {
  const response = await api.get('/common/pesquisador/selecionar', {
    params: data,
  });

  return response.data;
}
