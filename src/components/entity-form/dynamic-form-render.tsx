import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox } from '../checkbox';
import { EntityBrowser } from '../entity-browser';
import { Input } from '../input';
import { Button } from '../ui/button';

import type { PresentationObject } from '@/types/presentation/presentation-object';

import { equalsAny } from '@/utils/equals-any';

interface DynamicFormRendererProps {
  objects: PresentationObject[];
  tabIndex: number;
}

export function DynamicFormRenderer({
  objects,
  tabIndex,
}: DynamicFormRendererProps) {
  const { control } = useFormContext();

  const visibleObjects = objects.filter((obj) => {
    const attr = obj.gerenciadorAtributos.atributoPropriedade;
    return attr.tabPageIndex === tabIndex;
  });

  return (
    <div className="flex flex-col">
      <div className="grid auto-cols-fr gap-2">
        {visibleObjects.map((obj) => {
          const attr = obj.gerenciadorAtributos.atributoPropriedade;

          const {
            descricao,
            apresentacao,
            coluna,
            linha,
            colunaSpan,
            tamMaximo,
            visivel,
          } = attr;

          const gridColumnStart = coluna * 2;
          const gridRowStart = linha + 1;

          const maxWidth =
            colunaSpan > 0 || tamMaximo < 1 ? undefined : tamMaximo * 4;

          return (
            <div
              key={obj.name}
              className="flex flex-col gap-2 md:flex-row"
              style={{
                gridColumnStart,
                gridRowStart,
                gridColumnEnd: `span ${equalsAny(apresentacao, [0, 1]) ? colunaSpan : colunaSpan - 1 || 1}`,
                maxWidth,
              }}
            >
              <div className="w-full">
                {obj.text === 'Entidade' && apresentacao !== 3 && (
                  <Controller
                    name={obj.name}
                    control={control}
                    render={({ field: formField }) => (
                      <EntityBrowser
                        {...formField}
                        entity={obj.objectTypeName}
                        label={descricao}
                        className={`${visivel ? '' : 'hidden'}`}
                      />
                    )}
                  />
                )}

                {obj.text === 'String' && apresentacao !== 3 && (
                  <Controller
                    name={obj.name}
                    control={control}
                    render={({ field: formField }) => (
                      <Input
                        {...formField}
                        label={descricao}
                        type="text"
                        className={`${visivel ? '' : 'hidden'}`}
                      />
                    )}
                  />
                )}

                {obj.text === 'Bool' && apresentacao !== 3 && (
                  <Controller
                    name={obj.name}
                    control={control}
                    render={({ field: formField }) => (
                      <Checkbox
                        {...formField}
                        label={descricao}
                        className={`${visivel ? '' : 'hidden'}`}
                      />
                    )}
                  />
                )}

                {obj.text === 'Number' && apresentacao !== 3 && (
                  <Controller
                    name={obj.name}
                    control={control}
                    render={({ field: formField }) => (
                      <Input
                        {...formField}
                        label={descricao}
                        type="number"
                        className={`${visivel ? '' : 'hidden'}`}
                      />
                    )}
                  />
                )}

                {apresentacao === 3 && (
                  <Controller
                    name={obj.name}
                    control={control}
                    render={({ field: formField }) => (
                      <Button
                        {...formField}
                        variant="outline"
                        className={`${visivel ? '' : 'hidden'}`}
                      >
                        {descricao}
                      </Button>
                    )}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
