export type SocketConnectionStatus =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export interface PresentationMessage {
  correlationId: string;
  title: string;
  text: string;
  type: string;
  buttonOk: string;
  buttonYes: string;
  buttonNo: string;
  buttonQuit: string;
  buttonContinue: string;
}

export interface PresentantionMessageResponse {
  correlationId?: string;
  conteudo: string;
}
