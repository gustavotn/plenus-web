import { api } from '@/lib/Axios';

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

export async function signIn({ userName, keypass, companyCode }: SignInBody) {
  const retorno = await api.post<SignInResponse>('/common/authentication', {
    userName,
    keypass,
    companyCode,
  });

  return retorno;
}
