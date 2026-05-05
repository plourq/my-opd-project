import type { IProps } from '../model/types';
import styles from './TestResultPage.module.scss';

export const TestResultPage = ({ scorePercentage, testTitle }: IProps) => {
  return (
    <div className={styles.test_result}>
      <h1>Тест: {testTitle}</h1>
      <h2>Результат: {scorePercentage}%</h2>
    </div>
  );
};
