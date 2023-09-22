import React, { useCallback, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { formatIncompletePhoneNumber, isValidNumber } from 'libphonenumber-js';

import { Back } from '../../components/Back';
import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { styles } from './styles';

export const PhoneSignIn: React.FC = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState('');

  const handleBack = useCallback(() => {
    if (confirm) {
      setConfirm(null);
      setCode('');
      return;
    }

    navigation.goBack();
  }, [confirm, navigation]);

  const handleSignInWithPhoneNumber = useCallback(async (phone: string) => {
    setIsLoading(true);

    if (isValidNumber(phone)) {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
    } else {
      Alert.alert('Invalid phone number.');
    }

    setIsLoading(false);
  }, []);

  const handleConfirmCode = useCallback(async () => {
    setIsLoading(true);

    try {
      if (confirm) {
        const response = await confirm.confirm(code);
        if (response) {
          const { uid } = response.user;

          try {
            const user = await firestore().doc(`users/${uid}`).get();

            if (user.exists) {
              navigation.navigate('Home');
            } else {
              await firestore().collection('users').doc(uid).set({
                phoneNumber,
              });

              navigation.navigate('Profile', { isNewUser: true });
            }
          } catch (error) {
            console.error('Error on reading user:', error);
          }
        }
      }
    } catch (error) {
      console.error('Invalid code:', error);
    }

    setIsLoading(false);
  }, [code, confirm, navigation, phoneNumber]);

  useEffect(() => {
    if (confirm && code.length === 6) {
      Keyboard.dismiss();
    }
  }, [code, confirm]);

  if (!confirm) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <Back onPress={handleBack} />

            <Logo containerStyle={{ marginTop: 128, marginBottom: 16 }} />

            <Text style={styles.sendPhoneNumberDescription}>
              Continue with phone number
            </Text>

            <Input
              containerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 24, letterSpacing: 0 }}
              placeholder="+55 11 99999-9999"
              keyboardType="phone-pad"
              value={phoneNumber}
              returnKeyType="send"
              onChangeText={text => {
                const parsedPhoneNumber = formatIncompletePhoneNumber(text);
                setPhoneNumber(parsedPhoneNumber);
              }}
              onSubmitEditing={async () => {
                Keyboard.dismiss();
                await handleSignInWithPhoneNumber(phoneNumber);
              }}
            />

            <Button
              containerStyle={{
                width: '85%',
                marginTop: 'auto',
                marginBottom: 32,
              }}
              title="Phone Number Sign In"
              isLoading={isLoading}
              onPress={async () =>
                await handleSignInWithPhoneNumber(phoneNumber)
              }
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Back onPress={handleBack} />

          <Logo containerStyle={{ marginTop: 128, marginBottom: 16 }} />

          <Text style={styles.sendPhoneNumberDescription}>
            Enter the 6 digit code we sent to you
          </Text>

          <Input
            containerStyle={styles.inputContainer}
            inputStyle={{
              textAlign: 'center',
              fontSize: 24,
              letterSpacing: 12,
            }}
            maxLength={6}
            placeholder="123456"
            keyboardType="number-pad"
            value={code}
            returnKeyType="send"
            onChangeText={text => setCode(text)}
            onSubmitEditing={async () => await handleConfirmCode()}
          />

          <Button
            containerStyle={{
              width: '85%',
              position: 'absolute',
              bottom: 32,
            }}
            title="Confirm Code"
            isLoading={isLoading}
            onPress={async () => await handleConfirmCode()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
