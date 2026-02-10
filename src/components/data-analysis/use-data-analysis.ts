import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAnalysisConfig } from '@/api/get-analysis-config';
import { getAnalysisData } from '@/api/get-analysis-data';

import type { AnalysisConfig, SortState } from './types';

const DEFAULT_PAGE_SIZE = 50;

interface UseDataAnalysisOptions {
  /** When provided, skips the config API call */
  staticConfig?: AnalysisConfig;
}

export function useDataAnalysis(tipo: string, options?: UseDataAnalysisOptions) {
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<SortState>({ column: null, direction: null });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(true);

  const hasStaticConfig = !!options?.staticConfig;

  // Fetch the analysis configuration (filters, columns, actions)
  // Skipped when a staticConfig is provided
  const {
    data: fetchedConfig,
    isLoading: isConfigLoading,
  } = useQuery({
    queryKey: ['analysis-config', tipo],
    queryFn: () => getAnalysisConfig({ tipo }),
    staleTime: 1000 * 60 * 5, // 5 minutes – config rarely changes
    enabled: !hasStaticConfig,
  });

  const config = options?.staticConfig ?? fetchedConfig;

  // Fetch the data based on current filters, sort, and pagination
  const {
    data: result,
    isLoading: isDataLoading,
    isFetching: isDataFetching,
    refetch,
  } = useQuery({
    queryKey: ['analysis-data', tipo, filterValues, searchTerm, sort, pageIndex, pageSize],
    queryFn: () =>
      getAnalysisData(tipo, {
        filters: filterValues,
        sort,
        pageIndex,
        pageSize,
        searchTerm: searchTerm || undefined,
      }),
    enabled: !!config,
  });

  const totalCount = result?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleSort = useCallback(
    (columnKey: string) => {
      setSort((prev) => {
        if (prev.column !== columnKey) {
          return { column: columnKey, direction: 'asc' };
        }
        if (prev.direction === 'asc') {
          return { column: columnKey, direction: 'desc' };
        }
        return { column: null, direction: null };
      });
      setPageIndex(0);
    },
    []
  );

  const handleFilterChange = useCallback(
    (key: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, [key]: value }));
      setPageIndex(0);
      setSelectedRows(new Set());
    },
    []
  );

  const handleClearFilter = useCallback(
    (key: string) => {
      setFilterValues((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setPageIndex(0);
    },
    []
  );

  const handleClearAllFilters = useCallback(() => {
    setFilterValues({});
    setSearchTerm('');
    setPageIndex(0);
    setSelectedRows(new Set());
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPageIndex(newPage);
    setSelectedRows(new Set());
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0);
    setSelectedRows(new Set());
  }, []);

  const handleRowSelect = useCallback((rowIndex: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowIndex)) {
        next.delete(rowIndex);
      } else {
        next.add(rowIndex);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!result?.rows) return;
    setSelectedRows((prev) => {
      if (prev.size === result.rows.length) {
        return new Set();
      }
      return new Set(result.rows.map((_, i) => i));
    });
  }, [result?.rows]);

  const selectedRowsData = useMemo(() => {
    if (!result?.rows) return [];
    return Array.from(selectedRows).map((i) => result.rows[i]).filter(Boolean);
  }, [selectedRows, result?.rows]);

  return {
    // Config
    config,
    isConfigLoading,

    // Data
    rows: result?.rows ?? [],
    columns: result?.columns ?? [],
    isDataLoading,
    isDataFetching,
    refetch,

    // Filters
    filterValues,
    filtersOpen,
    setFiltersOpen,
    searchTerm,
    setSearchTerm,
    handleFilterChange,
    handleClearFilter,
    handleClearAllFilters,

    // Sorting
    sort,
    handleSort,

    // Pagination
    pageIndex,
    pageSize,
    totalCount,
    totalPages,
    handlePageChange,
    handlePageSizeChange,

    // Selection
    selectedRows,
    handleRowSelect,
    handleSelectAll,
    selectedRowsData,
  };
}
