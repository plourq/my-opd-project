import { Button } from '@/shared';
import type { IAddQuestionButtonProps } from '../model/types';

export const AddQuestionButton = ({ openModal }: IAddQuestionButtonProps) => {
  const buttonProps = {
    value: '+',
    disabled: false,
    type: 'button',
    padding: '15px',
    border: '3px solid gray',
    borderRadius: '10px',
    onClick: () => openModal(),
  };

  return (
    <div>
      <Button button={buttonProps} />
    </div>
  );
};
