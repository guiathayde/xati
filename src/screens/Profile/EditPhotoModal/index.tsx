import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';

import { useTheme } from '../../../hooks/theme';

import {
  Container,
  HandleModal,
  SelectTypePhotoText,
  Divider,
  styles,
} from './styles';

interface EditPhotoModalProps {
  isEditPhotoModalVisible: boolean;
  setIsEditPhotoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditPhotoModal: React.FC<EditPhotoModalProps> = ({
  isEditPhotoModalVisible,
  setIsEditPhotoModalVisible,
}) => {
  const { colors } = useTheme();
  const { height } = useWindowDimensions();

  return (
    <Modal
      isVisible={isEditPhotoModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackButtonPress={() => setIsEditPhotoModalVisible(false)}
      onBackdropPress={() => setIsEditPhotoModalVisible(false)}
      onSwipeComplete={() => setIsEditPhotoModalVisible(false)}
      swipeDirection="down"
      style={{
        ...styles.modalContainer,
        marginTop: height * 0.7,
        height: height * 0.3,
        backgroundColor: colors.editPhotoModalBackground,
      }}
    >
      <Container backgroundColor={colors.editPhotoModalBackground}>
        <HandleModal />

        <TouchableOpacity style={{ marginTop: 16 }}>
          <SelectTypePhotoText>Use camera</SelectTypePhotoText>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity>
          <SelectTypePhotoText>Choose from gallery</SelectTypePhotoText>
        </TouchableOpacity>
      </Container>
    </Modal>
  );
};
