import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const setupInterceptors = (
  signOut: () => void,
  navigate: NavigateFunction,
) => {
  api.interceptors.response.use(
    async response => {
      // success
      return response;
    },
    async error => {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          signOut();
          navigate('/signin');
        }
      }

      return await Promise.reject(error);
    },
  );
};
