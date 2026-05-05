import { BASE_URL } from '@/app/constants/constants';
import { useGetLocalToken } from '@/app/utils/user.utils';
import { useMutation } from '@tanstack/react-query';
import type { IPostAnswer } from '../types';

const postAnswerFetch = async ({
  body,
  testId,
  questionId,
}: {
  body: IPostAnswer;
  testId: string;
  questionId: string;
}) => {
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/answers/${testId}/${questionId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch!');
  }
  return response.json();
};

export const usePostAnswerApi = () => {
  return useMutation({
    mutationFn: postAnswerFetch,
    mutationKey: ['newAnswer'],
  });
};
