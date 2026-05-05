import type { IGroup } from '@/widgets/ui/TestForm/model/types';
import type { SetStateAction } from 'react';

export interface IProps {
  groupTitle: string;
  groupId: number;
  testId: number;
  setGroups: React.Dispatch<SetStateAction<IGroup[]>>;
}
