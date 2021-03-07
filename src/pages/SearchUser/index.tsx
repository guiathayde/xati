import React, { useCallback, useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActivityIndicator, Alert, TextInput } from 'react-native';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import apiFirebase from '../../database/apiFirebase';

import Input from '../../components/Input';

import {
  Container,
  Header,
  BackButton,
  BackIcon,
  BackButtonText,
  TitleText,
  FormContent,
  LoadingView,
  UserNotFoundView,
  UserNotFoundText,
  SadEmoji,
  BoxShadowButton,
  Button,
  ButtonIconImage,
  UsersList,
  UserContainer,
  UserContent,
  UserName,
  UserAvatar,
  styles,
} from './styles';

import backIcon from '../../assets/back-icon.png';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface SearchFormData {
  search: string;
}

export interface User {
  _id: string;
  name: string;
  avatar?: string;
}

const SearchUser: React.FC = () => {
  const { user } = useAuth();

  const { goBack, navigate } = useNavigation();

  const [users, setUsers] = useState<User[]>([]);
  const [usersNotFound, setUsersNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const searchInputRef = useRef<TextInput>(null);

  const handleSearchUser = useCallback(async (data: SearchFormData) => {
    try {
      setUsersNotFound(true);
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        search: Yup.string().required('É necessário um nome'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const usersSearched = await apiFirebase.findUserByName(
        data.search.trim(),
      );

      if (usersSearched !== null) {
        setUsersNotFound(false);
        setLoading(false);
        setUsers(usersSearched);
      } else {
        setLoading(false);
        setUsersNotFound(true);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        return;
      }

      Alert.alert('Erro ao fazer a busca', 'Tente novamente.');
    }
  }, []);

  const navigateToHome = useCallback(() => {
    goBack();
  }, [goBack]);

  const navigateToChat = useCallback(
    async (selectedUser: User) => {
      if (selectedUser._id === user._id) {
        Alert.alert(
          'Erro ao criar a conversa',
          'Não é possível criar uma conversa consigo mesmo.',
        );
        return;
      }

      const verifyChat = await apiFirebase.verifyChat(selectedUser.name);

      if (verifyChat) {
        navigate('Chat', verifyChat);
        return;
      }

      const chatData = {
        chatId: new Date().getTime().toString(),
        user: {
          _id: selectedUser._id,
          name: selectedUser.name,
          avatar: selectedUser.avatar,
        },
      };

      await apiFirebase.saveChatId(selectedUser, chatData.chatId);

      navigate('Chat', { chatData });
    },
    [user._id, navigate],
  );

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={navigateToHome}>
            <BackIcon source={backIcon} />
            <BackButtonText>Voltar</BackButtonText>
          </BackButton>

          <TitleText>Procurar usuário</TitleText>
        </Header>

        <FormContent>
          <Form ref={formRef} onSubmit={handleSearchUser} style={styles.form}>
            <Input
              ref={searchInputRef}
              containerStyle={styles.inputContainer}
              autoCorrect={false}
              autoCapitalize="words"
              name="search"
              placeholder="Digite o nome do usuário"
              returnKeyType="search"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <BoxShadowButton styles={styles.boxShadowButton}>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                <ButtonIconImage
                  source={require('../../assets/search-icon.png')}
                />
              </Button>
            </BoxShadowButton>
          </Form>
        </FormContent>

        {loading && (
          <LoadingView>
            <ActivityIndicator size="large" color="#377DFF" />
          </LoadingView>
        )}

        {usersNotFound && (
          <UserNotFoundView>
            <UserNotFoundText>Nenhum usuário encontrado</UserNotFoundText>
            <SadEmoji source={require('../../assets/sad-emoji.png')} />
          </UserNotFoundView>
        )}

        {users && (
          <UsersList
            showsVerticalScrollIndicator={false}
            data={users}
            keyExtractor={userData => userData._id}
            renderItem={({ item: userData }) => (
              <UserContainer onPress={() => navigateToChat(userData)}>
                <UserContent>
                  <UserName>{userData.name}</UserName>

                  <UserAvatar source={{ uri: userData.avatar }} />
                </UserContent>
              </UserContainer>
            )}
          />
        )}
      </Container>
    </>
  );
};

export default SearchUser;
