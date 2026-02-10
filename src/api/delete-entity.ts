import { api } from '@/lib/axios';

export interface DeleteEntityRequest {
  typeName: string;
  chave: string;
}

export async function deleteEntity({
  typeName,
  chave,
}: DeleteEntityRequest): Promise<void> {
  await api.delete('/common/entidade', {
    params: {
      FullTypeName: typeName,
      chave,
    },
  });
}
