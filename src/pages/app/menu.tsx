import { useHead } from '@unhead/react';
import { useSearchParams } from 'react-router';

import { MenuCards } from '@/components/menu/menu-cards';
import { DebouncedInput } from '@/components/ui/debounced-input';

export function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  useHead({
    title: 'Menu',
  });

  function handleSearchChanged(input: string) {
    setSearchParams((state) => {
      state.set('procurar', input);

      return state;
    });
  }

  const search = searchParams.get('procurar') || '';

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">Procurar</h1>

          <DebouncedInput
            defaultValue={search}
            onDebouncedChange={handleSearchChanged}
            placeholder="Busque por cadastros, relatórios, recursos..."
          />
        </div>

        <div className="h-full min-h-0 flex-1 rounded border">
          <MenuCards search={search} />
        </div>
      </div>
    </>
  );
}
