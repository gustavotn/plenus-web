import { useFormContext } from 'react-hook-form';

import { Checkbox } from '../Checkbox';
import { EntityBrowser } from '../EntityBrowser';
import { Input } from '../Input';
import { Button } from '../ui/button';

import type { PresentationObject } from '@/types/Presentation/PresentationObject';

import { equalsAny } from '@/utils/EqualsAny';

interface DynamicFormRendererProps {
  objects: PresentationObject[];
  tabIndex: number;
}

export function DynamicFormRenderer({
  objects,
  tabIndex,
}: DynamicFormRendererProps) {
  //const { register } = useFormContext<Record<string, unknown>>();

  const visibleObjects = objects.filter((obj) => {
    const attr = obj.gerenciadorAtributos.atributoPropriedade;
    return attr.visivel && attr.tabPageIndex === tabIndex;
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
            multiLine,
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
                  <EntityBrowser
                    entity={obj.objectTypeName}
                    label={descricao}
                  />
                )}

                {obj.text === 'String' && apresentacao !== 3 && (
                  <Input label={descricao} type="text" />
                )}

                {obj.text === 'Bool' && apresentacao !== 3 && (
                  <Checkbox label={descricao} />
                )}

                {obj.text === 'Number' && apresentacao !== 3 && (
                  <Input label={descricao} type="number" />
                )}

                {apresentacao === 3 && (
                  <Button variant="outline">{descricao}</Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
