// ── Filter Configuration ──────────────────────────────────────────────

export type FilterType =
  | 'text'
  | 'select'
  | 'multi-select'
  | 'date'
  | 'checkbox'
  | 'search-select';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  /** Unique key used for form state and API params */
  key: string;
  /** Display label shown next to the filter */
  label: string;
  /** Type of filter control to render */
  type: FilterType;
  /** Placeholder text for input / select filters */
  placeholder?: string;
  /** Static options for select / multi-select filters */
  options?: FilterOption[];
  /** API endpoint to fetch options dynamically (overrides `options`) */
  optionsEndpoint?: string;
  /** Default value for the filter */
  defaultValue?: string | string[] | boolean;
  /** Grid column span (1-4), defaults to 1 */
  colSpan?: number;
}

// ── Column Configuration ─────────────────────────────────────────────

export interface ColumnConfig {
  /** Unique key matching the data field */
  key: string;
  /** Display header label */
  label: string;
  /** Whether the column can be sorted */
  sortable?: boolean;
  /** Minimum width in pixels */
  minWidth?: number;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether the column is visible by default */
  visible?: boolean;
}

// ── Footer Action Configuration ──────────────────────────────────────

export interface FooterAction {
  /** Unique key for the action */
  key: string;
  /** Display label */
  label: string;
  /** Icon name from lucide-react */
  icon?: string;
  /** Action variant for styling */
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  /** Whether to show a confirmation dialog before executing */
  requiresConfirmation?: boolean;
}

// ── Sort State ───────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

// ── API Response Types ───────────────────────────────────────────────

export interface AnalysisConfig {
  /** Title of the analysis view */
  title?: string;
  /** Filter definitions (empty array = no filters) */
  filters: FilterConfig[];
  /** Column definitions */
  columns: ColumnConfig[];
  /** Footer action definitions (empty array = no footer actions) */
  footerActions: FooterAction[];
  /** Whether filters are expanded by default */
  filtersExpanded?: boolean;
  /** Page size options */
  pageSizeOptions?: number[];
}

export interface AnalysisDataRequest {
  /** Active filter values */
  filters: Record<string, unknown>;
  /** Current sort state */
  sort?: SortState;
  /** Current page index (0-based) */
  pageIndex: number;
  /** Number of records per page */
  pageSize: number;
  /** Search term for quick-search (Procurar Por) */
  searchTerm?: string;
}

export interface AnalysisDataResponse {
  /** Column keys matching the ColumnConfig keys */
  columns: string[];
  /** Row data as arrays of strings, matching column order */
  rows: string[][];
  /** Total number of records (for pagination) */
  totalCount: number;
}
