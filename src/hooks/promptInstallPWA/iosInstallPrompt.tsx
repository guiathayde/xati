import { createContext, useCallback, useContext } from 'react';

import { useShouldShowPrompt } from './shouldShowPrompt';

interface IOSInstallPromptContextData {
  userShouldBePromptedToInstall: boolean;
  handleUserSeeingInstallPrompt: () => void;
}

interface IOSInstallPromptProviderProps {
  children: React.ReactNode;
}

const IOSInstallPromptContext = createContext<IOSInstallPromptContextData>(
  {} as IOSInstallPromptContextData,
);

export function IOSInstallPromptProvider({
  children,
}: IOSInstallPromptProviderProps) {
  const { userShouldBePromptedToInstall, handleUserSeeingInstallPrompt } =
    useShouldShowPrompt();

  const isIOS = useCallback(() => {
    // @ts-ignore
    if (navigator.standalone) {
      //user has already installed the app
      return false;
    }

    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);

    return isIPad || isIPhone;
  }, []);

  return (
    <IOSInstallPromptContext.Provider
      value={{
        userShouldBePromptedToInstall: userShouldBePromptedToInstall && isIOS(),
        handleUserSeeingInstallPrompt,
      }}
    >
      {children}
    </IOSInstallPromptContext.Provider>
  );
}

export function useIOSInstallPrompt() {
  const context = useContext(IOSInstallPromptContext);

  if (!context) {
    throw new Error(
      'useIOSInstallPrompt must be used within an IOSInstallPromptProvider',
    );
  }

  return context;
}
