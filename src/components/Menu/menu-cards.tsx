import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

import { ScrollArea } from '../ui/scroll-area';

import { MenuCard } from './menu-card';

import { getMenuItems, type GetMenuItemsResponse } from '@/api/GetMenuItems';

interface MenuCardsProps {
  search: string;
}

export function MenuCards({ search }: MenuCardsProps) {
  const { data: cards } = useQuery({
    queryKey: ['menu'],
    queryFn: () => getMenuItems(),
    staleTime: Infinity,
  });

  function filterSearchedMenuItems(menuItem: GetMenuItemsResponse): boolean {
    if (search === '*') return true;

    const searchUpperCase = search.toUpperCase();

    const title = menuItem.titulo?.toUpperCase() || '';
    const description = menuItem.descricao?.toUpperCase() || '';

    return (
      !!search &&
      (title.includes(searchUpperCase) || description.includes(searchUpperCase))
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-wrap gap-4 p-2">
        {cards?.filter(filterSearchedMenuItems).map((item, i) => (
          <NavLink key={i} to={`/entidade?tipo=${item.nomeTipo}`}>
            <MenuCard
              className="min-w-56 rounded-md"
              title={item.titulo}
              image={item.imagem}
              description={item.descricao}
            />
          </NavLink>
        ))}
      </div>
    </ScrollArea>
  );
}
