import styles from './header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/app/Context/UserContext';
import { IMG_BASE_URL } from '@/app/constants/constants';
import { BackButton } from '@/features';
import def_avatar from '@/assets/def_avatar.png';

export const Header = () => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <BackButton />
      {user?.email ? (
        <>
          <Link
            className={pathname == '/tests' ? styles.active_page : ''}
            to={'/tests'}
          >
            Тесты
          </Link>
          {user?.is_teacher ||
            (user?.is_staff && (
              <>
                <Link
                  className={
                    pathname == '/admin/tests/create' ? styles.active_page : ''
                  }
                  to={'/admin/tests/create'}
                >
                  Создание теста
                </Link>
                <Link
                  className={
                    pathname == '/admin/tests/view' ? styles.active_page : ''
                  }
                  to={'/admin/tests/view'}
                >
                  Просмотр результатов
                </Link>
              </>
            ))}
        </>
      ) : (
        <>
          <Link
            className={pathname == '/signup' ? styles.active_page : ''}
            to={'/signup'}
          >
            Зарегестрироваться
          </Link>
          <Link
            className={pathname == '/login' ? styles.active_page : ''}
            to={'/login'}
          >
            Войти
          </Link>
        </>
      )}
      {user?.email && (
        <Link to={'/profile'}>
          <img
            className={styles.avatar}
            src={user.avatar ? `${IMG_BASE_URL}${user?.avatar}` : def_avatar}
          />
        </Link>
      )}
    </header>
  );
};
