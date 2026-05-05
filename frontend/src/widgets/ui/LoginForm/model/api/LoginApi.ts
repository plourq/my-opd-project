import { BASE_URL } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '@/app/Context/UserContext';
import type { IError, IResponse } from '@/app/constants/types';
import { useSetLocalToken, useSetLocalUser } from '@/app/utils/user.utils';
import type { IUserResponse } from '@/widgets/ui/RegisterForm/model/types';
import type { ILoginErrors, ILoginUser } from '../types';
import { useNavigate } from 'react-router-dom';

const loginFetch = async (
  body: ILoginUser
): Promise<IResponse<IUserResponse>> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error: IError<ILoginErrors> = await response.json();
    throw error;
  }

  return response.json();
};

export const useLoginUser = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginFetch,
    onSuccess: data => {
      if (data?.data) {
        setUser(data.data.user);
        useSetLocalUser(data.data.user);
        useSetLocalToken(data.data.token);
        navigate('/tests');
      }
    },
    onError: (error: IError<ILoginErrors>) => {
      return error;
    },
  });
};
