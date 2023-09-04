import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { formatIncompletePhoneNumber, isValidNumber } from 'libphonenumber-js';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Back } from '../../components/Back';
import { Input } from '../../components/Input';

import { styles } from './styles';

import SearchIcon from '../../assets/screens/SearchUser/ic_search.png';
import UserNotFoundIcon from '../../assets/screens/SearchUser/ic_sad_emoji.png';
import ChevronRightIcon from '../../assets/screens/SearchUser/ic_chevron_right.png';

interface UserFound {
  uid: string;
  displayName: string;
  photoURL: string;
}

export const SearchUser: React.FC = () => {
  const naigavetion = useNavigation();
  const { user } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [userFound, setUserFound] = useState<UserFound>();

  const handleBack = useCallback(() => {
    naigavetion.goBack();
  }, [naigavetion]);

  const handleSearchUser = useCallback(async (phone: string) => {
    setIsUserNotFound(false);

    if (isValidNumber(phone)) {
      const usersFound = await firestore()
        .collection('users')
        .where('phoneNumber', '==', phone)
        .get();

      if (usersFound.docs.length > 0) {
        setUserFound({
          uid: usersFound.docs[0].id,
          ...usersFound.docs[0].data(),
        } as UserFound);
        setIsUserNotFound(false);
      } else {
        setIsUserNotFound(true);
      }
    } else {
      Alert.alert('Invalid phone number.');
    }
  }, []);

  const handleStartChat = useCallback(async () => {
    if (userFound && user) {
      const chatAlreadyExists = await firestore()
        .collection('chats')
        .where(
          firestore.Filter.or(
            firestore.Filter('users', '==', [userFound.uid, user.uid]),
            firestore.Filter('users', '==', [user.uid, userFound.uid]),
          ),
        )
        .get();

      if (chatAlreadyExists.docs.length > 0) {
        naigavetion.navigate('Chat', {
          chatId: chatAlreadyExists.docs[0].id,
          userToChat: userFound,
        });
      } else {
        const chatRef = await firestore()
          .collection('chats')
          .add({
            users: [userFound.uid, user.uid],
          });

        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            chats: firestore.FieldValue.arrayUnion(chatRef.id),
          });

        await firestore()
          .collection('users')
          .doc(userFound.uid)
          .update({
            chats: firestore.FieldValue.arrayUnion(chatRef.id),
          });

        await firestore()
          .collection('chats')
          .doc(chatRef.id)
          .collection('messages')
          .doc()
          .set({}, { merge: true });

        naigavetion.navigate('Chat', {
          chatId: chatRef.id,
          userToChat: userFound,
        });
      }
    }
  }, [naigavetion, user, userFound]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Back
              containerStyle={{
                top: -10,
              }}
              onPress={handleBack}
            />

            <Text style={styles.title}>Search User</Text>
          </View>

          <Input
            containerStyle={{
              width: '85%',
              marginTop: 8,
            }}
            inputStyle={{
              letterSpacing: 0,
            }}
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
              await handleSearchUser(phoneNumber);
            }}
            iconSource={SearchIcon}
            iconCallback={async () => {
              Keyboard.dismiss();
              await handleSearchUser(phoneNumber);
            }}
          />

          {!isUserNotFound && userFound && (
            <TouchableOpacity
              style={styles.userFoundContainer}
              onPress={async () => await handleStartChat()}
            >
              <Image
                style={styles.userFoundProfilePhoto}
                source={{ uri: userFound.photoURL }}
              />
              <Text style={styles.userFoundName}>{userFound.displayName}</Text>
              <Image
                style={styles.userFoundChevronRight}
                source={ChevronRightIcon}
              />
            </TouchableOpacity>
          )}

          {isUserNotFound && (
            <View style={styles.userNotFoundContainer}>
              <Text style={styles.userNotFoundText}>User not found</Text>
              <Image
                style={styles.userNotFoundIcon}
                source={UserNotFoundIcon}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
