import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '../../components/Logo';

import { styles } from './styles';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();

  function handleSignIn() {
    navigation.navigate('PhoneSignIn');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>
          Sign in with your phone number
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
