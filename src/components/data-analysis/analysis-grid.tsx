import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useRef } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import type { ColumnConfig, SortState } from './types';

interface AnalysisGridProps {
  columns: ColumnConfig[];
  columnKeys: string[];
  rows: string[][];
  sort: SortState;
  selectedRows: Set<number>;
  isLoading: boolean;
  isFetching: boolean;
  onSort: (columnKey: string) => void;
  onRowSelect: (rowIndex: number) => void;
  onSelectAll: () => void;
  onRowDoubleClick?: (row: string[], rowIndex: number) => void;
}

export function AnalysisGrid({
  columns,
  columnKeys,
  rows,
  sort,
  selectedRows,
  isLoading,
  isFetching,
  onSort,
  onRowSelect,
  onSelectAll,
  onRowDoubleClick,
}: AnalysisGridProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  // Build a map from column key -> config for fast lookup
  const columnMap = new Map(columns.map((col) => [col.key, col]));

  // Determine effective columns: use columnKeys from data response,
  // falling back to config if data hasn't loaded yet
  const effectiveColumns =
    columnKeys.length > 0
      ? columnKeys.map((key) => columnMap.get(key) ?? { key, label: key, sortable: true })
      : columns.filter((c) => c.visible !== false);

  const allSelected = rows.length > 0 && selectedRows.size === rows.length;
  const someSelected = selectedRows.size > 0 && !allSelected;

  if (isLoading) {
    return <GridSkeleton columnCount={Math.min(effectiveColumns.length || 6, 10)} />;
  }

  return (
    <div
      ref={tableRef}
      className={cn(
        'relative flex-1 overflow-auto',
        isFetching && 'opacity-60 transition-opacity'
      )}
    >
      <Table>
        <TableHeader className="bg-muted/50 sticky top-0 z-10">
          <TableRow className="hover:bg-muted/50">
            {/* Selection column */}
            <TableHead className="w-10">
              <Checkbox
                checked={allSelected}
                {...(someSelected ? { 'data-state': 'indeterminate' } : {})}
                onCheckedChange={onSelectAll}
                aria-label="Selecionar todos os registros"
              />
            </TableHead>

            {/* Row indicator */}
            <TableHead className="w-8" />

            {/* Data columns */}
            {effectiveColumns.map((col) => (
              <SortableHeader
                key={col.key}
                column={col}
                sort={sort}
                onSort={onSort}
              />
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={effectiveColumns.length + 2}
                className="text-muted-foreground h-32 text-center"
              >
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => {
              const isSelected = selectedRows.has(rowIndex);
              return (
                <TableRow
                  key={rowIndex}
                  data-state={isSelected ? 'selected' : undefined}
                  className={cn(
                    'cursor-pointer transition-colors',
                    isSelected && 'bg-primary/5'
                  )}
                  onClick={() => onRowSelect(rowIndex)}
                  onDoubleClick={() => onRowDoubleClick?.(row, rowIndex)}
                >
                  {/* Selection checkbox */}
                  <TableCell className="w-10" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onRowSelect(rowIndex)}
                      aria-label={`Selecionar registro ${rowIndex + 1}`}
                    />
                  </TableCell>

                  {/* Row indicator */}
                  <TableCell className="w-8 px-1">
                    {isSelected && (
                      <span className="text-primary text-xs" aria-hidden="true">
                        {'▶'}
                      </span>
                    )}
                  </TableCell>

                  {/* Data cells */}
                  {row.map((cell, cellIndex) => {
                    const colConfig = effectiveColumns[cellIndex];
                    return (
                      <TableCell
                        key={cellIndex}
                        className={cn(
                          'max-w-[250px] truncate text-xs',
                          colConfig?.align === 'right' && 'text-right',
                          colConfig?.align === 'center' && 'text-center'
                        )}
                        style={{
                          minWidth: colConfig?.minWidth
                            ? `${colConfig.minWidth}px`
                            : undefined,
                        }}
                        title={cell}
                      >
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Sortable Header ──────────────────────────────────────────────────

interface SortableHeaderProps {
  column: ColumnConfig;
  sort: SortState;
  onSort: (key: string) => void;
}

function SortableHeader({ column, sort, onSort }: SortableHeaderProps) {
  const isSorted = sort.column === column.key;
  const canSort = column.sortable !== false;

  return (
    <TableHead
      className={cn(
        'text-xs select-none',
        canSort && 'cursor-pointer hover:bg-muted/80 transition-colors',
        column.align === 'right' && 'text-right',
        column.align === 'center' && 'text-center'
      )}
      style={{ minWidth: column.minWidth ? `${column.minWidth}px` : undefined }}
      onClick={() => canSort && onSort(column.key)}
      aria-sort={
        isSorted
          ? sort.direction === 'asc'
            ? 'ascending'
            : 'descending'
          : undefined
      }
    >
      <div className={cn('flex items-center gap-1', column.align === 'right' && 'justify-end')}>
        <span>{column.label}</span>
        {canSort && (
          <span className="text-muted-foreground/60 inline-flex shrink-0">
            {isSorted && sort.direction === 'asc' && <ArrowUp className="size-3" />}
            {isSorted && sort.direction === 'desc' && <ArrowDown className="size-3" />}
            {!isSorted && <ArrowUpDown className="size-3" />}
          </span>
        )}
      </div>
    </TableHead>
  );
}

// ── Loading Skeleton ─────────────────────────────────────────────────

function GridSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <div className="flex-1 space-y-1 p-3">
      {/* Header skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: columnCount }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1" />
        ))}
      </div>
      {/* Row skeletons */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex gap-2">
          {Array.from({ length: columnCount }).map((_, j) => (
            <Skeleton key={j} className="h-7 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
