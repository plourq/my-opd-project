import { Link, useLocation, useSearchParams } from 'react-router-dom';
import type { ISwipeQuestionButton } from '../model/types';
import styles from './SwipeQuestionButton.module.scss';

export const SwipeQuestionButton = ({ prev }: ISwipeQuestionButton) => {
  const [searchParams] = useSearchParams();
  const question = searchParams.get('q');
  const { pathname } = useLocation();

  return (
    <Link
      to={`${pathname}?q=${prev ? Number(question) - 1 : Number(question) + 1}`}
    >
      <div className={styles.arrow}>
        <h2>{prev ? '←' : '→'}</h2>
      </div>
    </Link>
  );
};
