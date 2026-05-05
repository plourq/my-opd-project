import type { IInputProps } from '../model/types';
import styles from './input.module.scss';
import cn from 'classnames';

export const Input = ({ label, error, className, ...props }: IInputProps) => {
  return (
    <>
      <label className={styles.label}>
        {label}
        <input
          {...props}
          className={cn(styles.input, {
            [styles.error_input]: error,
          })}
        />
      </label>
      {error && <p className={styles.error_text}>{error}</p>}
    </>
  );
};
