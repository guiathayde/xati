import { ReactNode } from 'react';

import { ServiceWorkerProvider } from './serviceWorker';
import { WindowDimensionsProvider } from './windowDimensions';
import { ColorModeProvider } from './colorMode';
import { SocketProvider } from './socket';
import { FirebaseProvider } from './firebase';
import { AuthProvider } from './auth';
import { TranslateProvider } from './translate';
import { PromptInstallPWAProvider } from './promptInstallPWA';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ServiceWorkerProvider>
      <WindowDimensionsProvider>
        <ColorModeProvider>
          <SocketProvider>
            <FirebaseProvider>
              <AuthProvider>
                <TranslateProvider>
                  <PromptInstallPWAProvider>
                    {children}
                  </PromptInstallPWAProvider>
                </TranslateProvider>
              </AuthProvider>
            </FirebaseProvider>
          </SocketProvider>
        </ColorModeProvider>
      </WindowDimensionsProvider>
    </ServiceWorkerProvider>
  );
}
