import React from 'react';

import { useTheme } from '../../../hooks/theme';

import { Container, Photo, NameText, ChevronRight, Divider } from './styles';

import ChevronRightIcon from '../../../assets/home/chat/ic_chevron_right.png';

interface UserFoundProps {}

export const UserFound: React.FC<UserFoundProps> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <Container>
        <Photo
          source={{ uri: 'https://source.unsplash.com/tNCH0sKSZbA/300x300' }}
        />

        <NameText
          style={{ transform: [{ translateX: -45 }] }}
          color={colors.descriptionFont}
          numberOfLines={1}
        >
          Annette Black
        </NameText>

        <ChevronRight source={ChevronRightIcon} />
      </Container>

      <Divider />
    </>
  );
};
