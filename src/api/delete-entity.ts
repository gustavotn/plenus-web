import { api } from '@/lib/axios';

export interface DeleteEntityRequest {
  typeName: string;
  chave: string;
}

export async function deleteEntity({ typeName, chave }: DeleteEntityRequest) {
  const response = await api.post('/iniciar', {
    params: {
      FullTypeName: typeName,
      chave: chave,
    },
  });

  return response.data;
}
