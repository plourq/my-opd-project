import { BASE_URL } from '@/app/constants/constants';
import type { IResponse } from '@/app/constants/types';
import { useQuery } from '@tanstack/react-query';
import type { IGroup } from '../types';

const getGroupsFetch = async (): Promise<IResponse<IGroup[]>> => {
  const response = await fetch(`${BASE_URL}/groups`);

  if (!response.ok) {
    throw new Error('Failed to fetch groups');
  }

  return response.json();
};

export const useGetGroups = () =>
  useQuery<IResponse<IGroup[]>, Error>({
    queryKey: ['groups'],
    queryFn: getGroupsFetch,
  });
