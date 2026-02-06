import type { Presentation } from '@/types/presentation/presentation';

import { api } from '@/lib/axios';

export interface GetPresentationParams {
  tipo: string;
}

export async function getPresentation({ tipo }: GetPresentationParams) {
  const response = await api.get<Presentation>('/common/presentation', {
    params: {
      tipo,
    },
  });

  return response.data;
}
