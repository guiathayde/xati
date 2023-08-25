import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

import GoogleIcon from '../../assets/SignIn/ic_google.svg';

export const SignIn: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Xati</Text>
        <Text style={styles.logoDot}>.</Text>
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <GoogleIcon width={24} height={24} style={styles.googleIcon} />
        <Text style={styles.signInButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>
          Sign in with your phone number
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
