import { Save, Trash2, Search, Printer, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface FormHeaderProps {
  title: string;
  onSave?: () => void;
  onDelete?: () => void;
  onSearch?: () => void;
  onPrint?: () => void;
  onRefresh?: () => void;
  onClose?: () => void;
}

export function FormHeader({
  title,
  onSave,
  onDelete,
  onSearch,
  onPrint,
  onClose,
}: FormHeaderProps) {
  return (
    <div className="bg-card border-border flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onSave} className="gap-2">
          <Save className="h-4 w-4" />
          Gravar
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSearch}
          className="gap-2"
        >
          <Search className="h-4 w-4" />
          Localiza
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-destructive dark:text-foreground hover:bg-destructive dark:hover:text-destructive gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrint}
          className="gap-2"
        >
          <Printer className="h-4 w-4" />
          Imprimir
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-foreground text-xl font-semibold">{title}</h1>
        <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label="Fechar formulario">
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </Button>
      </div>
    </div>
  );
}
