import { BASE_URL } from '@/app/constants/constants';
import type { IResponse } from '@/app/constants/types';
import { useGetLocalToken } from '@/app/utils/user.utils';
import { useQuery } from '@tanstack/react-query';
import type { IGetTestResult } from '../types';

const getTestResultFetch = async (
  testId: number,
  token: string | null
): Promise<IResponse<IGetTestResult>> => {
  const response = await fetch(`${BASE_URL}/tests/${testId}/result`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch!');
  }

  return response.json();
};

export const useGetTestResult = (id: number, enabled: boolean) => {
  const token = useGetLocalToken();

  return useQuery({
    queryKey: ['testResult', id],
    queryFn: () => getTestResultFetch(id, token),
    enabled: enabled,
    retry: false,
  });
};
