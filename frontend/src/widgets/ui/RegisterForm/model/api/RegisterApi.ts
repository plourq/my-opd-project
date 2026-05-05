import { BASE_URL } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '@/app/Context/UserContext';
import type { IError, IResponse } from '@/app/constants/types';
import { useSetLocalToken, useSetLocalUser } from '@/app/utils/user.utils';
import type { IUserResponse, IRegisterUser, IRegisterErrors } from '../types';
import { useNavigate } from 'react-router-dom';

const registerFetch = async (
  body: IRegisterUser
): Promise<IResponse<IUserResponse>> => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error: IError<IRegisterErrors> = await response.json();
    throw error;
  }

  return response.json();
};

export const useRegisterUser = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerFetch,
    onSuccess: data => {
      if (data?.data) {
        setUser(data.data.user);
        useSetLocalUser(data.data.user);
        useSetLocalToken(data.data.token);
        navigate('/home');
      }
    },
    onError: (error: IError<IRegisterErrors>) => {
      return error;
    },
  });
};
