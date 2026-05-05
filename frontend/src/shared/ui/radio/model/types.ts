export interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  className?: string;
  error?: string | string[];
}
