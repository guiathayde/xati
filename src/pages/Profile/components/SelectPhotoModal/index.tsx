import { ChangeEvent, useMemo } from 'react';
import Modal from 'react-modal';

import { useWindowDimensions } from '../../../../hooks/windowDimensions';
import { useTranslate } from '../../../../hooks/translate';

import { modalStyles, HandleModal, TextChoice, Divider } from './styles';

interface SelectPhotoModalProps {
  isSelectPhotoModalOpen: boolean;
  setIsSelectPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectPhoto(e: ChangeEvent<HTMLInputElement>): void;
}

export function SelectPhotoModal({
  isSelectPhotoModalOpen,
  setIsSelectPhotoModalOpen,
  handleSelectPhoto,
}: SelectPhotoModalProps) {
  const { isMobile, height } = useWindowDimensions();
  const { strings } = useTranslate();

  const modalMarginBottom = useMemo(() => {
    if (isMobile) return 0;

    const spaceAvailable = height * 0.05;
    return spaceAvailable / 2;
  }, [isMobile, height]);

  return (
    <Modal
      isOpen={isSelectPhotoModalOpen}
      onRequestClose={() => setIsSelectPhotoModalOpen(false)}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      ariaHideApp={false}
      style={{
        overlay: modalStyles.overlay,
        content: {
          ...modalStyles.content,
          marginBottom: isMobile ? 0 : modalMarginBottom,
          borderBottomLeftRadius: isMobile ? 0 : 12,
          borderBottomRightRadius: isMobile ? 0 : 12,
        },
      }}
      contentLabel="Select Photo"
    >
      <HandleModal />

      <TextChoice htmlFor="take-photo">
        {strings.profile.selectPhotoModal.takePhoto}
        <input
          id="take-photo"
          name="take-photo"
          accept="image/*"
          type="file"
          capture="environment"
          onChange={e => handleSelectPhoto(e)}
        />
      </TextChoice>

      <Divider />

      <TextChoice htmlFor="choose-gallery">
        {strings.profile.selectPhotoModal.chooseGallery}
        <input
          id="choose-gallery"
          name="choose-gallery"
          accept="image/*"
          type="file"
          onChange={e => handleSelectPhoto(e)}
        />
      </TextChoice>
    </Modal>
  );
}
