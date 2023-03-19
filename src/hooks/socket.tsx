import { createContext, useContext, useMemo } from 'react';
import { connect, Socket } from 'socket.io-client';

interface SocketContextData {
  socket: Socket;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

export function SocketProvider({ children }: SocketProviderProps) {
  const socket = useMemo(() => connect('http://localhost:3333'), []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within an SocketProvider');
  }

  return context;
}
