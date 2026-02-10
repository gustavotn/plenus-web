import { api } from '@/lib/axios';
import type {
  AnalysisDataRequest,
  AnalysisDataResponse,
} from '@/components/data-analysis/types';

export async function getAnalysisData(
  tipo: string,
  params: AnalysisDataRequest
): Promise<AnalysisDataResponse> {
  const response = await api.post<AnalysisDataResponse>(
    '/common/analise/executar',
    params,
    { params: { tipo } }
  );

  return response.data;
}
