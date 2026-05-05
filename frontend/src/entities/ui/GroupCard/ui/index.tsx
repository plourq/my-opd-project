import { useNavigate } from 'react-router-dom';
import type { IGroupCardProps } from '../model/types';
import styles from './GroupCard.module.scss';

export const GroupCard = ({ groupTitle, groupId }: IGroupCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.group_card}
      onClick={() => navigate(`group/${groupId}`)}
    >
      <span>{groupTitle}</span>
    </div>
  );
};
