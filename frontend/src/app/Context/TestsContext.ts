import { createContext } from 'react';
import type { ITest } from '../constants/types';

type TestsContextType = {
  tests: ITest[];
  setTests: (test: ITest[]) => void;
};

export const TestsContext = createContext<TestsContextType>({
  tests: [],
  setTests: () => {},
});
