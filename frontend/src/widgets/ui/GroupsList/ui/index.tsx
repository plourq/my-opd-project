import { GroupCard } from '@/entities';
import { useGetGroups } from '../../TestForm/model/api/getGroupsApi';
import styles from './GroupsList.module.scss';
import { Loader } from '@/app/Loader/ui';
import { useCreateGroup } from '../model/api/createGroupApi';
import { useEffect, useState, type FormEvent } from 'react';
import { Form } from '@/shared';
import type { IGroup } from '../../TestForm/model/types';

export const GroupsList = () => {
  const [groupTitle, setGroupTitle] = useState('');
  const { data: groupsData, isLoading } = useGetGroups();
  const [isCreate, setIsCreate] = useState(false);
  const { mutate, isPending } = useCreateGroup(setIsCreate);
  const [groups, setGroups] = useState<IGroup[]>([]);

  const input = {
    value: groupTitle,
    label: 'Название группы',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setGroupTitle(e.target.value),
    placeholder: 'Название группы',
    type: 'text',
    name: 'testTitle',
  };

  const button = {
    value: 'Отправить',
    disabled: isPending,
    type: 'submit',
    padding: '10px 15px',
    border: '3px solid gray',
    borderRadius: '10px',
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(groupTitle);
    setGroups(prev => [...prev, { id: prev.length + 1, title: groupTitle }]);
  };

  useEffect(() => {
    groupsData?.data && setGroups(groupsData?.data);
  }, [groupsData?.data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className={styles.groups_title}>Выберите группу</h1>
          <div className={styles.groups_list}>
            {groups &&
              groups.map(el => (
                <GroupCard groupTitle={el.title} groupId={el.id} />
              ))}
            {!isCreate ? (
              <div
                className={styles.group_card}
                onClick={() => setIsCreate(!isCreate)}
              >
                <span>Добавить группу</span>
              </div>
            ) : (
              <Form
                key="create-group-form"
                inputs={[input]}
                onSubmit={handleSubmit}
                buttons={button}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
