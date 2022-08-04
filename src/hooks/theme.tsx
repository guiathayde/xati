import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

interface Colors {
  splashScreenBackground: string;
  appBackground: string;

  signInButtonBackground: string;
  backButtonBackground: string;
  defaultButtonBackground: string;
  logoutButtonBackground: string;
  editPhotoModalBackground: string;

  inputBackground: string;

  descriptionFont: string;

  messageReceivedBackground: string;
}

interface ThemeContextData {
  colors: Colors;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  function updateColorScheme(colorScheme: ColorSchemeName) {
    const lightScheme: Colors = {
      splashScreenBackground: '#377DFF',
      appBackground: '#F7F7F9',
      signInButtonBackground: '#FFFFFF',
      backButtonBackground: '#E5F1FF',
      defaultButtonBackground: '#377DFF',
      logoutButtonBackground: '#FF3737',
      editPhotoModalBackground: '#F7F7F9',
      inputBackground: '#FFFFFF',
      descriptionFont: '#243443',
      messageReceivedBackground: '#FFFFFF',
    };

    const darkScheme: Colors = {
      splashScreenBackground: '#243443',
      appBackground: '#243443',
      signInButtonBackground: '#E5F1FF',
      backButtonBackground: '#E5F1FF',
      defaultButtonBackground: '#377DFF',
      logoutButtonBackground: '#FF3737',
      editPhotoModalBackground: '#377DFF',
      inputBackground: '#E5F1FF',
      descriptionFont: '#E5F1FF',
      messageReceivedBackground: '#E5F1FF',
    };

    if (colorScheme === 'light') setColors(lightScheme);
    else if (colorScheme === 'dark') setColors(darkScheme);
    else setColors(lightScheme);
  }

  const [colors, setColors] = useState<Colors>({
    splashScreenBackground: '#377DFF',
    appBackground: '#F7F7F9',
    signInButtonBackground: '#FFFFFF',
    backButtonBackground: '#E5F1FF',
    defaultButtonBackground: '#377DFF',
    logoutButtonBackground: '#FF3737',
    editPhotoModalBackground: '#F7F7F9',
    inputBackground: '#FFFFFF',
    descriptionFont: '#243443',
    messageReceivedBackground: '#FFFFFF',
  });

  useEffect(() => {
    updateColorScheme(colorScheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
}
