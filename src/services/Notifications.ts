import notifee, { AndroidStyle } from '@notifee/react-native';

interface IData {
  data: {
    avatar_url?: string;
    body: string;
    title: string;
  };
  from: string;
  messageId: string;
  sentTime: number;
  ttl: number;
}

export const onDisplayNotification = async ({
  messageId,
  data,
  sentTime,
}: IData) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    id: messageId,
    android: {
      channelId,
      smallIcon: 'ic_small_icon',
      circularLargeIcon: true,
      color: '#377DFF',
      showTimestamp: true,
      style: {
        type: AndroidStyle.MESSAGING,
        person: {
          name: data.title,
          icon: data.avatar_url,
        },
        messages: [
          {
            text: data.body,
            timestamp: sentTime,
            person: {
              name: data.title,
              icon: data.avatar_url,
            },
          },
        ],
      },
    },
  });
};

// export const backgroundNotification = async () => {
//   notifee.onBackgroundEvent()
// }
