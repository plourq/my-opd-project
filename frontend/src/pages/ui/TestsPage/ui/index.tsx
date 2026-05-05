import { TestCard } from '@/entities';
import { useGetTests } from '../model/api/GetTestsApi';
import styles from './TestPage.module.scss';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/app/Context/UserContext';
import { TestsContext } from '@/app/Context/TestsContext';
import { Loader } from '@/app/Loader/ui';

export const TestsPage = () => {
  const { data, refetch, isLoading } = useGetTests();
  const { user } = useContext(UserContext);
  const { setTests } = useContext(TestsContext);
  useEffect(() => {
    refetch();
  }, [user]);

  useEffect(() => {
    data?.data && setTests(data?.data);
  }, [data?.data]);

  return (
    <div className={styles.test_cards}>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data?.map(el => <TestCard id={el.id} title={el.title} />)
      )}
    </div>
  );
};
