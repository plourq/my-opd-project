import { QueryClientProvider } from '@tanstack/react-query';
import './App.scss';
import { client } from './client';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { UserContext } from './Context/UserContext';
import { useState } from 'react';
import type { ITest, IUser } from './constants/types';
import { TestsContext } from './Context/TestsContext';
export const App = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [tests, setTests] = useState<ITest[]>([]);

  return (
    <QueryClientProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        <TestsContext.Provider value={{ tests, setTests }}>
          <RouterProvider router={router} />
        </TestsContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
