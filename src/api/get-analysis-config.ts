import { api } from '@/lib/axios';
import type { AnalysisConfig } from '@/components/data-analysis/types';

interface GetAnalysisConfigRequest {
  tipo: string;
}

export async function getAnalysisConfig(
  params: GetAnalysisConfigRequest
): Promise<AnalysisConfig> {
  const response = await api.get<AnalysisConfig>(
    '/common/analise/configuracao',
    { params }
  );

  return response.data;
}
