import Config from 'react-native-config';
import axios from 'axios';

export const sendNotificationToFirebase = (
  deviceFCMToken: string,
  userName: string,
  newMessageText: string,
) => {
  console.log(Config.FIREBASE_CLOUD_MESSAGING_API_KEY);

  axios
    .post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: deviceFCMToken,
        notification: {
          title: userName,
          body: newMessageText,
        },
        data: {
          notifee: JSON.stringify({
            body: 'This message was sent via FCM!',
            android: {
              channelId: 'default',
              actions: [
                {
                  title: 'Mark as Read',
                  pressAction: {
                    id: 'read',
                  },
                },
              ],
            },
          }),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${Config.FIREBASE_CLOUD_MESSAGING_API_KEY}`,
        },
      },
    )
    .then(response => {
      if (response.data.success === 1) {
        console.log('Notification sent successfully');
      } else if (response.data.failure === 1) {
        console.error('Notification failed to send', response.data.results[0]);
      }
    })
    .catch(error => console.error('Error sending notification to FCM:', error));
};
