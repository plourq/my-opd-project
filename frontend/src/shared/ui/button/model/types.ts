export interface IButton {
  value?: string;
  disabled?: boolean;
  padding?: string;
  bgc?: string;
  border?: string;
  borderRadius?: string;
  onClick?: () => void;
  className?: string;
}

export interface IButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  button: IButton;
}
