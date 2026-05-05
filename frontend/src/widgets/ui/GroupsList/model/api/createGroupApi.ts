import { BASE_URL } from '@/app/constants/constants';
import type { IResponse } from '@/app/constants/types';
import { useGetLocalToken } from '@/app/utils/user.utils';
import type { IGroup } from '@/widgets/ui/TestForm/model/types';
import { useMutation } from '@tanstack/react-query';
import type { SetStateAction } from 'react';

const createGroupFetch = async (
  groupTitle: string
): Promise<IResponse<IGroup>> => {
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title: groupTitle }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch groups');
  }

  return response.json();
};

export const useCreateGroup = (
  setIsCreate: React.Dispatch<SetStateAction<boolean>>
) =>
  useMutation<IResponse<IGroup>, Error, string>({
    mutationKey: ['group'],
    mutationFn: createGroupFetch,
    onSuccess: () => {
      setIsCreate(false);
    },
  });
