import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RefreshCcw,
  Search,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { DialogContent, DialogTitle } from '../ui/dialog';
import { Dialog, DialogHeader } from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import type { DialogProps } from '@radix-ui/react-dialog';

import { getEntitySearch } from '@/api/get-entity-search';
import { searchEntity } from '@/api/search-entity';
import { selectEntitySearch } from '@/api/select-entity-search';
import { MultiSelectCombobox } from '@/components/multi-select-combobox';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchModalProps extends DialogProps {
  typeName: string;
  onSelect?: (data: string) => void;
}

const searchForm = z.object({
  searchFor: z.string().nullable(),
  searchCriteria: z.string(),
  searchColumns: z.array(z.string()),
});

type SearchForm = z.infer<typeof searchForm>;

export function SearchModal({
  typeName,
  open,
  onOpenChange,
  onSelect,
  ...props
}: SearchModalProps) {
  const [filters, setFilters] = useState<SearchForm | null>(null);
  const [currentSortedColumnId, setCurrentSortedColumnId] = useState('');
  const [currentSortingTypeIsAsc, setCurrentSortingTypeIsAsc] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentTotalPageCount, setCurrentTotalPageCount] = useState(0);

  const { data: searcher } = useQuery({
    queryKey: ['search', typeName],
    queryFn: () => getEntitySearch({ tipo: typeName }),
    staleTime: Infinity,
    enabled: open,
  });

  const { control, register, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchForm),
    defaultValues: {
      searchCriteria: '0',
      searchColumns: [],
    },
  });

  const pageSize = 12;

  const {
    data: result,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['search-entity-result', typeName, currentPageIndex],
    queryFn: async () =>
      await searchEntity({
        tipo: typeName,
        procurarPor: filters?.searchFor ?? '',
        criterioPesquisa: filters?.searchCriteria ?? '0',
        em: filters?.searchColumns || [],
        pageNumber: currentPageIndex,
        pageSize,
      }),
    staleTime: 0,
    enabled: false,
  });

  // const { data: selectData } = useQuery({
  //   queryKey: ['select-entity-result', typeName, currentPageIndex],
  //   queryFn: async () =>
  //     await selectEntitySearch({
  //       tipo: typeName,
  //       procurarPor: filters?.searchFor ?? '',
  //       criterioPesquisa: filters?.searchCriteria ?? '0',
  //       em: filters?.searchColumns || [],
  //       index: currentPageIndex,
  //     }),
  //   staleTime: 0,
  //   enabled: false,
  // });

  useEffect(() => {
    if (filters) {
      refetch();
    }
  }, [currentPageIndex, filters]);

  useEffect(() => {
    if (result) setCurrentTotalPageCount(result.totalCount);
  }, [result]);

  async function handleSearch(data: SearchForm) {
    setFilters(data);
  }

  function handleSortColumn(id: string) {
    if (id !== currentSortedColumnId) {
      setCurrentSortingTypeIsAsc(false);
    } else {
      setCurrentSortingTypeIsAsc(!currentSortingTypeIsAsc);
    }

    setCurrentSortedColumnId(id);
  }

  async function handleSelect(rowIndex: number) {
    const selectData = await selectEntitySearch({
      tipo: typeName,
      procurarPor: filters?.searchFor ?? '',
      criterioPesquisa: filters?.searchCriteria ?? '0',
      em: filters?.searchColumns || [],
      index: rowIndex,
    });

    if (onSelect) onSelect(JSON.parse(selectData));
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPageIndex(pageIndex);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="flex h-[90vh] min-h-0 flex-col rounded-2xl p-0 lg:max-w-[70vw]">
        {searcher ? (
          <>
            <DialogHeader className="border-border from-primary/10 border-b bg-gradient-to-r to-transparent px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Search className="text-primary h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-foreground text-lg font-semibold">
                    {searcher?.titulo}
                  </DialogTitle>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {`${searcher?.titulo} - Procure por ${searcher?.nomeEntidade}s através de qualquer palavra-chave que o mesmo possua.`}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="flex min-h-0 flex-1 flex-col gap-y-2 p-6 py-2">
              <form onSubmit={handleSubmit(handleSearch)} className="space-y-2">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" disabled={isFetching}>
                    {isFetching ? (
                      <>
                        <RefreshCcw className="mr-1 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <RefreshCcw className="mr-1 h-4 w-4" />
                        Processar
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    type="button"
                    onClick={() => onOpenChange && onOpenChange(!open)}
                  >
                    <X className="mr-1 h-4 w-4" /> Fecha
                  </Button>
                </div>

                {/* Filtros */}
                <div className="grid grid-cols-1 gap-1 lg:grid-cols-4">
                  <div className="col-span-full">
                    <label className="text-sm font-medium">Procurar por</label>
                    <Input
                      placeholder="Digite a palavra-chave"
                      {...register('searchFor')}
                    />
                  </div>
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Em</label>
                      {searcher && (
                        <Controller
                          control={control}
                          name="searchColumns"
                          render={({ field: { onChange, value } }) => {
                            return (
                              <MultiSelectCombobox
                                onChange={onChange}
                                value={value!}
                                items={
                                  searcher?.colunasFiltros.map((col) => {
                                    return {
                                      label: col.nome,
                                      value: col.chave,
                                    };
                                  }) as []
                                }
                              />
                            );
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Critério</label>
                      <Controller
                        control={control}
                        name="searchCriteria"
                        render={({ field: { onChange, value } }) => {
                          return (
                            <Select
                              onValueChange={onChange}
                              value={value}
                              defaultValue="0"
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">
                                  Em qualquer parte do texto
                                </SelectItem>
                                <SelectItem value="1">
                                  No início do texto
                                </SelectItem>
                                <SelectItem value="2">
                                  No final do texto
                                </SelectItem>
                                <SelectItem value="3">
                                  Apenas a palavra exata
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          );
                        }}
                      ></Controller>
                    </div>
                  </div>
                </div>
              </form>

              {/* Grid */}
              <ScrollArea className="flex-1 rounded-sm border">
                <div className="bg-muted text-muted-foreground px-4 py-2 text-sm">
                  Arraste uma coluna aqui para agrupar a visão
                </div>
                <Table className="">
                  <TableHeader className="bg-sky-600">
                    {result && (
                      <TableRow>
                        {result.colunas.map((column, index) => {
                          return (
                            <TableHead key={index}>
                              <div
                                className="flex cursor-pointer items-center justify-between gap-2 text-white"
                                onClick={() => handleSortColumn(column.chave)}
                              >
                                {column.nome}
                                {currentSortedColumnId &&
                                currentSortedColumnId === column.chave ? (
                                  currentSortingTypeIsAsc ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )
                                ) : (
                                  <></>
                                )}
                              </div>
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    )}
                  </TableHeader>
                  <TableBody>
                    {result && (
                      <>
                        {result?.data.map((row, rowIndex) => {
                          return (
                            <TableRow
                              onClick={() =>
                                handleSelect(
                                  rowIndex + currentPageIndex * pageSize
                                )
                              }
                              className="cursor-pointer"
                              key={rowIndex}
                            >
                              {row.map((cell, index) => (
                                <TableCell key={index}>{cell}</TableCell>
                              ))}
                            </TableRow>
                          );
                        })}
                      </>
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              {/* Footer */}
              <Pagination
                disable={isFetching}
                onPageChange={handlePaginate}
                pageIndex={currentPageIndex}
                totalCount={currentTotalPageCount}
                perPage={pageSize}
              />
            </div>
          </>
        ) : (
          <Loader2 className="text-muted-foreground m-auto h-8 w-8 animate-spin" />
        )}
        {/* Header */}
      </DialogContent>
    </Dialog>
  );
}
