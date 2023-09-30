import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

import { AppNativeStackNavigatorProps } from '../routes/app';

interface UserToChat {
  uid: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
}

export const navigationRef =
  createRef<NavigationContainerRef<AppNativeStackNavigatorProps>>();

export function navigate(
  screen: 'Home' | 'Profile' | 'SearchUser' | 'Chat',
  params?:
    | {
        isNewUser?: boolean;
        chatId?: string;
        userToChat?: UserToChat;
      }
    | undefined,
) {
  switch (screen) {
    case 'Home':
      navigationRef.current?.navigate(screen);
      break;
    case 'Profile':
      navigationRef.current?.navigate(screen, {
        isNewUser: params?.isNewUser ?? false,
      });
      break;
    case 'SearchUser':
      navigationRef.current?.navigate(screen);
      break;
    case 'Chat':
      navigationRef.current?.navigate(screen, {
        chatId: params?.chatId ?? '',
        userToChat: params?.userToChat ?? ({} as UserToChat),
      });
      break;
    default:
      break;
  }
}
