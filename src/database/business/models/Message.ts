import { ObjectSchema } from 'realm';

export const UserMessageSchema: ObjectSchema = {
  name: 'UserMessage',
  embedded: true,
  properties: {
    _id: 'string',
    name: 'string?',
    avatar: 'string?',
  },
};

export const MessageSchema: ObjectSchema = {
  name: 'Message',
  properties: {
    _id: 'string',
    text: 'string',
    createdAt: 'int',
    user: 'UserMessage',
    image: 'string?',
    video: 'string?',
    audio: 'string?',
    system: 'bool?',
    sent: 'bool?',
    received: 'bool?',
    pending: 'bool?',
  },
  primaryKey: '_id',
};
