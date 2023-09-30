import React from 'react';

import { AuthProvider } from './auth';
import { StatusProvider } from './status';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <AuthProvider>
    <StatusProvider>{children}</StatusProvider>
  </AuthProvider>
);
