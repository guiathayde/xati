import { IMessage } from 'react-native-gifted-chat';
import Realm from 'realm';

export type IMessageObject = IMessage & Realm.Object;
