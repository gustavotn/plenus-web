import { api } from '@/lib/axios';

interface SelectEntitySearchRequest {
  tipo: string;
  procurarPor: string;
  em: string[];
  criterioPesquisa: string;
  index: number;
}

export async function selectEntitySearch(
  data: SelectEntitySearchRequest
): Promise<string> {
  const response = await api.get<string>('/common/pesquisador/selecionar', {
    params: data,
  });

  return response.data;
}
