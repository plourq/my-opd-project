import styles from './ProfileAvatar.module.scss';
import type { IProfileAvatarProps } from '../model/types';
import { IMG_BASE_URL } from '@/app/constants/constants';

export const ProfileAvatar = ({ avatar }: IProfileAvatarProps) => {
  return (
    <>
      {avatar && (
        <div className={styles.avatar}>
          <img src={`${IMG_BASE_URL}${avatar}`} />
        </div>
      )}
    </>
  );
};
