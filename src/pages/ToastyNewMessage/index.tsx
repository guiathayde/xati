import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFirebase } from '../../hooks/firebase';
import { useAuth } from '../../hooks/auth';
import { useTranslate } from '../../hooks/translate';
import { useColorMode } from '../../hooks/colorMode';

import { api } from '../../services/api';

import { ToastyContainer } from '../../components/ToastyContainer';

import { InfoContainer, ProfileImage, NameMessageContainer } from './styles';

import profileDefaultLight from '../../assets/shared/profileDefaultLight.svg';
import profileDefaultDark from '../../assets/shared/profileDefaultDark.svg';

export function ToastyNewMessage() {
  const {
    notificationPermission,
    getFirebaseCloudMessagingToken,
    foregroundNotification,
  } = useFirebase();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { strings } = useTranslate();
  const { mode } = useColorMode();

  useEffect(() => {
    if (user && notificationPermission === 'granted') {
      getFirebaseCloudMessagingToken()
        .then(async firebaseCloudMessagingToken => {
          await api.patch('/users/fcmtoken', {
            id: user.id,
            firebaseCloudMessagingToken,
          });
        })
        .catch(error => console.error(error));
    }
  }, [notificationPermission, user, getFirebaseCloudMessagingToken]);

  return foregroundNotification ? (
    <ToastyContainer
      content={
        <InfoContainer>
          <ProfileImage
            src={
              foregroundNotification.photoUrl?.length
                ? foregroundNotification.photoUrl
                : mode === 'light'
                ? profileDefaultLight
                : profileDefaultDark
            }
            alt={foregroundNotification.title}
          />
          <NameMessageContainer>
            <strong>{foregroundNotification.title}</strong>
            <span>{foregroundNotification.body}</span>
          </NameMessageContainer>
        </InfoContainer>
      }
      confirmButton={{
        label: strings.promptNewMessage.open,
        onClick: () => {
          navigate(`/chat/${foregroundNotification.id}`);
        },
      }}
      cancelButton={{
        label: strings.promptNewMessage.close,
        onClick: () => {},
      }}
    />
  ) : null;
}
