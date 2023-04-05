import { ReactNode, useEffect } from 'react';
import toast, { Toaster, ToasterProps } from 'react-hot-toast';

import {
  Container,
  ButtonsContainer,
  ConfirmButton,
  CancelButton,
} from './styles';

interface ToastyContainerProps extends ToasterProps {
  confirmButton: {
    label: string;
    onClick: () => void;
  };
  cancelButton: {
    label: string;
    onClick: () => void;
  };
  content: ReactNode;
}

export function ToastyContainer({
  confirmButton,
  cancelButton,
  content,
  ...rest
}: ToastyContainerProps) {
  useEffect(() => {
    toast.custom(t => (
      <Container className={t.visible ? 'animate-enter' : 'animate-leave'}>
        {content}
        <ButtonsContainer>
          <ConfirmButton onClick={confirmButton.onClick}>
            {confirmButton.label}
          </ConfirmButton>
          <CancelButton
            onClick={() => {
              cancelButton.onClick();
              toast.dismiss(t.id);
            }}
            style={{ color: '#FF4D4F' }}
          >
            {cancelButton.label}
          </CancelButton>
        </ButtonsContainer>
      </Container>
    ));
  }, [content, confirmButton, cancelButton]);

  return (
    <Toaster
      position="top-center"
      containerStyle={{ marginTop: 16 }}
      {...rest}
    />
  );
}
