import type { IOptionProps } from '@/shared/ui/option/model/types';

export interface ISelectProps extends React.InputHTMLAttributes<
  HTMLSelectElement | HTMLInputElement
> {
  label?: string;
  className?: string;
  options?: IOptionProps[];
  error?: string | string[];
}
