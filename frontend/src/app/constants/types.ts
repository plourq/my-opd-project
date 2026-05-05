import type { IQuestionFormData } from '@/widgets/ui/QuestionForm/model/types';

export interface IError<T> {
  data: null;
  errors: T;
  message: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  patronymic?: string;
  email: string;
  is_staff: boolean;
  is_teacher: boolean;
  avatar?: File | null;
}

export interface IResponse<T> {
  data: T;
  message: string;
  errors: null;
}

export interface ITest {
  id: number;
  title: string;
  available_groups?: number[];
  questions: IQuestionFormData[] | [];
}
