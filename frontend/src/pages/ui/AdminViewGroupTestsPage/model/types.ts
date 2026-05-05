interface IResult {
  user_id: number;
  first_name: string;
  last_name: string;
  score_percentage: number;
  answer_count: number;
}

export interface IGetGroupTestResultResponse {
  test_id: number;
  test_title: string;
  group_id: number;
  group_title: string;
  students_count: number;
  group_percentage: number;
  results: IResult[];
}
