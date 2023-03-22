import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Auth,
  getAuth,
  useDeviceLanguage,
  signInWithPhoneNumber as firebaseSignInWithPhoneNumber,
  User as FirebaseUser,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  ConfirmationResult,
} from 'firebase/auth';

import { api } from '../services/api';

import { useFirebase } from './firebase';
import { useSocket } from './socket';

import { User } from '../interfaces/User';

interface AuthContextData {
  user?: User;

  auth: Auth;

  signInWithPhoneNumber: (
    appVerifier: RecaptchaVerifier,
    phoneNumber: string,
  ) => Promise<boolean>;
  signInCodeConfirmation: (
    code: string | undefined,
  ) => Promise<'error' | 'dashboard' | 'profile'>;

  updateProfileName: (name: string) => Promise<boolean>;
  updateProfilePhoto: (croppedImageSource: string) => Promise<boolean>;

  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { firebaseApp } = useFirebase();
  const { socket } = useSocket();

  const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp]);
  useDeviceLanguage(auth);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const updateProfileInDatabaseAndLocal = useCallback(
    async (userUpdated: FirebaseUser) => {
      try {
        const userUpdatedInDatabase: User = {
          id: userUpdated.uid,
          socketId: socket.id,
          name: userUpdated.displayName || '',
          email: userUpdated.email || '',
          phoneNumber: userUpdated.phoneNumber || '',
        };

        const response = await api.post(
          '/users/create-or-update',
          userUpdatedInDatabase,
        );

        if (response.data) {
          setUser(response.data);

          const currentUser = auth.currentUser;
          if (currentUser) await currentUser.reload();

          console.log('Profile updated in database!');
        }
      } catch (error) {
        console.error(error);
        alert('Error updating profile in database!');
      }
    },
    [auth, socket],
  );

  const signInWithPhoneNumber = useCallback(
    async (appVerifier: RecaptchaVerifier, phoneNumber: string) => {
      try {
        const confirmationResultUpdated = await firebaseSignInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier,
        );

        setConfirmationResult(confirmationResultUpdated);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [auth],
  );

  const signInCodeConfirmation = useCallback(
    async (code: string | undefined) => {
      if (!confirmationResult) {
        alert('Please enter a phone number');
        return 'error';
      }
      if (!code || code === '') {
        alert('Please enter the code sent to your phone');
        return 'error';
      }

      try {
        const result = await confirmationResult.confirm(code);

        if (result.user.uid) {
          await updateProfileInDatabaseAndLocal(result.user);

          if (result.user.displayName) return 'dashboard';
          else return 'profile';
        }

        return 'error';
      } catch (error) {
        console.error(error);
        return 'error';
      }
    },
    [updateProfileInDatabaseAndLocal, confirmationResult],
  );

  const updateProfileName = useCallback(
    async (name: string) => {
      let success = false;

      if (user && auth.currentUser) {
        if (name && name !== user.name && name.length > 0) {
          try {
            await firebaseUpdateProfile(auth.currentUser, {
              displayName: name,
            });

            console.log('Profile name updated!');
            success = true;
          } catch (error) {
            console.error(error);
          }
        }

        await auth.currentUser.reload();
        await updateProfileInDatabaseAndLocal(auth.currentUser);
      }

      return success;
    },
    [auth.currentUser, updateProfileInDatabaseAndLocal, user],
  );

  const updateProfilePhoto = useCallback(
    async (croppedImageSource: string) => {
      let success = false;

      if (user && auth.currentUser) {
        const response = await fetch(croppedImageSource);
        const blob = await response.blob();

        try {
          const formData = new FormData();
          formData.append('id', user.id);
          formData.append('photo', blob);

          const response = await api.post(
            'users/upload-profile-photo',
            formData,
          );

          const userUpdated = response.data as User;

          if (userUpdated) {
            await firebaseUpdateProfile(auth.currentUser, {
              photoURL: userUpdated.photoUrl,
            });

            await auth.currentUser.reload();

            console.log('Profile photo updated!');
            success = true;
          }
        } catch (error) {
          console.error(error);
        }
      }

      return success;
    },
    [auth, user],
  );

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);

      setUser(undefined);
    } catch (error) {
      console.error(error);
      alert('Error signing out!');
    }
  }, [auth]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async loggedUser => {
      if (loggedUser) {
        await updateProfileInDatabaseAndLocal(loggedUser);

        setLoading(false);
      } else {
        setUser(undefined);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, updateProfileInDatabaseAndLocal]);

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        signInWithPhoneNumber,
        signInCodeConfirmation,
        updateProfileName,
        updateProfilePhoto,
        signOut,
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
