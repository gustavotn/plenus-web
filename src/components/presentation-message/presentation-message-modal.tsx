import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePresentationMessage } from '@/contexts/presentation-message-context';

export function PresentationMessageModal() {
  const { message, respondToMessage } = usePresentationMessage();

  function handleClose() {
    respondToMessage({
      conteudo: '0',
      correlationId: message?.correlationId,
    });
  }

  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{message?.title}</DialogTitle>
          <DialogDescription>{message?.text}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {message?.buttonOk && (
            <Button
              variant="outline"
              onClick={() =>
                respondToMessage({
                  conteudo: '2',
                  correlationId: message?.correlationId,
                })
              }
            >
              Ok
            </Button>
          )}

          {message?.buttonYes && (
            <Button
              variant="outline"
              onClick={() =>
                respondToMessage({
                  conteudo: '3',
                  correlationId: message?.correlationId,
                })
              }
            >
              Sim
            </Button>
          )}

          {message?.buttonNo && (
            <Button
              variant="outline"
              onClick={() =>
                respondToMessage({
                  conteudo: '4',
                  correlationId: message?.correlationId,
                })
              }
            >
              Não
            </Button>
          )}

          {/* {message?.buttonQuit && (
            <Button
              variant="outline"
              onClick={() => respondToMessage({ response: '3' })}
            >
              Cancel
            </Button>
          )} 
          {message?.buttonOk && (
            <Button
              variant="outline"
              onClick={() => respondToMessage({ response: '3' })}
            >
              Cancel
            </Button>
          )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
