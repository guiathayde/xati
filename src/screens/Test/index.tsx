import React from 'react';
import { useNavigation } from '@react-navigation/native';
import notifee, {
  AndroidGroupAlertBehavior,
  AndroidStyle,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

export const Test: React.FC = () => {
  const navigation = useNavigation();

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // notifee.displayNotification({
    //   title: 'Caio Athayde',
    //   android: {
    //     channelId,
    //     groupSummary: true,
    //     groupId: '123',
    //     groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
    //     largeIcon: 'https://source.unsplash.com/random/300x300?baby',
    //     style: {
    //       type: AndroidStyle.INBOX,
    //       lines: [
    //         'Hey, how are you?',
    //         "I'm doing great, what about you?",
    //         'Awesome, lets catch up!',
    //         'Sure, see you then!',
    //       ],
    //     },
    //   },
    // });

    notifee.displayNotification({
      title: 'Caio Athayde',
      body: 'Hey, how are you?',
      android: {
        channelId,
        groupSummary: true,
        groupId: '123',
        groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
        showTimestamp: true,
        largeIcon: 'https://source.unsplash.com/random/300x300?baby',
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: 'Caio Athayde',
            icon: 'https://source.unsplash.com/random/300x300?baby',
          },
          messages: [
            {
              text: 'Hey, how are you?',
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
            {
              text: "I'm doing great, what about you?",
              timestamp: Date.now(), // Now,
            },
            {
              text: 'Awesome, lets catch up!',
              timestamp: Date.now(),
            },
            {
              text: 'Sure, see you then!',
              timestamp: Date.now(),
            },
            {
              text: 'Hey, how are you?',
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
            {
              text: "I'm doing great, what about you?",
              timestamp: Date.now(), // Now,
            },
            {
              text: 'Awesome, lets catch up!',
              timestamp: Date.now(),
            },
            {
              text: 'Sure, see you then!',
              timestamp: Date.now(),
            },
          ],
        },
      },
    });
  }

  async function clearMessagesInStorage() {
    await AsyncStorage.removeItem(
      '@Xati:LEGyvDlyjjwBWLDQT8pnjH6kwPAy:notification:messages',
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />

      <Button
        title="Clear Messages in Storage"
        onPress={() => clearMessagesInStorage()}
      />

      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
};
