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
  FormContent,
  RegisterText,
  Button,
  ButtonText,
  LoadingView,
  styles,
} from './styles';

import logoImg from '../../assets/logo-white.png';
import backIcon from '../../assets/back-icon.png';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { navigate } = useNavigation();

  const { signUp } = useAuth();

  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (await signUp(data)) {
          setLoading(false);
          navigate('UploadProfilePhoto');
          return;
        }

        setLoading(false);
        Alert.alert('Erro ao criar conta', 'Por favor tente de novo');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log(err.message);
          setLoading(false);
          Alert.alert('Erro ao criar usuário', 'Tente novamente.');
          return;
        }
      }
    },
    [signUp, navigate],
  );

  const navigateToFirstScreen = useCallback(() => {
    navigate('FirstScreen');
  }, [navigate]);

  return (
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

        <FormContent>
          <RegisterText>Cadastre-se</RegisterText>

          <Form ref={formRef} onSubmit={handleSignUp} style={{ width: '100%' }}>
            <Input
              autoCorrect={false}
              autoCapitalize="words"
              keyboardType="default"
              name="name"
              placeholder="Insira seu nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
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

            <Button
              onPress={() => {
                Keyboard.dismiss();
                formRef.current?.submitForm();
              }}
            >
              <ButtonText>Próximo</ButtonText>
            </Button>
          </Form>
        </FormContent>

        {loading && (
          <LoadingView>
            <ActivityIndicator size="large" color="#377DFF" />
          </LoadingView>
        )}
      </KeyboardAvoidingScrollView>
    </Container>
  );
};

export default SignUp;
