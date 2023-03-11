import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { firebase } from '../services/firebase';

import { User } from '../interfaces/User';

interface AuthContextData {
  user?: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth(firebase);

  const [user, setUser] = useState<User | undefined>(() => {
    const userUpdated = localStorage.getItem('@Xati:user');
    if (userUpdated != null) return JSON.parse(userUpdated);

    return undefined;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, loggedUser => {
      if (loggedUser) {
        const { displayName, email, photoURL, uid } = loggedUser;

        const userUpdated = {
          id: uid,
          name: displayName,
          email,
          avatar: photoURL,
        } as User;

        localStorage.setItem('@Xati:user', JSON.stringify(userUpdated));

        setUser(userUpdated);
      } else {
        setUser(undefined);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

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
