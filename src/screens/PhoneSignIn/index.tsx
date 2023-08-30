import React, { useCallback, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Keyboard, Text } from 'react-native';
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
        await confirm.confirm(code);
      }
    } catch (error) {
      console.log('Invalid code.');
      console.error(error);
    }

    setIsLoading(false);
  }, [code, confirm]);

  if (!confirm) {
    return (
      <SafeAreaView style={styles.sendPhoneNumberContainer}>
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
            marginBottom: 16,
          }}
          title="Phone Number Sign In"
          isLoading={isLoading}
          onPress={async () => await handleSignInWithPhoneNumber(phoneNumber)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.sendPhoneNumberContainer}>
      <Back onPress={handleBack} />

      <Logo containerStyle={{ marginTop: 128, marginBottom: 16 }} />

      <Text style={styles.sendPhoneNumberDescription}>
        Enter the 6 digit code we sent to you
      </Text>

      <Input
        containerStyle={styles.inputContainer}
        inputStyle={{ textAlign: 'center', fontSize: 24, letterSpacing: 12 }}
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
          marginTop: 'auto',
          marginBottom: 16,
        }}
        title="Confirm Code"
        isLoading={isLoading}
        onPress={async () => await handleConfirmCode()}
      />
    </SafeAreaView>
  );
};
