import {
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  FileText,
  Lock,
  Pause,
  Tag,
  XCircle,
} from 'lucide-react';
import type { ComponentType } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import type { FooterAction } from './types';

// ── Icon Map ─────────────────────────────────────────────────────────

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  'file-text': FileText,
  lock: Lock,
  pause: Pause,
  'x-circle': XCircle,
  'check-circle': CheckCircle,
  ban: Ban,
  tag: Tag,
  eye: Eye,
};

// ── Footer Component ─────────────────────────────────────────────────

interface AnalysisFooterProps {
  actions: FooterAction[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  selectedCount: number;
  pageSizeOptions?: number[];
  onAction: (actionKey: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function AnalysisFooter({
  actions,
  totalCount,
  pageIndex,
  pageSize,
  totalPages,
  selectedCount,
  pageSizeOptions = [25, 50, 100, 200],
  onAction,
  onPageChange,
  onPageSizeChange,
}: AnalysisFooterProps) {
  return (
    <footer
      className="border-border bg-card flex items-center justify-between border-t px-3 py-1.5"
      aria-label="Rodape da analise"
    >
      {/* Left: Actions */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {actions.map((action) => {
          const Icon = action.icon ? ICON_MAP[action.icon] : null;
          return (
            <Button
              key={action.key}
              type="button"
              variant={action.variant ?? 'ghost'}
              size="sm"
              onClick={() => onAction(action.key)}
              className="h-7 gap-1.5 px-2 text-xs"
              aria-label={action.label}
            >
              {Icon && <Icon className="size-3.5" />}
              {action.label}
            </Button>
          );
        })}
      </div>

      {/* Right: Pagination + Count */}
      <div className="flex items-center gap-3">
        {/* Selected count */}
        {selectedCount > 0 && (
          <span className="text-muted-foreground text-xs">
            {selectedCount} selecionado{selectedCount !== 1 ? 's' : ''}
          </span>
        )}

        {/* Page size */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs">Linhas:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => onPageSizeChange(Number(v))}
          >
            <SelectTrigger size="sm" className="h-7 w-16 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            aria-label="Primeira pagina"
          >
            <ChevronsLeft className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            aria-label="Pagina anterior"
          >
            <ChevronLeft className="size-3.5" />
          </Button>

          <span className="text-foreground min-w-[80px] text-center text-xs tabular-nums">
            {totalPages > 0
              ? `${pageIndex + 1} de ${totalPages}`
              : '0 de 0'}
          </span>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= totalPages - 1}
            aria-label="Proxima pagina"
          >
            <ChevronRight className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={pageIndex >= totalPages - 1}
            aria-label="Ultima pagina"
          >
            <ChevronsRight className="size-3.5" />
          </Button>
        </div>

        {/* Total record count */}
        <span
          className={cn(
            'bg-muted text-foreground min-w-[60px] rounded px-2 py-0.5 text-right text-xs font-medium tabular-nums'
          )}
        >
          {totalCount.toLocaleString('pt-BR')}
        </span>
      </div>
    </footer>
  );
}
