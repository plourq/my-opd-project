import { Link } from 'react-router-dom';
import type { ITestCard } from '../model/types';
import styles from './TestCard.module.scss';

export const TestCard = ({ title, id }: ITestCard) => {
  return (
    <Link to={`/tests/${id}?q=1`}>
      <div className={styles.test_card}>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};
