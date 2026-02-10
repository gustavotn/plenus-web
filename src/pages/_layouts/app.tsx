import { useHead } from '@unhead/react';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Header } from '@/components/header/header';
import { PresentationMessageModal } from '@/components/presentation-message/presentation-message-modal';
import { PresentationMessageProvider } from '@/contexts/presentation-message-context';
import { api } from '@/lib/axios';

export function AppLayout() {
  useHead({
    titleTemplate: '%s | Plenus Cloud',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401 || status === 403) {
            navigate('/entrar', { replace: true });
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <PresentationMessageProvider>
      <div className="flex h-screen flex-col">
        <Header />

        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
      <PresentationMessageModal />
    </PresentationMessageProvider>
  );
}
