import { createContext, useState, useContext } from 'react';

import { loggedUser as fakeLoggedUser } from '../fakedata/loggedUser';

import { User } from '../interfaces/User';

interface AuthContextData {
  user?: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(() => {
    if (process.env.NODE_ENV === 'development') return fakeLoggedUser;

    const userUpdated = localStorage.getItem('@Xati:user');
    if (userUpdated != null) return JSON.parse(userUpdated);

    return undefined;
  });

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
