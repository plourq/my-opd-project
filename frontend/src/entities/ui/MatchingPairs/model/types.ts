import type { SetStateAction } from 'react';

export interface IProps {
  matching_pairs: string;
  setAnswer: React.Dispatch<SetStateAction<string>>;
}
