export interface User {
  id: string;
  socketId?: string;
  name?: string;
  email?: string;
  photoId?: string;
  photoUrl?: string;
  phoneNumber: string;
  isOnline: boolean;
  firebaseCloudMessagingToken?: string;
}
