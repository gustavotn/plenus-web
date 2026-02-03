import type { Presentation } from '@/types/Presentation/Presentation';

import { api } from '@/lib/Axios';

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
