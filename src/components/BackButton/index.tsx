import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import BackIcon from '../../assets/components/BackButton/back.svg';

interface BackButtonProps {
  containerStyle?: CSSProperties;
}

export function BackButton({ containerStyle }: BackButtonProps) {
  return (
    <Link to={'..'} style={containerStyle}>
      <img src={BackIcon} alt="Back" />
    </Link>
  );
}
