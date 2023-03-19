import Modal from 'react-modal';
import { TailSpin } from 'react-loader-spinner';

import { modalDefaultStyles, Container } from './styles';

interface LoadingModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function LoadingModal({ isOpen, setIsOpen }: LoadingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
      style={modalDefaultStyles}
    >
      <Container>
        <TailSpin ariaLabel="loading" color="#377DFF" radius="5" />
        Loading
      </Container>
    </Modal>
  );
}
