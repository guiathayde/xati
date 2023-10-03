import React from 'react';

import { AuthProvider } from './auth';
import { StatusProvider } from './status';
import { ForegroundNotificationsProvider } from './foregroundNotifications';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <AuthProvider>
    <StatusProvider>
      <ForegroundNotificationsProvider>
        {children}
      </ForegroundNotificationsProvider>
    </StatusProvider>
  </AuthProvider>
);
