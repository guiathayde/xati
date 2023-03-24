import { createContext, useContext, useEffect, useState } from 'react';

interface TranslateContextData {
  language: string;
}

interface TranslateProviderProps {
  children: React.ReactNode;
}

const TranslateContext = createContext<TranslateContextData>(
  {} as TranslateContextData,
);

export function TranslateProvider({ children }: TranslateProviderProps) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(navigator.language);
  }, []);

  return (
    <TranslateContext.Provider
      value={{
        language,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
}

export function useTranslate() {
  const context = useContext(TranslateContext);

  if (!context) {
    throw new Error('useTranslate must be used within an TranslateProvider');
  }

  return context;
}
