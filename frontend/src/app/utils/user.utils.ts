import type { IUser } from '../constants/types';

export const useGetLocalToken = () => {
  return localStorage.getItem('token');
};

export const useSetLocalToken = (newToken: string) => {
  return localStorage.setItem('token', newToken);
};

export const useDeleteLocalToken = () => {
  return localStorage.removeItem('token');
};

export const useGetLocalUser = () => {
  const localUser = localStorage.getItem('user');
  return localUser ? JSON.parse(localUser) : null;
};

export const useSetLocalUser = (newUser: IUser) => {
  return localStorage.setItem('user', JSON.stringify(newUser));
};

export const useDeleteLocalUser = () => {
  return localStorage.removeItem('user');
};
