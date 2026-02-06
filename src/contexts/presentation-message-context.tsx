import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import type {
  PresentantionMessageResponse,
  PresentationMessage,
  SocketConnectionStatus,
} from '@/types';

interface PresentationMessageType {
  status: SocketConnectionStatus;
  socketId: string;
  message: PresentationMessage | null;
  respondToMessage: (response: PresentantionMessageResponse) => void;
  dismissMessage: () => void;
}

import { setSocketId } from '@/services/socket-session';

type PerguntaMsg = {
  type: 'pergunta';
  correlationId: string;
  text: string;
};

type RespostaMsg = {
  correlationId: string;
  conteudo: 2 | 3 | 4;
};

const SOCKET_URL =
  'ws://localhost:65289/Handlers/PresentationManagerHandler.ashx';

const PresentationMessageContext = createContext<
  PresentationMessageType | undefined
>(undefined);

function generateClientId(): string {
  return `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function PresentationMessageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<SocketConnectionStatus>('disconnected');
  const [message, setMessage] = useState<PresentationMessage | null>(null);
  const [socketIdState, setSocketIdState] = useState<string>('');

  const socketRef = useRef<WebSocket | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: PresentationMessage = JSON.parse(event.data);

      setMessage(message);
    } catch (error) {
      console.error('Error parsing socket message:', error);
    }
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');

    try {
      const clientId = generateClientId();

      const ws = new WebSocket(`${SOCKET_URL}?clientId=${clientId}`);

      ws.onopen = () => {
        setStatus('connected');

        setSocketId(clientId);
        setSocketIdState(clientId);
      };

      ws.onmessage = handleMessage;

      ws.onerror = (error) => {
        console.error('Socket error:', error);
        setStatus('error');
      };

      ws.onclose = () => {
        setStatus('disconnected');
        console.log('[v0] Socket disconnected');

        // Reconnect after 5 seconds
        // reconnectTimeoutRef.current = setTimeout(() => {
        //   if (isAuthenticated) {
        //     connect();
        //   }
        // }, 5000);
      };

      socketRef.current = ws;
    } catch (error) {
      console.error('Error creating socket connection:', error);
      setStatus('error');
    }
  }, [handleMessage]);

  const respondToMessage = useCallback(
    (response: PresentantionMessageResponse) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            response,
          })
        );
      }

      // if (autoCloseTimeoutRef.current) {
      //   clearTimeout(autoCloseTimeoutRef.current)
      // }
      setMessage(null);
    },
    []
  );

  const dismissMessage = useCallback(() => {
    // if (autoCloseTimeoutRef.current) {
    //   clearTimeout(autoCloseTimeoutRef.current)
    // }
    setMessage(null);
  }, []);

  useEffect(() => connect, []);

  return (
    <PresentationMessageContext.Provider
      value={{
        status,
        socketId: socketIdState,
        message,
        respondToMessage,
        dismissMessage,
      }}
    >
      {children}
    </PresentationMessageContext.Provider>
  );
}

export function usePresentationMessage() {
  const context = useContext(PresentationMessageContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
