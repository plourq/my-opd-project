import { UserContext } from '@/app/Context/UserContext';
import { useContext } from 'react';
import type { IPrivateRouteProps } from '../model/types';

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user?.is_staff || user?.is_teacher ? (
        children
      ) : (
        <h1>К сожалению у Вас недостаточно прав для посещения этой страницы</h1>
      )}
    </div>
  );
};
