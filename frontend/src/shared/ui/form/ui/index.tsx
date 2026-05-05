import type { IFormProps } from '../model/types';
import { Input } from '@/shared/';
import styles from './form.module.scss';
import { Button } from '@/shared/';
import { Select } from '@/shared/';

export const Form = ({
  inputs,
  onSubmit,
  buttons,
  anotherForm,
  multipleSelect,
}: IFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {inputs.map((input, index) =>
        input.type == 'select' ? (
          <Select multiple={multipleSelect} key={index} {...input} />
        ) : (
          <Input key={index} {...input} />
        )
      )}
      {anotherForm}
      <div className={styles.buttons}>
        {Array.isArray(buttons) ? (
          buttons.map((item, index) => <Button key={index} button={item} />)
        ) : (
          <Button button={buttons} />
        )}
      </div>
    </form>
  );
};
