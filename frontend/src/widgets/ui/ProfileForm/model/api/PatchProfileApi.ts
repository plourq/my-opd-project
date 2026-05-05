import { BASE_URL } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '@/app/Context/UserContext';
import type { IError, IResponse } from '@/app/constants/types';
import { useGetLocalToken, useSetLocalUser } from '@/app/utils/user.utils';
import type {
  IRegisterErrors,
  IUpdateUser,
  IUserResponse,
} from '@/widgets/ui/RegisterForm/model/types';

const PatchProfileFetch = async (
  body: IUpdateUser
): Promise<IResponse<IUserResponse>> => {
  const formData = new FormData();
  const token = useGetLocalToken();
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error: IError<IRegisterErrors> = await response.json();
    throw error;
  }

  return response.json();
};

export const usePatchProfile = (setIsEditable: (value: boolean) => void) => {
  const { setUser } = useContext(UserContext);
  return useMutation({
    mutationFn: PatchProfileFetch,
    onSuccess: data => {
      if (data?.data) {
        setUser(data.data.user);
        useSetLocalUser(data.data.user);
        setIsEditable(false);
      }
    },
    onError: (error: IError<IRegisterErrors>) => {
      return error;
    },
  });
};
