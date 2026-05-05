import { UserContext } from '@/app/Context/UserContext';
import { ProfileAvatar } from '@/features';
import { ProfileForm } from '@/widgets';
import { useContext } from 'react';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.profile}>
      <ProfileAvatar avatar={user?.avatar} />
      <ProfileForm />
    </div>
  );
};
