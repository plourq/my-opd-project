import type { IProps } from '../model/types';
import styles from './UserResultTestCard.module.scss';

export const UserResultTestCard = ({
  answer_count,
  first_name,
  last_name,
  score_percentage,
}: IProps) => {
  return (
    <div className={styles.card}>
      <span>{`${last_name} ${first_name}`}</span>
      <p>{`Количество ответов: ${answer_count}`}</p>
      <p>{`Процент правильных ответов: ${score_percentage}%`}</p>
    </div>
  );
};
