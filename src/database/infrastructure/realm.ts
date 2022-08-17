import Realm from 'realm';
import { UserMessageSchema, MessageSchema } from '../business/models/Message';

export const openConnectionMessageTable = async (path: string) =>
  await Realm.open({
    path,
    schema: [UserMessageSchema, MessageSchema],
  });
