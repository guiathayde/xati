import React, { useCallback, useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
  const navigation = useNavigation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSendMessage = useCallback(async () => {
    if (!user) {
      await auth().signOut();
      return;
    }

    if (newMessage.trim() !== '') {
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          userUid: user.uid,
          text: newMessage,
          createdAt: new Date().toISOString(),
        });

      setNewMessage('');
    }
  }, [chatId, newMessage, user]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
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

    return () => subscriber();
  }, [chatId]);

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
          value={newMessage}
          autoCapitalize="sentences"
          multiline
          numberOfLines={4}
          onChangeText={setNewMessage}
          onSubmitEditing={async () => {
            await handleSendMessage();
          }}
          iconSource={SendIcon}
          iconCallback={async () => {
            await handleSendMessage();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
