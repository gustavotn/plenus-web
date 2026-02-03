import { createBrowserRouter } from 'react-router';

import { AppLayout } from './pages/_layouts/App';
import { Entity } from './pages/app/Entity';
import { Menu } from './pages/app/Menu';
import { SignIn } from './pages/auth/SignIn';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/entidade',
        element: <Entity />,
      },
    ],
  },
  {
    path: '/',
    children: [
      {
        path: '/entrar',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
