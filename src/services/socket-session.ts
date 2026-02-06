// Singleton module to hold the socket session ID.
// This allows the API service (which can't use hooks) to access the
// current socket connection ID for every HTTP request.

let _socketId: string | null = null;
const _listeners = new Set<(id: string | null) => void>();

export function getSocketId(): string | null {
  return _socketId;
}

export function setSocketId(id: string | null) {
  _socketId = id;
  _listeners.forEach((listener) => listener(id));
}

export function onSocketIdChange(listener: (id: string | null) => void) {
  _listeners.add(listener);
  return () => {
    _listeners.delete(listener);
  };
}
