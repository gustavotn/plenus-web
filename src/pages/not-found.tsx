import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-muted rounded-full p-4">
          <FileQuestion className="text-muted-foreground h-10 w-10" />
        </div>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Pagina nao encontrada
        </h1>
        <p className="text-muted-foreground max-w-md text-sm">
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Voltar ao inicio</Link>
      </Button>
    </div>
  );
}
