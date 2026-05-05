import { BASE_URL } from '@/app/constants/constants';
import type { IResponse } from '@/app/constants/types';
import { useGetLocalToken } from '@/app/utils/user.utils';
import { useQuery } from '@tanstack/react-query';

const fetchAnswer = async (
  testId: string,
  questionId: string
): Promise<IResponse<{ is_complete: boolean }>> => {
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/answers/${testId}/${questionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch!');
  }

  return response.json();
};

export const useGetAnswerApi = (testId: string, questionId: string) => {
  return useQuery({
    queryKey: ['answer', testId, questionId],
    queryFn: () => fetchAnswer(testId, questionId),
    staleTime: 5 * 60 * 1000,
  });
};
