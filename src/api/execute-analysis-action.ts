import { api } from '@/lib/axios';

interface ExecuteAnalysisActionRequest {
  tipo: string;
  action: string;
  selectedRows: string[][];
}

export async function executeAnalysisAction(
  params: ExecuteAnalysisActionRequest
): Promise<void> {
  await api.post('/common/analise/acao', params);
}
