import { Button } from '@/components/ui/button';
import { usePresentationMessage } from '@/contexts/presentation-message-context';

interface ActionSchema {
  type: 'customized' | 'personalized';
  method: string;
  text: string;
  description: string;
  isSubmiting?: boolean;
  onSubmiting: () => void;
}

interface FormFooterProps {
  recordInfo?: string;
  user?: string;
  actions: ActionSchema[];
}

export function FormFooter({
  recordInfo = 'Registro novo',
  user = 'ADMINISTRADOR',
  actions,
}: FormFooterProps) {
  const { status, socketId } = usePresentationMessage();

  return (
    <div className="border-border flex items-center justify-between border-t px-6 py-3">
      <div className="flex items-center gap-2">
        {actions.map(({ onSubmiting, isSubmiting }, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={onSubmiting}
            disabled={isSubmiting}
            className="gap-2"
          ></Button>
        ))}
      </div>

      <div className="text-muted-foreground space-x-4 opacity-30">
        <span>status: {status}</span>
        <span>id: {socketId}</span>
      </div>

      <div className="text-muted-foreground flex items-center gap-6 text-sm">
        <span>{recordInfo}</span>
        <span>
          Usuário: <span className="text-foreground font-medium">{user}</span>
        </span>
      </div>
    </div>
  );
}
