import type { IQuestionFormData } from '@/widgets/ui/QuestionForm/model/types';

export interface IPostAnswer {
  user_answer: string;
}

export interface IQuestionProps extends IQuestionFormData {
  testId?: string;
  questionId?: string;
}
