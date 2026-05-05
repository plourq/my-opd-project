import { BASE_URL } from '@/app/constants/constants';
import type { IResponse } from '@/app/constants/types';
import { useGetLocalToken } from '@/app/utils/user.utils';
import { useQuery } from '@tanstack/react-query';
import type { IQuestionFormData } from '@/widgets/ui/QuestionForm/model/types';

const getQuestionFetch = async (
  testId: string,
  questionId: string
): Promise<IResponse<IQuestionFormData>> => {
  const token = useGetLocalToken();
  const response = await fetch(
    `${BASE_URL}/questions/${testId}?q=${questionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed fetch.');
  }

  return response.json();
};

export const useGetQuestionApi = (
  testId: string,
  questionId: string,
  questionsQuantity: number
) =>
  useQuery<IResponse<IQuestionFormData>, Error>({
    queryKey: ['test', testId, 'question', questionId],
    queryFn: () => getQuestionFetch(testId, questionId),
    retry: 2,
    enabled: !!testId && !!questionId && questionsQuantity > 0,
    staleTime: 5 * 60 * 1000,
  });
