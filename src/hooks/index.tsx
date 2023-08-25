import React from 'react';

import { AuthProvider } from './auth';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <AuthProvider>{children}</AuthProvider>;
