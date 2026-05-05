import { Header } from '@/widgets/';
import { Footer } from '@/widgets/';
import styles from './layout.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/app/Context/UserContext';

export const Layout: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    localUser ? setUser(JSON.parse(localUser)) : navigate('/login');
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
