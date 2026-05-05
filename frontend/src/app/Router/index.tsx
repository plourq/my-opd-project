import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../Layout';
import {
  RegisterPage,
  LoginPage,
  ProfilePage,
  AdminCreateTestPage,
  TestsPage,
  OneTestPage,
  AdminViewTestsPage,
  AdminViewGroupTestsPage,
} from '@/pages';
import { PrivateRoute } from '@/shared';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/signup',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/admin/tests/create',
        element: (
          <PrivateRoute>
            <AdminCreateTestPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/tests',
        element: <TestsPage />,
      },
      {
        path: '/tests/:id',
        element: <OneTestPage />,
      },
      {
        path: 'admin/tests/view',
        element: (
          <PrivateRoute>
            <AdminViewTestsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/tests/view/group/:groupId',
        element: (
          <PrivateRoute>
            <AdminViewGroupTestsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
