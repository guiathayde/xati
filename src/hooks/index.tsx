import React from 'react';

import { ThemeProvider } from './theme';

interface AppProviderProps {
  children: React.ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);
