import { AlertTriangle } from 'lucide-react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

import { Button } from '@/components/ui/button';

export function Error() {
  const error = useRouteError();

  let title = 'Algo deu errado';
  let description = 'Ocorreu um erro inesperado. Por favor, tente novamente.';

  if (isRouteErrorResponse(error)) {
    title = `Erro ${error.status}`;
    description = error.statusText || description;
  } else if (error instanceof globalThis.Error) {
    description = error.message;
  }

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-destructive/10 rounded-full p-4">
          <AlertTriangle className="text-destructive h-10 w-10" />
        </div>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-md text-sm">{description}</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
        <Button asChild>
          <Link to="/">Voltar ao inicio</Link>
        </Button>
      </div>
    </div>
  );
}
