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

  profile: {
    titleColor: string;
    profileDefaultPhotoColor: string;
  };

  dashboard: {
    boldTextColor: string;
    chatContainerBottomBorderColor: string;
    chatNameColor: string;
    chatLastMessageColor: string;
    chatLastMessageTimeColor: string;
    chatArrowRightColor: string;
  };

  addUser: {
    titleColor: string;
  };
}

interface ColorModeContextData {
  mode: 'light' | 'dark';
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
          profile: {
            titleColor: '#243443',
            profileDefaultPhotoColor: '#377DFF',
          },
          dashboard: {
            boldTextColor: '#243443',
            chatContainerBottomBorderColor: '#e5e5e5',
            chatNameColor: '#243443',
            chatLastMessageColor: '#58616A',
            chatLastMessageTimeColor: '#58616A',
            chatArrowRightColor: '#243443',
          },
          addUser: {
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
          profile: {
            titleColor: '#E5F1FF',
            profileDefaultPhotoColor: '#E5F1FF',
          },
          dashboard: {
            boldTextColor: '#E5F1FF',
            chatContainerBottomBorderColor: '#E5F1FF',
            chatNameColor: '#E5F1FF',
            chatLastMessageColor: '#E5F1FF',
            chatLastMessageTimeColor: '#E5F1FF',
            chatArrowRightColor: '#E5F1FF',
          },
          addUser: {
            titleColor: '#E5F1FF',
          },
        };
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode, colors }}>
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
