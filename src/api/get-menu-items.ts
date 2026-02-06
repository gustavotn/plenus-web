import { api } from '@/lib/axios';

export interface GetMenuItemsResponse {
  titulo: string;
  imagem: string;
  descricao: string;
  nomeTipo: string;
}

export async function getMenuItems() {
  const response = await api.get<GetMenuItemsResponse[]>('/common/menu');

  return response.data;
}
