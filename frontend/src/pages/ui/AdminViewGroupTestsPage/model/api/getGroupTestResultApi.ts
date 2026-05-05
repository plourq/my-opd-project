import { BASE_URL } from '@/app/constants/constants';
import type { IResponse } from '@/app/constants/types';
import type { IGetGroupTestResultResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useGetLocalToken } from '@/app/utils/user.utils';

const fetchGroupResultTest = async (
  testId: number,
  groupId: number
): Promise<IResponse<IGetGroupTestResultResponse>> => {
  const token = useGetLocalToken();
  const response = await fetch(
    `${BASE_URL}/tests/${testId}/${groupId}/result`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error');
  }

  return response.json();
};

export const useGetGroupResultTest = (testId: number, groupId: number) =>
  useQuery({
    queryKey: [`test_${testId}_${groupId}`, 'results'],
    queryFn: () => fetchGroupResultTest(testId, groupId),
    enabled: testId !== 0 && groupId !== 0,
  });
