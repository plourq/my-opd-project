import type { IOptionProps } from '../model/types';

export const Option = ({ value, label }: IOptionProps) => {
  return <option value={value}>{label}</option>;
};
