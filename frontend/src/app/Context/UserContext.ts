import { createContext } from 'react';
import type { IUser } from '../constants/types';

type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
