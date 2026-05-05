import type { IButton } from '@/shared/ui/button/model/types';
import type { IInputProps } from '@/shared/ui/input/model/types';
import type { ISelectProps } from '@/shared/ui/select/model/types';
import type React from 'react';

interface IFormInputs extends IInputProps, ISelectProps {}

export interface IFormProps {
  inputs: IFormInputs[];
  onSubmit: (e: React.FormEvent) => void;
  buttons: IButton[] | IButton;
  anotherForm?: React.ReactNode;
  multipleSelect?: boolean;
}
