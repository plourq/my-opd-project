import type { IRadioProps } from '../model/types';
import styles from './radio.module.scss';

export const Radio = ({
  value,
  label,
  name,
  className,
  ...props
}: IRadioProps) => {
  return (
    <div className={styles.radio}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.radio_input}
        type="radio"
        value={value}
        name={name}
        {...props}
      />
    </div>
  );
};
