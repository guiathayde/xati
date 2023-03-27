import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { setupInterceptors } from '../../services/api';

export function InjectAxiosInterceptors() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(signOut, navigate);
  }, [navigate, signOut]);

  return null;
}
