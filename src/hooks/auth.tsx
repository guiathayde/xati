import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextData {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged = useCallback(
    (currentUser: FirebaseAuthTypes.User | null) => {
      console.log('currentUser', JSON.stringify(currentUser, null, 2));
      setUser(currentUser);
      if (loading) {
        setLoading(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, [onAuthStateChanged]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
