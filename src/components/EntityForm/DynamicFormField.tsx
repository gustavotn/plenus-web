import { Search, Edit, X } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import type { PresentationObject } from '@/types/Presentation/PresentationObject';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface DynamicFormFieldProps {
  field: PresentationObject;
}

export function DynamicFormField({ field }: DynamicFormFieldProps) {
  const { control } = useFormContext();

  const { name, objectTypeName } = field;

  const { descricao } = field.gerenciadorAtributos.atributoPropriedade;

  if (!field.gerenciadorAtributos.atributoPropriedade.visivel) return null;

  if (field.gerenciadorAtributos.atributoPropriedade.multiLine) {
    return (
      <div className="flex gap-4">
        <label className="form-field-label pt-2">{descricao}:</label>
        <Controller
          name={name}
          control={control}
          render={({ field: formField }) => (
            <Textarea
              {...formField}
              className="min-h-[200px] flex-1 resize-none"
            />
          )}
        />
      </div>
    );
  }

  const inputType =
    objectTypeName === 'System.Data.DBDateTime'
      ? 'date'
      : objectTypeName === 'System.Int32' ||
          objectTypeName === 'System.Int64' ||
          objectTypeName === 'System.Double'
        ? 'text'
        : 'text';

  const isReadOnly = !objectTypeName.includes('Avant');

  return (
    <div className="form-field-container group">
      <label className="form-field-label">{descricao}:</label>
      <div className="flex flex-1 gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field: formField }) => (
            <Input
              {...formField}
              type={inputType}
              readOnly={isReadOnly}
              className={`form-field-input ${isReadOnly ? 'form-field-readonly' : ''}`}
            />
          )}
        />
      </div>
      <div className="form-field-actions opacity-0 transition-opacity group-hover:opacity-100">
        <button type="button" className="action-button" title="Pesquisar">
          <Search className="h-4 w-4" />
        </button>
        <button type="button" className="action-button" title="Editar">
          <Edit className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="action-button hover:text-destructive"
          title="Excluir"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
