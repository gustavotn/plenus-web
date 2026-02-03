import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Separator } from './ui/separator';

import type { PopoverProps } from '@radix-ui/react-popover';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface MultiSelectComboboxItem {
  value: string;
  label: string;
}

interface MultiSelectComboboxProps extends PopoverProps {
  items?: MultiSelectComboboxItem[];
  value?: string[];
  onChange?: (item: string[]) => void;
}

export function MultiSelectCombobox({
  value,
  onChange,
  items,
  ...props
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (onChange && items) onChange(items.map((item) => item.value));
  }, []);

  function toggleValue(item: string) {
    if (!value) return;

    const newValues = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];

    if (onChange) onChange(newValues);
  }

  function handleSelectUnselectAll() {
    if (!value || !items) return;

    const newValues =
      value.length === items.length ? [] : items.map((item) => item.value);

    if (onChange) onChange(newValues);
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[280px] justify-between"
        >
          {value && items && value.length !== items.length
            ? `${value.length} selecionado(s)`
            : 'Todos'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandEmpty>Nenhum item encontrado.</CommandEmpty>

          <CommandItem onSelect={handleSelectUnselectAll}>
            {value && items && value.length === items.length ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Desmarcar todos
              </>
            ) : (
              <span className="ml-8">Marcar todos</span>
            )}
          </CommandItem>

          <Separator />

          <CommandGroup className="max-h-60 overflow-y-auto">
            {items?.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => toggleValue(item.value)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value?.includes(item.value) ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
