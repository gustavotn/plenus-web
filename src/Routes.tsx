import { createBrowserRouter } from 'react-router';

import { AppLayout } from './pages/_layouts/app';
import { Entity } from './pages/app/entity';
import { Menu } from './pages/app/menu';
import { SignIn } from './pages/auth/sign-in';
import { Error } from './pages/error';
import { NotFound } from './pages/not-found';

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
