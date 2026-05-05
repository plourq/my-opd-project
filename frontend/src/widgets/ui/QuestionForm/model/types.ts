import type { SetStateAction } from 'react';

export interface IQuestionFormData {
  text?: string;
  question_type?: string;
  choices?: string;
  matching_pairs?: string;
  correct_answer?: string;
  image?: File;
}

export interface IGetQuestions {
  id: number;
  text: string;
  question_type: string;
  choices?: string;
  matching_pairs?: string;
  correct_answer?: string;
  image?: File;
}

export interface IQuestionFormDataErrors {
  text?: string;
  question_type?: string;
  choices?: string;
  matching_pairs?: string;
  correct_answer?: string;
  image?: File;
}

export interface IFormField extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  error?: string;
}

export interface IQuestionFormProps {
  questions: IGetQuestions[];
  setQuestions: React.Dispatch<SetStateAction<IGetQuestions[]>>;
}
