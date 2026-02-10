import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { executeAnalysisAction } from '@/api/execute-analysis-action';
import { Skeleton } from '@/components/ui/skeleton';

import { AnalysisFilters } from './analysis-filters';
import { AnalysisFooter } from './analysis-footer';
import { AnalysisGrid } from './analysis-grid';
import type { AnalysisConfig } from './types';
import { useDataAnalysis } from './use-data-analysis';

interface DataAnalysisProps {
  /** The analysis type identifier passed to the API */
  tipo: string;
  /**
   * Optional static config to skip the config API call.
   * Useful for previews or when the config is known at build time.
   */
  staticConfig?: AnalysisConfig;
  /** Callback when a row is double-clicked */
  onRowDoubleClick?: (row: string[], rowIndex: number) => void;
  /** Callback when a footer action is triggered */
  onAction?: (actionKey: string, selectedRows: string[][]) => void;
}

export function DataAnalysis({
  tipo,
  staticConfig,
  onRowDoubleClick,
  onAction,
}: DataAnalysisProps) {
  const analysis = useDataAnalysis(tipo, { staticConfig });

  const config = analysis.config;

  const { mutate: executeAction } = useMutation({
    mutationFn: executeAnalysisAction,
    onSuccess: () => {
      analysis.refetch();
    },
  });

  const handleAction = useCallback(
    (actionKey: string) => {
      if (onAction) {
        onAction(actionKey, analysis.selectedRowsData);
        return;
      }

      executeAction({
        tipo,
        action: actionKey,
        selectedRows: analysis.selectedRowsData,
      });
    },
    [onAction, executeAction, tipo, analysis.selectedRowsData]
  );

  // Show skeleton while config is loading
  if (analysis.isConfigLoading) {
    return <DataAnalysisSkeleton />;
  }

  if (!config) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center">
        Nenhuma configuracao de analise encontrada.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Filters */}
      <AnalysisFilters
        filters={config.filters}
        values={analysis.filterValues}
        isOpen={analysis.filtersOpen}
        searchTerm={analysis.searchTerm}
        onToggle={() => analysis.setFiltersOpen((prev) => !prev)}
        onFilterChange={analysis.handleFilterChange}
        onClearFilter={analysis.handleClearFilter}
        onClearAll={analysis.handleClearAllFilters}
        onSearchChange={analysis.setSearchTerm}
      />

      {/* Data Grid */}
      <AnalysisGrid
        columns={config.columns}
        columnKeys={analysis.columns}
        rows={analysis.rows}
        sort={analysis.sort}
        selectedRows={analysis.selectedRows}
        isLoading={analysis.isDataLoading}
        isFetching={analysis.isDataFetching}
        onSort={analysis.handleSort}
        onRowSelect={analysis.handleRowSelect}
        onSelectAll={analysis.handleSelectAll}
        onRowDoubleClick={onRowDoubleClick}
      />

      {/* Footer */}
      <AnalysisFooter
        actions={config.footerActions}
        totalCount={analysis.totalCount}
        pageIndex={analysis.pageIndex}
        pageSize={analysis.pageSize}
        totalPages={analysis.totalPages}
        selectedCount={analysis.selectedRows.size}
        pageSizeOptions={config.pageSizeOptions}
        onAction={handleAction}
        onPageChange={analysis.handlePageChange}
        onPageSizeChange={analysis.handlePageSizeChange}
      />
    </div>
  );
}

// ── Loading Skeleton ─────────────────────────────────────────────────

function DataAnalysisSkeleton() {
  return (
    <div className="flex h-full flex-col gap-3 p-3">
      {/* Filter skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-16" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8" />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="flex-1 space-y-1">
        <Skeleton className="h-8 w-full" />
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-full" />
        ))}
      </div>

      {/* Footer skeleton */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
