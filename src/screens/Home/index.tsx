import React, { useCallback, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { Text, TouchableOpacity, Image, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

import DefaultUser from '../../assets/screens/Profile/default_user.png';
import ChevronRightIcon from '../../assets/screens/SearchUser/ic_chevron_right.png';
import RightArrowIcon from '../../assets/screens/Home/ic_right_arrow.png';
import SearchUserIcon from '../../assets/screens/Home/ic_menu.png';

interface Chat {
  id: string;
  lastMessage: string;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
    phoneNumber: string;
  };
}

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);

  const getChatsFromFirestore = useCallback(async () => {
    setIsRefreshing(true);

    const unsubscribeList: (() => void)[] = [];

    if (user) {
      const chatsSubscribe = firestore()
        .collection('chats')
        .where('users', 'array-contains', user.uid)
        .onSnapshot(async chatsSnapshot => {
          if (chatsSnapshot && !chatsSnapshot.empty) {
            const userToChatDocs: Promise<
              FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
            >[] = [];
            for (const chatDoc of chatsSnapshot.docs) {
              const userToChatId =
                chatDoc.data()?.users[0] === user.uid
                  ? chatDoc.data()?.users[1]
                  : chatDoc.data()?.users[0];

              userToChatDocs.push(
                firestore().collection('users').doc(userToChatId).get({
                  source: 'server',
                }),
              );
            }

            const userToChatDocsResult = await Promise.all(userToChatDocs);
            for (const [
              index,
              userToChatDoc,
            ] of userToChatDocsResult.entries()) {
              const userToChat = {
                uid: userToChatDoc.id,
                displayName: userToChatDoc.data()?.displayName || '',
                photoURL: userToChatDoc.data()?.photoURL || '',
                phoneNumber: userToChatDoc.data()?.phoneNumber || '',
              };

              const unsubscribe = chatsSnapshot.docs[index].ref
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .limit(1)
                .onSnapshot(messagesSnapshot => {
                  let lastMessageText = '';

                  if (messagesSnapshot) {
                    if (messagesSnapshot.docs.length > 0) {
                      lastMessageText = messagesSnapshot.docs[0].data().text;
                    }
                  }

                  const chat: Chat = {
                    id: chatsSnapshot.docs[index].id,
                    lastMessage: lastMessageText,
                    user: userToChat,
                  };

                  setChats(oldChats => {
                    if (oldChats.some(oldChat => oldChat.id === chat.id)) {
                      return oldChats.map(oldChat =>
                        oldChat.id === chat.id ? chat : oldChat,
                      );
                    }

                    return [chat, ...oldChats];
                  });
                });

              unsubscribeList.push(unsubscribe);
            }
          }
        });

      unsubscribeList.push(chatsSubscribe);
    } else {
      auth().signOut();
    }

    setIsRefreshing(false);

    return unsubscribeList;
  }, [user]);

  useEffect(() => {
    const unsubscribeList = getChatsFromFirestore();

    return () => {
      unsubscribeList.then(list => {
        list.forEach(unsubscribe => unsubscribe());
      });
    };
  }, [getChatsFromFirestore]);

  const photoSource =
    user && user.photoURL ? { uri: user.photoURL } : DefaultUser;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => {
          navigation.navigate('Profile', { isNewUser: false });
        }}
      >
        <Image style={styles.profilePhoto} source={photoSource} />
      </TouchableOpacity>

      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={styles.chatList}
        refreshing={isRefreshing}
        ListEmptyComponent={
          <View style={styles.noChatFoundContainer}>
            <Text style={styles.noChatFoundText}>No chat found</Text>

            <Text style={styles.findUsersHereText}>Find users here</Text>
            <Image style={styles.findUserHereImage} source={RightArrowIcon} />
          </View>
        }
        renderItem={({ item }) => {
          const userToChatPhotoSource = item.user.photoURL
            ? { uri: item.user.photoURL }
            : DefaultUser;
          const userToChatDisplayName = item.user.displayName
            ? item.user.displayName
            : item.user.phoneNumber;

          return (
            <TouchableOpacity
              style={styles.chatItemContainer}
              onPress={() => {
                navigation.navigate('Chat', {
                  chatId: item.id,
                  userToChat: item.user,
                });
              }}
            >
              <Image
                style={styles.chatItemPhoto}
                source={userToChatPhotoSource}
              />
              <View style={styles.chatItemNameLastMessageContainer}>
                <Text style={styles.chatItemName}>{userToChatDisplayName}</Text>
                <Text style={styles.chatItemLastMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              <Image style={styles.chatItemIcon} source={ChevronRightIcon} />
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={styles.searchUserButton}
        onPress={() => {
          navigation.navigate('SearchUser');
        }}
      >
        <Image style={styles.searchUserIcon} source={SearchUserIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
