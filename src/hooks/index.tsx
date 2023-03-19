import { ReactNode } from 'react';

import { WindowDimensionsProvider } from './windowDimensions';
import { ColorModeProvider } from './colorMode';
import { SocketProvider } from './socket';
import { FirebaseProvider } from './firebase';
import { AuthProvider } from './auth';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <WindowDimensionsProvider>
      <ColorModeProvider>
        <SocketProvider>
          <FirebaseProvider>
            <AuthProvider>{children}</AuthProvider>
          </FirebaseProvider>
        </SocketProvider>
      </ColorModeProvider>
    </WindowDimensionsProvider>
  );
}
