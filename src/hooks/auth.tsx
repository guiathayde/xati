import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import apiFirebase from '../database/apiFirebase';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  name?: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signUp(credentialsSignUp: SignUpCredentials): Promise<boolean>;
  signUpUpdate(): void;
  signIn(credentialsSignIn: SignInCredentials): Promise<void>;
  signOut(): void;
  updateNameUser(name?: string): Promise<void>;
  updateAvatarUser(imageURL: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await AsyncStorage.getItem('@Xati:user');

      if (user) {
        setData({ user: JSON.parse(user) });

        const email = await AsyncStorage.getItem('@Xati:email');
        const password = await AsyncStorage.getItem('@Xati:password');

        if (email !== null && password !== null) {
          await apiFirebase.signInAuthentication(email, password);
        }
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signUp = useCallback(
    async ({ name, email, password }: SignUpCredentials) => {
      const verifyCreationUser = await apiFirebase.createUser(
        name,
        email,
        password,
      );

      if (verifyCreationUser) {
        await AsyncStorage.multiSet([
          ['@Xati:email', email],
          ['@Xati:password', password],
        ]);

        return true;
      }

      return false;
    },
    [],
  );

  const signUpUpdate = useCallback(async () => {
    messaging()
      .getToken()
      .then(async token => {
        await apiFirebase.saveDeviceDatabase(token);
      })
      .catch(error => {
        console.log(
          'Erro ao salvar no banco de dados o token de notificação: ',
          error,
        );
      });

    const currentUser = await apiFirebase.currentUser();

    if (
      currentUser?.uid !== undefined &&
      currentUser.displayName !== null &&
      currentUser.photoURL !== null
    ) {
      const user = {
        _id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      };

      await AsyncStorage.setItem('@Xati:user', JSON.stringify(user));

      setData({ user });
    } else if (
      currentUser?.uid !== undefined &&
      currentUser.displayName !== null
    ) {
      const user = {
        _id: currentUser.uid,
        name: currentUser.displayName,
      };

      await AsyncStorage.setItem('@Xati:user', JSON.stringify(user));

      setData({ user });
    }
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await apiFirebase.signInAuthentication(email, password);

    if (response) {
      await messaging()
        .getToken()
        .then(async token => {
          await apiFirebase.saveDeviceDatabase(token);
        })
        .catch(error => {
          console.log(
            'Erro ao salvar no banco de dados o token de notificação: ',
            error,
          );
        });

      const currentUser = await apiFirebase.currentUser();

      if (
        currentUser?.uid !== undefined &&
        currentUser.displayName !== null &&
        currentUser.photoURL !== null
      ) {
        const user = {
          _id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        };

        await AsyncStorage.setItem('@Xati:user', JSON.stringify(user));
        await AsyncStorage.multiSet([
          ['@Xati:email', email],
          ['@Xati:password', password],
        ]);

        setData({ user });
      } else if (
        currentUser?.uid !== undefined &&
        currentUser.displayName !== null
      ) {
        const user = {
          _id: currentUser.uid,
          name: currentUser.displayName,
        };

        await AsyncStorage.setItem('@Xati:user', JSON.stringify(user));
        await AsyncStorage.multiSet([
          ['@Xati:email', email],
          ['@Xati:password', password],
        ]);

        setData({ user });
      } else {
        Alert.alert(
          'Erro ao fazer login',
          'Cheque suas credenciais e tente novamente',
        );
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    const response = await apiFirebase.signOutAuthentication();

    if (response) {
      await AsyncStorage.multiRemove([
        '@Xati:user',
        '@Xati:email',
        '@Xati:password',
        '@Xati:MessagingToken',
      ]);

      setData({} as AuthState);
    } else {
      Alert.alert('Erro ao sair', 'Tente novamente');
    }
  }, []);

  const updateNameUser = useCallback(
    async (name: string) => {
      const updateProfile = await apiFirebase.updateProfileName(name);

      if (updateProfile) {
        const currentUser = await apiFirebase.currentUser();

        if (
          currentUser?.uid !== undefined &&
          currentUser.displayName !== null &&
          currentUser.photoURL !== null
        ) {
          const user = {
            _id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          };

          await AsyncStorage.setItem('@Xati:user', JSON.stringify(user));

          setData({ user });

          Alert.alert('Perfil atualizado com sucesso');
        } else if (
          currentUser?.uid !== undefined &&
          currentUser.displayName !== null
        ) {
          const user = {
            _id: currentUser.uid,
            name: currentUser.displayName,
          };

          await AsyncStorage.setItem('@Xati:user', JSON.stringify(user));

          setData({ user });
        }
      } else {
        Alert.alert('Erro ao atualizar perfil');
      }
    },
    [setData],
  );

  const updateAvatarUser = useCallback(
    (imageURL: string) => {
      setData({ user: { ...data.user, avatar: imageURL } });
    },
    [data.user],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signUp,
        signUpUpdate,
        signIn,
        signOut,
        updateNameUser,
        updateAvatarUser,
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
