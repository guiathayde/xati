import React, { useCallback, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, TextInput } from 'react-native';
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
  Button,
  ButtonText,
  styles,
} from './styles';

import logoImg from '../../assets/logo-white.png';
import backIcon from '../../assets/back-icon.png';
import { useNavigation } from '@react-navigation/native';
import apiFirebase from '../../database/apiFirebase';

interface SignInFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const { navigate } = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await apiFirebase.forgotPassword(data.email);

      response
        ? Alert.alert(
            'E-mail de recuperação enviado',
            'Cheque seu e-mail para redefinir sua senha.',
          )
        : Alert.alert(
            'Erro ao enviar e-mail, cheque seu e-mail e tente novamente.',
          );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);

        Alert.alert(
          'Erro no e-mail',
          'Ocorreu um erro ao fazer a recuperação de senha, cheque o e-mail utilizado.',
        );

        return;
      }
    }
  }, []);

  const navigateToSignIn = useCallback(() => {
    navigate('SignIn');
  }, [navigate]);

  return (
    <>
      <Container>
        <BackButton onPress={navigateToSignIn}>
          <BackIcon source={backIcon} />
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>

        <LogoImage source={logoImg} />

        <KeyboardAvoidingScrollView
          containerStyle={styles.keyboardAvoidingScrollView}
          showsVerticalScrollIndicator={false}
        >
          <RegisterText>Esqueceu sua senha?</RegisterText>

          <Form ref={formRef} onSubmit={handleSignIn} style={{ width: '100%' }}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              placeholder="Insira seu e-mail"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <ButtonText>Recuperar senha</ButtonText>
            </Button>
          </Form>
        </KeyboardAvoidingScrollView>
      </Container>
    </>
  );
};

export default ForgotPassword;
