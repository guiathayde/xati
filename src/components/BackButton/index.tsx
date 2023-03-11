import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import BackIcon from '../../assets/components/BackButton/back.svg';

interface BackButtonProps {
  containerStyle?: CSSProperties;
  onClick?: () => void;
}

export function BackButton({ containerStyle, onClick }: BackButtonProps) {
  return (
    <Link to={onClick ? '' : '..'} onClick={onClick} style={containerStyle}>
      <img src={BackIcon} alt="Back" />
    </Link>
  );
}
