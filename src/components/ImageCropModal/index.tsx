import { useState, useCallback, useMemo } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import Modal from 'react-modal';

import { useWindowDimensions } from '../../hooks/windowDimensions';

import { RectangleButton } from '../RectangleButton';

import { getCroppedImg } from './getCroppedImg';

import {
  Container,
  CropContainer,
  Controls,
  SliderField,
  Slider,
  Buttons,
  CroppedImage,
  modalDefaultStyles,
} from './styles';

interface ImageCropModalProps {
  isImageCropModalOpen: boolean;
  setIsImageCropModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  croppedImageSource: string | undefined;
  setCroppedImageSource: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;

  imgSource: string;
}

export function ImageCropModal({
  isImageCropModalOpen,
  setIsImageCropModalOpen,
  croppedImageSource,
  setCroppedImageSource,
  imgSource,
}: ImageCropModalProps) {
  const windowDimensions = useWindowDimensions();
  const windowWidth = windowDimensions.width;
  const isMobile = windowDimensions.isMobile;

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [isCroppedImageModalOpen, setIsCroppedImageModalOpen] = useState(false);

  const croppedImageSize = useMemo(
    () => (windowWidth * 0.8 > 425 ? 425 * 0.8 : windowWidth * 0.8),
    [windowWidth],
  );

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const showCroppedImage = useCallback(async () => {
    if (croppedAreaPixels)
      try {
        const newCroppedImage = await getCroppedImg(
          imgSource,
          croppedAreaPixels,
          rotation,
        );

        console.log('newCroppedImage:', newCroppedImage);

        if (newCroppedImage) {
          setCroppedImageSource(newCroppedImage);
          setIsCroppedImageModalOpen(true);
        }
      } catch (e) {
        console.error(e);
        alert('Erro ao recortar a imagem');
      }
  }, [croppedAreaPixels, imgSource, rotation, setCroppedImageSource]);

  return (
    <>
      <Modal
        isOpen={isImageCropModalOpen}
        onRequestClose={() => setIsImageCropModalOpen(false)}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        style={{
          overlay: modalDefaultStyles.overlay,
          content: {
            ...modalDefaultStyles.content,
            borderRadius: isMobile ? 0 : 12,
          },
        }}
      >
        <Container>
          <CropContainer>
            <Cropper
              image={imgSource}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </CropContainer>
          <Controls>
            <SliderField>
              <label htmlFor="zoom">Zoom</label>
              <Slider
                name="zomm"
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={e => setZoom(Number(e.target.value))}
              />
            </SliderField>
            <SliderField>
              <label htmlFor="rotation">Rotation</label>
              <Slider
                name="rotation"
                type="range"
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={e => setRotation(Number(e.target.value))}
              />
            </SliderField>

            <Buttons>
              <RectangleButton
                backgroundColor="#FF4D4F"
                style={{ width: '45%' }}
                onClick={() => setIsImageCropModalOpen(false)}
              >
                Cancel
              </RectangleButton>
              <RectangleButton
                style={{ width: '45%' }}
                onClick={async () => await showCroppedImage()}
              >
                Continue
              </RectangleButton>
            </Buttons>
          </Controls>
        </Container>
      </Modal>

      <Modal
        isOpen={isCroppedImageModalOpen}
        onRequestClose={() => setIsCroppedImageModalOpen(false)}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        style={{
          overlay: modalDefaultStyles.overlay,
          content: {
            ...modalDefaultStyles.content,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: isMobile ? 0 : 12,
          },
        }}
      >
        <CroppedImage
          style={{ width: croppedImageSize, height: croppedImageSize }}
          src={croppedImageSource}
          alt="Cropped"
        />

        <RectangleButton
          style={{ width: '80%', marginTop: 16 }}
          onClick={() => {
            setIsCroppedImageModalOpen(false);
            setIsImageCropModalOpen(false);
          }}
        >
          Save
        </RectangleButton>
        <RectangleButton
          backgroundColor="#FF4D4F"
          style={{ width: '80%', marginTop: 16, marginBottom: 16 }}
          onClick={() => {
            setIsCroppedImageModalOpen(false);
          }}
        >
          Back
        </RectangleButton>
      </Modal>
    </>
  );
}
