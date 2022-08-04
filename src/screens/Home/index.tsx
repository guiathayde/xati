import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { IMessage } from 'react-native-gifted-chat';

import { useTheme } from '../../hooks/theme';

import { Chat } from './Chat';

import {
  Container,
  Profile,
  ProfilePhoto,
  NoChatFound,
  SearchUserButton,
  SearchUserIcon,
  FindUsersHereContainer,
  FindUsersHereText,
  FindUsersHereArrow,
} from './styles';

import FloatingButtonIcon from '../../assets/home/ic_floating_button.png';
import ArrowRightIcon from '../../assets/home/ic_right_arrow.png';
import { FlatList } from 'react-native';

type User = {
  uid: string;
  name: string;
  photoUrl: string;
};

type ChatProps = {
  id: string;
  users: User[];
  lastMessage: IMessage;
  [key: string]: any;
};

export const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [user, setUser] = useState<User>();
  const [chats, setChats] = useState<ChatProps[]>();

  useEffect(() => {
    const userData = auth().currentUser;

    if (userData) {
      setUser({
        uid: userData.uid,
        name: userData.displayName ? userData.displayName : '',
        photoUrl: userData.photoURL ? userData.photoURL : '',
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('chatsData')
        .where('usersId', 'array-contains', user.uid)
        .onSnapshot(snapshot => {
          if (!snapshot.empty) {
            const chatsUpdated = snapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            }) as ChatProps[];

            setChats(chatsUpdated);
          }
        });

      return () => subscriber();
    }
  }, [user]);

  return (
    <Container backgroundColor={colors.appBackground}>
      <Profile onPress={() => navigation.navigate('Profile')}>
        <ProfilePhoto source={{ uri: user?.photoUrl }} />
      </Profile>

      <FlatList
        style={{ flex: 1, width: '100%', marginTop: 16 }}
        data={chats}
        renderItem={({ item }) => (
          <Chat
            key={item.id}
            chatData={item}
            onPress={() => navigation.navigate('Chat')}
          />
        )}
      />

      {typeof chats === 'undefined' && (
        <>
          <NoChatFound color={colors.descriptionFont}>
            No chat found
          </NoChatFound>

          <FindUsersHereContainer>
            <FindUsersHereText color={colors.descriptionFont}>
              find users here
            </FindUsersHereText>
            <FindUsersHereArrow source={ArrowRightIcon} />
          </FindUsersHereContainer>
        </>
      )}

      <SearchUserButton onPress={() => navigation.navigate('SearchUser')}>
        <SearchUserIcon source={FloatingButtonIcon} />
      </SearchUserButton>
    </Container>
  );
};
