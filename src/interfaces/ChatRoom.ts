import { User } from './User';
import { Message } from './Message';

export interface ChatRoom {
  id: string;

  users: User[];
  messages: Message[];

  createdAt: Date;
  updatedAt: Date;
}
