import { ReactNode } from 'react';

import { WindowDimensionsProvider } from './windowDimensions';
import { ColorModeProvider } from './colorMode';
import { AuthProvider } from './auth';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <WindowDimensionsProvider>
      <ColorModeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ColorModeProvider>
    </WindowDimensionsProvider>
  );
}
