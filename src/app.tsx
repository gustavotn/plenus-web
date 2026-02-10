import { QueryClientProvider } from '@tanstack/react-query';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from './components/theme/theme-provider';
import { Toaster } from './components/ui/sonner';
import { queryClient } from './lib/react-query';
import { router } from './routes';

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
