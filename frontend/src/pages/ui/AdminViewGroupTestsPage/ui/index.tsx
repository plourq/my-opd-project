import { TestsContext } from '@/app/Context/TestsContext';
import { useContext, useEffect, useState } from 'react';
import styles from './AdminViewGroupTestsPage.module.scss';
import { useGetTests } from '../../TestsPage/model/api/GetTestsApi';
import { useGetGroupResultTest } from '../model/api/getGroupTestResultApi';
import { useParams, useSearchParams } from 'react-router-dom';
import { GroupTestResults } from '@/widgets';
import type { ITest } from '@/app/constants/types';
import { SelectTestResultCard } from '@/entities/ui/SelectTestResultCard';

export const AdminViewGroupTestsPage = () => {
  const { data: testsData } = useGetTests();
  const { tests, setTests } = useContext(TestsContext);
  const [selectTestId, setSelectTestId] = useState(0);
  const { groupId } = useParams();
  const [searchParams] = useSearchParams();
  const [test, setTest] = useState<ITest>();
  useEffect(() => {
    const test = searchParams.get('test');
    setSelectTestId(test ? Number(test) : 0);
  }, [searchParams]);

  const { data: groupResult } = useGetGroupResultTest(
    selectTestId,
    groupId ? Number(groupId) : 0
  );

  useEffect(() => {
    setTest(tests.find(el => el.id == selectTestId));
  }, [selectTestId]);

  useEffect(() => {
    testsData?.data && setTests(testsData?.data);
  }, [testsData?.data]);

  return (
    <>
      {selectTestId == 0 ? (
        <>
          <h1 className={styles.tests_title}>Выберите тест</h1>
          <div className={styles.tests_list}>
            {tests?.map(el => (
              <SelectTestResultCard testTitle={el.title} testId={el.id} />
            ))}
          </div>
        </>
      ) : (
        <GroupTestResults
          groupTitle={groupResult?.data.group_title}
          testTitle={test?.title}
          groupPercentage={groupResult?.data.group_percentage}
          results={groupResult?.data.results}
        />
      )}
    </>
  );
};
