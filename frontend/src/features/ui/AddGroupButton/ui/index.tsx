import { useState, type FormEvent } from 'react';
import type { IProps } from '../model/types';
import styles from './AddGroupButton.module.scss';
import { useAddAvailableGroup } from '@/widgets/ui/AdminChangeTest/model/api/addAvailableGroupsApi';

export const AddGroupButton = ({
  groupTitle,
  groupId,
  testId,
  setGroups,
}: IProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { mutate } = useAddAvailableGroup(testId || 0, groupId);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
    setGroups(prev => [...prev, { id: groupId, title: groupTitle }]);
  };

  return (
    <div
      className={styles.group_card}
      onClick={() => setIsEditable(!isEditable)}
    >
      <span>{groupTitle}</span>
      {isEditable ? (
        <span
          onClick={(e: FormEvent) => handleSubmit(e)}
          className={styles.group_plus}
        >
          +
        </span>
      ) : null}
    </div>
  );
};
