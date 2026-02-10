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

import { env } from '@/env';
import { setSocketId } from '@/services/socket-session';

const SOCKET_URL =
  env.VITE_WS_URL ??
  'ws://localhost:65289/Handlers/PresentationManagerHandler.ashx';

interface PresentationMessageContextType {
  status: SocketConnectionStatus;
  socketId: string;
  message: PresentationMessage | null;
  respondToMessage: (response: PresentantionMessageResponse) => void;
  dismissMessage: () => void;
}

const PresentationMessageContext = createContext<
  PresentationMessageContextType | undefined
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
      const parsed: PresentationMessage = JSON.parse(event.data);
      setMessage(parsed);
    } catch {
      // Silently ignore malformed messages in production
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

      ws.onerror = () => {
        setStatus('error');
      };

      ws.onclose = () => {
        setStatus('disconnected');
      };

      socketRef.current = ws;
    } catch {
      setStatus('error');
    }
  }, [handleMessage]);

  const respondToMessage = useCallback(
    (response: PresentantionMessageResponse) => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(response));
      }

      setMessage(null);
    },
    []
  );

  const dismissMessage = useCallback(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    connect();

    return () => {
      socketRef.current?.close();
    };
  }, [connect]);

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
    throw new Error(
      'usePresentationMessage must be used within a PresentationMessageProvider'
    );
  }
  return context;
}
