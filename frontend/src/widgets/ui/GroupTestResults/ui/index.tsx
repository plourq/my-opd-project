import { UserResultTestCard } from '@/entities';
import type { IProps } from '../model/types';
import styles from './GroupTestResults.module.scss';

export const GroupTestResults = ({
  groupTitle,
  testTitle,
  groupPercentage,
  results,
}: IProps) => {
  return (
    <div>
      <h1 className={styles.results_title}>Тест: {testTitle}</h1>
      <h2 className={styles.results_title}>Группа: {groupTitle}</h2>
      <h2 className={styles.results_title}>
        Средний процент правильных ответов группы: {groupPercentage}%
      </h2>
      <div className={styles.results_list}>
        {results &&
          results.map(el => (
            <UserResultTestCard
              first_name={el.first_name}
              last_name={el.first_name}
              answer_count={el.answer_count}
              score_percentage={el.score_percentage}
            />
          ))}
      </div>
    </div>
  );
};
