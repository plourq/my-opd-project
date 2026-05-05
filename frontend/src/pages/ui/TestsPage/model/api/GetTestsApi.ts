import { BASE_URL } from '@/app/constants/constants';
import type { IError, IResponse } from '@/app/constants/types';
import { useQuery } from '@tanstack/react-query';
import type { ITest } from '../types';
import { useGetLocalToken } from '@/app/utils/user.utils';

const getTestsFetch = async (): Promise<IResponse<ITest[]>> => {
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/tests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error: IError<{}> = await response.json();
    throw error;
  }
  return response.json();
};

export const useGetTests = () => {
  return useQuery<IResponse<ITest[]>, Error>({
    queryKey: ['tests'],
    queryFn: getTestsFetch,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
