import { Search, Edit, X } from 'lucide-react';
import { useState } from 'react';

import { SearchModal } from './entity-form/search-modal';

interface FormFieldProps {
  label: string;
  entity: string;
  value?: string;
  secondaryValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  showActions?: boolean;
  showSearch?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  type?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function EntityBrowser({
  label,
  entity,
  value = '',
  secondaryValue,
  placeholder,
  readOnly = false,
  showActions = true,
  showSearch = true,
  showEdit = true,
  showDelete = true,
  type = 'text',
  className = '',
  onChange,
}: FormFieldProps) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <SearchModal
        typeName={entity}
        open={searchModalOpen}
        onOpenChange={setSearchModalOpen}
        // onSelect={handleSearchSelect}
      />

      <div className={`form-field-container group ${className}`}>
        <label className="form-field-label">{label}:</label>
        <div className="flex flex-1 gap-2">
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={(e) => onChange?.(e.target.value)}
            className={`form-field-input ${readOnly ? 'form-field-readonly' : ''}`}
          />

          <input
            type="text"
            value={secondaryValue}
            readOnly
            className="form-field-input form-field-readonly flex-1"
          />
        </div>
        {showActions && (
          <div className="form-field-actions opacity-0 transition-opacity group-hover:opacity-100">
            {showSearch && (
              <button
                onClick={() => setSearchModalOpen(true)}
                className="action-button"
                title="Pesquisar"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
            {showEdit && (
              <button className="action-button" title="Editar">
                <Edit className="h-4 w-4" />
              </button>
            )}
            {showDelete && (
              <button
                className="action-button hover:text-destructive"
                title="Excluir"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
