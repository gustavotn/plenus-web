import { ChevronDown, ChevronUp, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DebouncedInput } from '@/components/ui/debounced-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { FilterConfig } from './types';

interface AnalysisFiltersProps {
  filters: FilterConfig[];
  values: Record<string, unknown>;
  isOpen: boolean;
  searchTerm: string;
  onToggle: () => void;
  onFilterChange: (key: string, value: unknown) => void;
  onClearFilter: (key: string) => void;
  onClearAll: () => void;
  onSearchChange: (value: string) => void;
}

export function AnalysisFilters({
  filters,
  values,
  isOpen,
  searchTerm,
  onToggle,
  onFilterChange,
  onClearFilter,
  onClearAll,
  onSearchChange,
}: AnalysisFiltersProps) {
  if (filters.length === 0) return null;

  const hasActiveFilters = Object.keys(values).length > 0 || searchTerm.length > 0;

  return (
    <section className="border-border animate-fade-in border-b" aria-label="Filtros de analise">
      {/* Toggle button */}
      <button
        type="button"
        onClick={onToggle}
        className="text-primary hover:text-primary/80 flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors"
        aria-expanded={isOpen}
        aria-controls="analysis-filters-panel"
      >
        {isOpen ? (
          <>
            <ChevronUp className="size-3.5" />
            Filtros
          </>
        ) : (
          <>
            <ChevronDown className="size-3.5" />
            Filtros
          </>
        )}
        {hasActiveFilters && (
          <span className="bg-primary text-primary-foreground ml-1 inline-flex size-5 items-center justify-center rounded-full text-xs">
            {Object.keys(values).length}
          </span>
        )}
      </button>

      {/* Filter panel */}
      {isOpen && (
        <div
          id="analysis-filters-panel"
          className="animate-fade-in space-y-3 px-3 pb-3"
        >
          {/* Filter grid */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filters.map((filter) => (
              <FilterField
                key={filter.key}
                filter={filter}
                value={values[filter.key]}
                onChange={(value) => onFilterChange(filter.key, value)}
                onClear={() => onClearFilter(filter.key)}
                colSpan={filter.colSpan}
              />
            ))}
          </div>

          {/* Search row */}
          <div className="flex items-center gap-3">
            <Label
              htmlFor="analysis-search"
              className="text-muted-foreground min-w-fit text-sm font-medium"
            >
              Procurar Por:
            </Label>
            <DebouncedInput
              id="analysis-search"
              defaultValue={searchTerm}
              onDebouncedChange={onSearchChange}
              placeholder="Digite para pesquisar..."
              className="h-8 max-w-md text-sm"
            />
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-muted-foreground hover:text-destructive ml-auto text-xs"
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ── Individual Filter Field ──────────────────────────────────────────

interface FilterFieldProps {
  filter: FilterConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  onClear: () => void;
  colSpan?: number;
}

function FilterField({ filter, value, onChange, onClear, colSpan }: FilterFieldProps) {
  const spanClass = colSpan && colSpan > 1 ? `col-span-${colSpan}` : '';

  return (
    <div className={`flex items-center gap-2 ${spanClass}`}>
      <Label
        htmlFor={`filter-${filter.key}`}
        className="text-muted-foreground min-w-[120px] text-right text-xs font-medium"
      >
        {filter.label}:
      </Label>

      <div className="relative flex flex-1 items-center">
        {filter.type === 'text' && (
          <Input
            id={`filter-${filter.key}`}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={filter.placeholder ?? `Filtrar por ${filter.label.toLowerCase()}...`}
            className="h-8 text-xs"
          />
        )}

        {filter.type === 'select' && (
          <Select
            value={(value as string) ?? ''}
            onValueChange={(v) => onChange(v)}
          >
            <SelectTrigger
              id={`filter-${filter.key}`}
              size="sm"
              className="h-8 w-full text-xs"
            >
              <SelectValue placeholder={filter.placeholder ?? 'Selecione...'} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filter.type === 'date' && (
          <Input
            id={`filter-${filter.key}`}
            type="date"
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 text-xs"
          />
        )}

        {filter.type === 'checkbox' && (
          <div className="flex items-center gap-2">
            <Checkbox
              id={`filter-${filter.key}`}
              checked={!!value}
              onCheckedChange={(checked) => onChange(checked)}
            />
            <Label
              htmlFor={`filter-${filter.key}`}
              className="text-foreground text-xs font-normal"
            >
              {filter.placeholder}
            </Label>
          </div>
        )}

        {filter.type === 'search-select' && (
          <button
            type="button"
            id={`filter-${filter.key}`}
            onClick={() => {
              // In the future, this will open a search modal
              // For now, it acts as a placeholder trigger
            }}
            className="text-primary hover:text-primary/80 h-8 flex-1 truncate text-left text-xs underline transition-colors"
          >
            {value
              ? String(value)
              : filter.placeholder ?? 'Clique aqui para selecionar...'}
          </button>
        )}

        {/* Clear button for non-checkbox filters */}
        {filter.type !== 'checkbox' && value != null && value !== '' && (
          <button
            type="button"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive absolute right-1 p-0.5 transition-colors"
            aria-label={`Limpar filtro ${filter.label}`}
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
