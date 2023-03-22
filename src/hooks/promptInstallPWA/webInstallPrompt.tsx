import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useShouldShowPrompt } from './shouldShowPrompt';

interface WebInstallPromptContextData {
  installPromptEvent: any;
  handleInstallDeclined: () => void;
  handleInstallAccepted: () => void;
}

interface WebInstallPromptProviderProps {
  children: React.ReactNode;
}

const WebInstallPromptContext = createContext<WebInstallPromptContextData>(
  {} as WebInstallPromptContextData,
);

export function WebInstallPromptProvider({
  children,
}: WebInstallPromptProviderProps) {
  const { userShouldBePromptedToInstall, handleUserSeeingInstallPrompt } =
    useShouldShowPrompt();

  const [installPromptEvent, setInstallPromptEvent] = useState<any>();

  useEffect(() => {
    const beforeInstallPromptHandler = (event: any) => {
      event.preventDefault();

      // check if user has already been asked
      if (userShouldBePromptedToInstall) {
        // store the event for later use
        setInstallPromptEvent(event);
      }
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler,
      );
  }, [userShouldBePromptedToInstall]);

  const handleInstallDeclined = useCallback(() => {
    handleUserSeeingInstallPrompt();
    setInstallPromptEvent(undefined);
  }, [handleUserSeeingInstallPrompt]);

  const handleInstallAccepted = useCallback(() => {
    // show native prompt
    installPromptEvent.prompt();

    // decide what to do after the user chooses
    installPromptEvent.userChoice.then((choice: any) => {
      // if the user declined, we don't want to show the prompt again
      if (choice.outcome !== 'accepted') {
        handleUserSeeingInstallPrompt();
      }
      setInstallPromptEvent(undefined);
    });
  }, [handleUserSeeingInstallPrompt, installPromptEvent]);

  return (
    <WebInstallPromptContext.Provider
      value={{
        installPromptEvent,
        handleInstallDeclined,
        handleInstallAccepted,
      }}
    >
      {children}
    </WebInstallPromptContext.Provider>
  );
}

export function useWebInstallPrompt() {
  const context = useContext(WebInstallPromptContext);

  if (!context) {
    throw new Error(
      'useWebInstallPrompt must be used within an WebInstallPromptProvider',
    );
  }

  return context;
}
