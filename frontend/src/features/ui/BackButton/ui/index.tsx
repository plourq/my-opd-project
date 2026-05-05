import { Button } from '@/shared';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const button = {
    value: '←',
    onClick: () => navigate(-1),
    border: 'none',
    className: styles.back_button,
  };

  return <Button button={button} />;
};
