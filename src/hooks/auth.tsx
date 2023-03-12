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

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, loggedUser => {
      if (loggedUser) {
        const { displayName, email, photoURL, uid } = loggedUser;

        const userUpdated: User = {
          id: uid,
          name: displayName ? displayName : '',
          email: email ? email : '',
          avatar: photoURL ? photoURL : '',
        };

        setUser(userUpdated);
        setLoading(false);
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
      {!loading && children}
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
