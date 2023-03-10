import { Message } from '../interfaces/Message';

export const messages: Message[] = [
  {
    id: '1',
    text: 'Hello',
    user: {
      id: '1',
      name: 'Annette Black',
      email: 'annete.black@gmail.com',
      avatar: 'https://avatars.githubusercontent.com/u/61200282?v=4',
    },
  },
  {
    id: '2',
    text: 'Hello, how are you?',
    user: {
      id: '2',
      name: 'Guilherme Athayde',
      email: 'guiathayde@gmail.com',
      avatar: 'https://avatars.githubusercontent.com/u/69310777?v=4',
    },
  },
  {
    id: '3',
    text: 'I am fine, and you?',
    user: {
      id: '1',
      name: 'Annette Black',
      email: 'annete.black@gmail.com',
      avatar: 'https://avatars.githubusercontent.com/u/61200282?v=4',
    },
  },
  {
    id: '4',
    text: 'I am fine, thanks!',
    user: {
      id: '2',
      name: 'Guilherme Athayde',
      email: 'guiathayde@gmail.com',
      avatar: 'https://avatars.githubusercontent.com/u/69310777?v=4',
    },
  },
  {
    id: '5',
    text: 'What are you doing?',
    user: {
      id: '1',
      name: 'Annette Black',
      email: 'annete.black@gmail.com',
      avatar: 'https://avatars.githubusercontent.com/u/61200282?v=4',
    },
  },
];
