import React, { useCallback, useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActivityIndicator, Alert, Keyboard, TextInput } from 'react-native';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

import Input from '../../components/Input';

import {
  Container,
  BackButton,
  BackIcon,
  BackButtonText,
  LogoImage,
  RegisterText,
  ForgotPasswordButton,
  ForgotPasswordText,
  Button,
  ButtonText,
  LoadingView,
  styles,
} from './styles';

import logoImg from '../../assets/logo-white.png';
import backIcon from '../../assets/back-icon.png';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Senha no mínimo de 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log(err.message);

          Alert.alert(
            'Erro na autenticação',
            'Ocorreu um erro ao fazer login, cheque as credenciais.',
          );

          setLoading(false);

          return;
        }
      }
    },
    [signIn],
  );

  const navigateToFirstScreen = useCallback(() => {
    navigate('FirstScreen');
  }, [navigate]);

  const navigateToForgotPassword = useCallback(() => {
    navigate('ForgotPassword');
  }, [navigate]);

  return (
    <>
      <Container>
        <BackButton onPress={navigateToFirstScreen}>
          <BackIcon source={backIcon} />
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>

        <KeyboardAvoidingScrollView
          containerStyle={styles.keyboardAvoidingScrollView}
          showsVerticalScrollIndicator={false}
        >
          <LogoImage source={logoImg} />

          <RegisterText>Faça seu login</RegisterText>

          <Form ref={formRef} onSubmit={handleSignIn} style={{ width: '100%' }}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              placeholder="Insira seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              placeholder="Insira sua senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                formRef.current?.submitForm();
              }}
            />

            <ForgotPasswordButton onPress={() => navigateToForgotPassword()}>
              <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
            </ForgotPasswordButton>

            <Button
              onPress={() => {
                Keyboard.dismiss();
                formRef.current?.submitForm();
              }}
            >
              <ButtonText>Login</ButtonText>
            </Button>
          </Form>

          {loading && (
            <LoadingView>
              <ActivityIndicator size="large" color="#377DFF" />
            </LoadingView>
          )}
        </KeyboardAvoidingScrollView>
      </Container>
    </>
  );
};

export default SignIn;
