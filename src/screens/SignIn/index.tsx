import React from 'react';
import { useWindowDimensions, useColorScheme, Image, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../../hooks/theme';

import { SignInButton, SignInIcon, SignInText } from './styles';

import LogoIconLight from '../../assets/signin/ic_logo_light.png';
import LogoIconDark from '../../assets/signin/ic_logo_dark.png';
import GoogleIcon from '../../assets/signin/ic_google.png';

export const SignIn = () => {
  const { height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function saveNewUser() {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userAlreadyExists = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();

      if (!userAlreadyExists.exists) {
        const nanoid = customAlphabet(
          'abcdefghijklmnopqrstuvwxyz0123456789',
          5,
        );

        const code = nanoid();

        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set({
            name: currentUser.displayName,
            email: currentUser.email,
            photoUrl: currentUser.photoURL,
            code,
          })
          .then(async () => await AsyncStorage.setItem('@Xati.:userCode', code))
          .catch(error => console.log(error));

        console.log('User created');
      } else {
        const userData = userAlreadyExists.data();
        if (userData)
          await AsyncStorage.setItem('@Xati.:userCode', userData.code);

        console.log('User already exists');
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.appBackground,
      }}
    >
      <Image
        source={colorScheme === 'light' ? LogoIconLight : LogoIconDark}
        style={{ width: 136, height: 73, marginTop: height * 0.2315 }}
      />

      <SignInButton
        backgroundColor={colors.signInButtonBackground}
        onPress={() =>
          onGoogleButtonPress()
            .then(async () => await saveNewUser())
            .catch(error => console.log('Error signing in with Google', error))
        }
      >
        <SignInIcon source={GoogleIcon} />

        <SignInText style={{ transform: [{ translateX: -45 }] }}>
          Sign In with Google
        </SignInText>
      </SignInButton>
    </View>
  );
};
