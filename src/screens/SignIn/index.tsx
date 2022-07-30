import React from 'react';
import { useWindowDimensions, useColorScheme, Image, View } from 'react-native';

import { useTheme } from '../../hooks/theme';

import { SignInButton, SignInIcon, SignInText } from './styles';

import LogoIconLight from '../../assets/signin/ic_logo_light.png';
import LogoIconDark from '../../assets/signin/ic_logo_dark.png';
import GoogleIcon from '../../assets/signin/ic_google.png';

export const SignIn = () => {
  const { height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

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

      <SignInButton backgroundColor={colors.signInButtonBackground}>
        <SignInIcon source={GoogleIcon} />

        <SignInText style={{ transform: [{ translateX: -45 }] }}>
          Sign In with Google
        </SignInText>
      </SignInButton>
    </View>
  );
};
