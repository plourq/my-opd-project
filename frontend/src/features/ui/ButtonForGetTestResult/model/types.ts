import type { SetStateAction } from 'react';

export interface IGetTestResult {
  test_id: number;
  score_percentage: number;
  answer_count: number;
}

export interface IProps {
  setTestResultData: React.Dispatch<SetStateAction<IGetTestResult | undefined>>;
}
