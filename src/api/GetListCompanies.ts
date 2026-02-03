import { api } from '@/lib/Axios';

export interface GetListCompaniesResponse {
  nome: string;
  codigo: string;
}

export async function getListCompanies() {
  const response = await api.get<GetListCompaniesResponse[]>(
    '/common/empresasLogin'
  );

  return response.data;
}
