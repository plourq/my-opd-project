import type { ITest } from '@/app/constants/types';
import type { IQuestionFormData } from '@/widgets/ui/QuestionForm/model/types';

export type IOneTestProps = Omit<ITest, 'available_groups'>;

export interface ITestRead extends ITest {
  questions: IQuestionFormData[];
  questions_quantity: number;
}
