import { useNavigate } from 'react-router-dom';
import styles from './SelectTestResultCard.module.scss';
import type { IProps } from '../model/types';

export const SelectTestResultCard = ({ testTitle, testId }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.test} onClick={() => navigate(`?test=${testId}`)}>
      <span>{testTitle}</span>
    </div>
  );
};
