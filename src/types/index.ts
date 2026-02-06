export type SocketConnectionStatus =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export interface PresentationMessage {
  title: string;
  description: string;
}

export interface PresentantionMessageResponse {
  conteudo: 0 | 1 | 2 | 3 | 4;
}
