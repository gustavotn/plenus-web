import { api } from '@/lib/axios';

export interface SignInBody {
  userName: string;
  keypass: string;
  companyCode: string;
}

export interface SignInResponse {
  userName: string;
  authorization: string;
  sessionId: string;
}

export async function signIn({
  userName,
  keypass,
  companyCode,
}: SignInBody): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/common/authentication', {
    userName,
    keypass,
    companyCode,
  });

  return response.data;
}
