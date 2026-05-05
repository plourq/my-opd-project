import { BASE_URL } from '@/app/constants/constants';
import { useMutation } from '@tanstack/react-query';
import type { IError, IResponse, ITest } from '@/app/constants/types';
import type { ITestCreate, ITestErrors } from '../types';
import type { IGetQuestions } from '@/widgets/ui/QuestionForm/model/types';
import { useGetLocalToken } from '@/app/utils/user.utils';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TestsContext } from '@/app/Context/TestsContext';

const createTestFetch = async (
  body: ITestCreate
): Promise<IResponse<ITest>> => {
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/tests`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error: IError<ITestErrors> = await response.json();
    throw error;
  }

  return response.json();
};

export const useCreateTest = (
  setQuestions?: React.Dispatch<React.SetStateAction<IGetQuestions[]>>
) => {
  const navigate = useNavigate();
  const { tests, setTests } = useContext(TestsContext);
  return useMutation({
    mutationFn: createTestFetch,
    onSuccess: data => {
      if (setQuestions) {
        setQuestions([]);
        navigate('/tests');
        setTests([...tests, data.data]);
      }
    },
  });
};
