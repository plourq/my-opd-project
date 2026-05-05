export interface IInputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement
> {
  label?: string;
  className?: string;
  error?: string | string[];
}
