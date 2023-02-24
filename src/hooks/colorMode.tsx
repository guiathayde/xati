import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

interface Colors {
  background: string;

  signin: {
    logoTextColor: string;
    logoDotColor: string;
    buttonBackground: string;
  };

  signInCodePhoneNumber: {
    titleColor: string;
  };
}

interface ColorModeContextData {
  toggleColorMode: () => void;
  colors: Colors;
}

interface ColorModeProviderProps {
  children: React.ReactNode;
}

const ColorModeContext = createContext<ColorModeContextData>(
  {} as ColorModeContextData,
);

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  const [mode, setMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light',
  );

  const toggleColorMode = useCallback(
    () => setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light')),
    [],
  );

  const colors = useMemo<Colors>(() => {
    return mode === 'light'
      ? {
          background: '#F7F7F9',
          signin: {
            logoTextColor: '#243443',
            logoDotColor: '#377DFF',
            buttonBackground: '#FFFFFF',
          },
          signInCodePhoneNumber: {
            titleColor: '#243443',
          },
        }
      : {
          background: '#243443',
          signin: {
            logoTextColor: '#F7F7F9',
            logoDotColor: '#377DFF',
            buttonBackground: '#E5F1FF',
          },
          signInCodePhoneNumber: {
            titleColor: '#E5F1FF',
          },
        };
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, colors }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error('useColorMode must be used within an ColorModeProvider');
  }

  return context;
}
