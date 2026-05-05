import { BASE_URL } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import type { IError, IResponse } from '@/app/constants/types';
import type {
  IGetQuestions,
  IQuestionFormData,
  IQuestionFormDataErrors,
} from '../types';
import { useGetLocalToken } from '@/app/utils/user.utils';

const createQuestionFetch = async (
  body: IQuestionFormData
): Promise<IResponse<IQuestionFormData>> => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error: IError<IQuestionFormDataErrors> = await response.json();
    throw error;
  }

  return response.json();
};

export const useCreateQuestion = (
  onSuccessCallback?: (data: IResponse<IGetQuestions>) => void
) => {
  return useMutation({
    mutationFn: createQuestionFetch,
    onSuccess: (newQuestion: any) => {
      onSuccessCallback?.(newQuestion);
    },
    onError: (error: IError<IQuestionFormData>) => {
      return error;
    },
  });
};
