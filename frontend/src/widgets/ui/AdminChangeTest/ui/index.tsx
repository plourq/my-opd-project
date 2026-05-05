import { TestsContext } from '@/app/Context/TestsContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGroups } from '../../TestForm/model/api/getGroupsApi';
import styles from './AdminChangeTest.module.scss';
import { AddGroupButton } from '@/features';
import type { IGroup } from '../../TestForm/model/types';
import { Loader } from '@/app/Loader/ui';
import { useGetTests } from '@/pages/ui/TestsPage/model/api/GetTestsApi';

export const AdminChangeTest = () => {
  const { id: testId } = useParams();
  const { data: testsData } = useGetTests();
  const { tests, setTests } = useContext(TestsContext);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const test = tests.find(el => el.id == Number(testId));
  const { data: groupsData } = useGetGroups();
  useEffect(() => {
    if (testsData?.data) {
      setTests(testsData.data);
    }
  }, [testsData, setTests]);

  useEffect(() => {
    if (!test || !groupsData?.data) return;

    const assignedGroups = groupsData.data.filter(el =>
      test.available_groups?.includes(el.id)
    );
    setGroups(assignedGroups);
  }, [groupsData, test]);

  const availableToAdd =
    groupsData?.data?.filter(el => !groups.some(group => group.id === el.id)) ||
    [];

  return (
    <>
      {!test ? (
        <Loader />
      ) : (
        <>
          <h1 className={styles.groups_title}>
            Тест доступен для следующих групп:
          </h1>
          <div className={styles.groups_list}>
            {groups.length > 0 ? (
              groups.map(el => (
                <h3 key={el.id} className={styles.group_card}>
                  {el.title}
                </h3>
              ))
            ) : (
              <p className={styles.empty}>Группы не добавлены</p>
            )}
          </div>

          <h2 className={styles.groups_title}>Добавить группу</h2>
          <div className={styles.groups_list}>
            <div className={styles.group}>
              {availableToAdd.map(el => (
                <AddGroupButton
                  key={el.id}
                  groupTitle={el.title}
                  groupId={el.id}
                  testId={Number(testId)}
                  setGroups={setGroups}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
