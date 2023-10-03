import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { AppNativeStackNavigatorProps } from '../../routes/app';

import { useAuth } from '../../hooks/auth';
import { useStatus } from '../../hooks/status';

import { api } from '../../services/api';

import { Back } from '../../components/Back';
import { Input } from '../../components/Input';

import { styles } from './styles';

import DefaultAvatar from '../../assets/screens/Profile/default_user.png';
import SendIcon from '../../assets/screens/Chat/ic_send.png';

interface Message {
  uid: string;
  userUid: string;
  text: string;
  createdAt: string;
}

interface ChatProps {
  route: RouteProp<AppNativeStackNavigatorProps, 'Chat'>;
  navigation: NativeStackNavigationProp<
    AppNativeStackNavigatorProps,
    'Profile'
  >;
}

export const Chat: React.FC<ChatProps> = ({ route }) => {
  const { chatId, userToChat } = route.params;

  const { user } = useAuth();
  const { setCurrentChatId } = useStatus();
  const { removeItem: removeOldNotificationMessages } = useAsyncStorage(
    `@Xati:${userToChat.uid}:notification:messages`,
  );
  const navigation = useNavigation();

  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendMessage = useCallback(async () => {
    if (!user) {
      await auth().signOut();
      return;
    }

    if (newMessageText.trim() !== '') {
      const newMessage = {
        userUid: user.uid,
        text: newMessageText.trim(),
        createdAt: new Date().toISOString(),
      };

      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(newMessage);

      setNewMessageText('');

      // Verificar se o usuário a quem estou enviando a mensagem está online
      const usersStatusDoc = await firestore()
        .collection('usersStatus')
        .doc(userToChat.uid)
        .get();

      if (usersStatusDoc != null && usersStatusDoc.exists) {
        const userStatus = usersStatusDoc.data();

        if (
          userStatus &&
          (userStatus.currentChatId == null ||
            userStatus.currentChatId !== chatId)
        ) {
          console.log('Enviando notificação para usuário online');
          firestore()
            .collection('users')
            .doc(userToChat.uid)
            .collection('notifications')
            .add({
              chatId,
              user: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
              },
              newMessage,
            });
        }
      } else {
        console.log('Enviando notificação para usuário offline');
        api
          .post('/notifications', {
            chatId,
            from: user.uid,
            to: userToChat.uid,
            newMessage,
          })
          .then(() => {
            console.log('Notificação enviada com sucesso');
          })
          .catch(error => {
            console.log(
              'Erro ao enviar notificação para usuário offline',
              error,
            );
          });
      }
    }
  }, [chatId, newMessageText, user, userToChat]);

  useEffect(() => {
    setCurrentChatId(chatId);

    removeOldNotificationMessages();

    const subscriber = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .limitToLast(25)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const message = {
            uid: documentSnapshot.id,
            userUid: documentSnapshot.data().userUid,
            text: documentSnapshot.data().text,
            createdAt: documentSnapshot.data().createdAt,
          };

          setMessages(previousMessages => {
            if (
              previousMessages.some(
                previousMessage => previousMessage.uid === message.uid,
              )
            ) {
              return previousMessages.map(previousMessage =>
                previousMessage.uid === message.uid ? message : previousMessage,
              );
            }

            return [...previousMessages, message];
          });
        });
      });

    return () => {
      setCurrentChatId(null);
      subscriber();
    };
  }, [chatId, removeOldNotificationMessages, setCurrentChatId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Back containerStyle={styles.backButton} onPress={handleBack} />
          <Text style={styles.userToChatName} numberOfLines={1}>
            {userToChat.displayName
              ? userToChat.displayName
              : userToChat.phoneNumber}
          </Text>
          <Image
            style={styles.userToChatProfilePhoto}
            source={
              userToChat.photoURL.length > 0
                ? { uri: userToChat.photoURL }
                : DefaultAvatar
            }
          />
        </View>

        <FlatList
          ref={flatListRef}
          inverted
          data={messages}
          renderItem={({ item, index }) => {
            let marginTop: StyleProp<ViewStyle> = {};
            if (index > 0) {
              const previousMessage = messages[index - 1];
              if (previousMessage.userUid === item.userUid) {
                marginTop = { marginTop: 4 };
              } else {
                marginTop = { marginTop: 16 };
              }
            }

            if (item.userUid === userToChat.uid) {
              return (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      ...marginTop,
                      ...styles.messageText,
                      backgroundColor: 'white',
                      color: '#243443',
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              );
            }

            return (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{
                    ...marginTop,
                    ...styles.messageText,
                    backgroundColor: '#377DFF',
                    color: 'white',
                  }}
                >
                  {item.text}
                </Text>
              </View>
            );
          }}
          keyExtractor={item => item.uid}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={styles.messagesContainer}
        />

        <Input
          containerStyle={{ width: '95%', marginTop: 4, marginBottom: 8 }}
          placeholder="Message"
          returnKeyType="send"
          value={newMessageText}
          autoCapitalize="sentences"
          multiline
          numberOfLines={4}
          onFocus={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
          onChangeText={setNewMessageText}
          onSubmitEditing={handleSendMessage}
          iconSource={SendIcon}
          iconCallback={handleSendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
