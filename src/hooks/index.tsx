import { ReactNode } from 'react';

import { PromptInstallPWAProvider } from './promptInstallPWA';
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
    <PromptInstallPWAProvider>
      <WindowDimensionsProvider>
        <ColorModeProvider>
          <SocketProvider>
            <FirebaseProvider>
              <AuthProvider>{children}</AuthProvider>
            </FirebaseProvider>
          </SocketProvider>
        </ColorModeProvider>
      </WindowDimensionsProvider>
    </PromptInstallPWAProvider>
  );
}
