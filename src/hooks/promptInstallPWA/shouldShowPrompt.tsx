import { createContext, useCallback, useContext, useState } from 'react';

interface ShouldShowPromptContextData {
  userShouldBePromptedToInstall: boolean;
  handleUserSeeingInstallPrompt: () => void;
}

interface ShouldShowPromptProviderProps {
  children: React.ReactNode;
}

const ShouldShowPromptContext = createContext<ShouldShowPromptContextData>(
  {} as ShouldShowPromptContextData,
);

export function ShouldShowPromptProvider({
  children,
}: ShouldShowPromptProviderProps) {
  const getInstallPromptLastSeenAt = useCallback(
    () => localStorage.getItem('@Xati:installPromptedAt'),
    [],
  );

  const setInstallPromptSeenToday = useCallback(() => {
    const today = Date.now();
    localStorage.setItem('@Xati:installPromptedAt', String(today));
  }, []);

  const getUserShouldBePromptedToInstall = useCallback(() => {
    const daysToWaitBeforePromptingAgain = 1;

    const lastPromptString = getInstallPromptLastSeenAt();
    if (!lastPromptString) return true;

    const lastPrompt = Number(lastPromptString);
    const lastPromptInDays = Math.floor(lastPrompt / (24 * 60 * 60 * 1000));

    return lastPromptInDays > daysToWaitBeforePromptingAgain;
  }, [getInstallPromptLastSeenAt]);

  const [userShouldBePromptedToInstall, setUserShouldBePromptedToInstall] =
    useState(getUserShouldBePromptedToInstall());

  const handleUserSeeingInstallPrompt = () => {
    setUserShouldBePromptedToInstall(false);
    setInstallPromptSeenToday();
  };

  return (
    <ShouldShowPromptContext.Provider
      value={{ userShouldBePromptedToInstall, handleUserSeeingInstallPrompt }}
    >
      {children}
    </ShouldShowPromptContext.Provider>
  );
}

export function useShouldShowPrompt() {
  const context = useContext(ShouldShowPromptContext);

  if (!context) {
    throw new Error(
      'useShouldShowPrompt must be used within an ShouldShowPromptProvider',
    );
  }

  return context;
}
