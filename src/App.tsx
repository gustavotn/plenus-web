import { QueryClientProvider } from '@tanstack/react-query';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from './components/Theme/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import { queryClient } from './lib/ReactQuery';
import { router } from './Routes';

import './global.css';

export function App() {
  const head = createHead();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <UnheadProvider head={head}>
          <RouterProvider router={router} />
        </UnheadProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
