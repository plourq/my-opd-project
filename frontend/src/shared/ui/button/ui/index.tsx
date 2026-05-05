import type { IButtonProps } from '../model/types';
import styles from './button.module.scss';

export const Button = ({ button }: IButtonProps) => {
  const { className, ...restButton } = button;
  return (
    <button
      className={`${styles.button} ${button.className}`}
      onClick={button?.onClick}
      disabled={button?.disabled}
      style={{
        padding: button?.padding,
        backgroundColor: button?.bgc,
        border: button?.border,
        borderRadius: button?.borderRadius,
      }}
      {...restButton}
    >
      {button?.value}
    </button>
  );
};
