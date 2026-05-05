export interface IResult {
  answer_count: number;
  first_name: string;
  last_name: string;
  score_percentage: number;
  user_id: number;
}

export interface IProps {
  groupTitle?: string;
  testTitle?: string;
  groupPercentage?: number;
  results?: IResult[];
}
