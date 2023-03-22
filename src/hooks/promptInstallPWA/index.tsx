import { ReactNode } from 'react';

import { ShouldShowPromptProvider } from './shouldShowPrompt';
import { IOSInstallPromptProvider } from './iosInstallPrompt';
import { WebInstallPromptProvider } from './webInstallPrompt';

interface PromptInstallPWAProviderProps {
  children: ReactNode;
}

export function PromptInstallPWAProvider({
  children,
}: PromptInstallPWAProviderProps) {
  return (
    <ShouldShowPromptProvider>
      <IOSInstallPromptProvider>
        <WebInstallPromptProvider>{children}</WebInstallPromptProvider>
      </IOSInstallPromptProvider>
    </ShouldShowPromptProvider>
  );
}
