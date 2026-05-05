import type { IQuestionCardProps } from '../model/types';
import styles from './QuestionCard.module.scss';

export const QuestionCard = ({ text, index }: IQuestionCardProps) => {
  return (
    <div className={styles.card}>
      <span className={styles.text}>{index + 1}.</span>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
