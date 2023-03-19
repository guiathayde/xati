import { ButtonHTMLAttributes, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from './styles';

import BackIcon from '../../assets/components/BackButton/back.svg';

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  containerStyle?: CSSProperties;
  onClick?: () => void;
}

export function BackButton({ containerStyle, onClick }: BackButtonProps) {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  }

  return (
    <Container onClick={handleBackButtonClick} style={containerStyle}>
      <img src={BackIcon} alt="Back" />
    </Container>
  );
}
