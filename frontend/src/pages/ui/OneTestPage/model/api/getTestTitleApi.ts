import { BASE_URL } from '@/app/constants/constants';
import type { IResponse } from '@/app/constants/types';
import { useGetLocalToken } from '@/app/utils/user.utils';
import { useQuery } from '@tanstack/react-query';
import type { ITestRead } from '../types';

const getTestTitleFetch = async (id: string): Promise<IResponse<ITestRead>> => {
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/tests/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed fetch.');
  }

  return response.json();
};

export const useGetTestTitleApi = (testId: string) =>
  useQuery<IResponse<ITestRead>, Error>({
    queryKey: ['test'],
    queryFn: () => getTestTitleFetch(testId),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
