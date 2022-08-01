import React from 'react';

import { ThemeProvider } from './theme';
import { ChatProvider } from './chat';

interface AppProviderProps {
  children: React.ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <ThemeProvider>
    <ChatProvider>{children}</ChatProvider>
  </ThemeProvider>
);
