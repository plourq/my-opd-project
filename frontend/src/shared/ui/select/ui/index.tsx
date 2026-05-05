// select/ui/select.tsx
import type { ISelectProps } from '../model/types';
import styles from './select.module.scss';
import { Option } from '@/shared/ui/option/ui';

export const Select = ({
  label,
  error,
  className,
  options,
  value,
  onChange,
  multiple = false,
  ...props
}: ISelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedValues = Array.from(e.target.selectedOptions).map(
        option => option.value
      );
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name: props.name || '',
          value: selectedValues,
        },
      };
      onChange?.(syntheticEvent as any);
    } else {
      onChange?.(e);
    }
  };

  return (
    <label className={styles.label}>
      {label}
      <select
        className={styles.select}
        value={value}
        onChange={handleChange}
        multiple={multiple}
        size={multiple ? options?.length || 3 : undefined}
        {...props}
      >
        {options?.map(el => (
          <Option key={el.value} label={el.label} value={el.value} />
        ))}
      </select>
      {error && <p className={styles.error_text}>{error[0]}</p>}
    </label>
  );
};
