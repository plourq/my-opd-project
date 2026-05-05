import { BASE_URL } from '@/app/constants/constants';
import { useGetLocalToken } from '@/app/utils/user.utils';
import { useMutation } from '@tanstack/react-query';

const addAvailablegroupFetch = async (testId: number, groupId: number) => {
  const token = useGetLocalToken();
  const response = await fetch(`${BASE_URL}/tests/${testId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ group_id: groupId }),
  });

  if (!response.ok) {
    throw new Error('Error!');
  }

  return response.json();
};

export const useAddAvailableGroup = (testId: number, groupId: number) => {
  return useMutation({
    mutationFn: () => addAvailablegroupFetch(testId, groupId),
    mutationKey: ['add', testId, groupId],
  });
};
