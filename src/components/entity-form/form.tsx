import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Separator } from '../ui/separator';

import { DynamicFormRenderer } from './dynamic-form-render';
import { FormFooter } from './footer';
import { FormHeader } from './header';
import { SearchModal } from './search-modal';
import { FormTabs } from './tabs';

import type { Presentation } from '@/types/presentation/presentation';

import { deleteEntity } from '@/api/delete-entity';
import { getPresentation } from '@/api/get-presentation';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EntityForm {
  typeName: string;
}

export function EntityForm({ typeName }: EntityForm) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [schema, setSchema] = useState<Presentation | null>(null);

  const navigate = useNavigate();

  const methods = useForm<Record<string, string>>({
    defaultValues: {},
  });

  const { handleSubmit, reset } = methods;

  const { data: presentation, isLoading } = useQuery({
    queryKey: ['menu', typeName],
    queryFn: () => getPresentation({ tipo: typeName }),
    staleTime: Infinity,
  });

  // Load schema on mount
  useEffect(() => {
    if (presentation) setSchema(presentation);
    // const initialState = buildInitialState(loadedSchema);
    // reset(initialState);
  }, [presentation, reset]);

  const handleSearchSelect = (data: string) => {
    setSearchModalOpen(false);
    console.log(JSON.parse(data));
    reset(JSON.parse(data));
  };

  const onSubmit = async (data: Record<string, string>) => {
    console.log(data);
  };

  const { mutateAsync: deleteEntityFn } = useMutation({
    mutationFn: (chave: string) => deleteEntity({ typeName, chave }),
  });

  const onDelete = async (data: Record<string, string>) => {
    const chave = data['ChaveUnica'].replaceAll('-', ',');

    await deleteEntityFn(chave);
  };

  if (isLoading || !schema) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <Loader2 className="text-muted-foreground animate-spin" />
      </div>
    );
  }

  const tabGeneral =
    presentation?.gerenciadoAttributos.atributoClasse.nomeTabGeral ?? '';
  const tabs =
    presentation?.gerenciadoAttributos.atributoClasse.paginasTab ?? [];
  //const actions = presentation?.gerenciadoAttributos.atributosAcaoPersonalizada;

  return (
    <>
      <SearchModal
        typeName={typeName}
        open={searchModalOpen}
        onOpenChange={setSearchModalOpen}
        onSelect={handleSearchSelect}
      />
      <FormProvider {...methods}>
        <form className="bg-background flex h-screen flex-col overflow-hidden">
          <FormHeader
            title={schema.gerenciadoAttributos.atributoClasse.titulo}
            onSearch={() => setSearchModalOpen(true)}
            onSave={handleSubmit(onSubmit)}
            onDelete={handleSubmit(onDelete)}
            onClose={() => navigate(-1)}
          />
          <FormTabs
            tabs={[tabGeneral, ...tabs]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="flex-1 overflow-hidden p-4">
            <Card className="shadow-form hover:shadow-form-hover flex h-full flex-col overflow-hidden py-4 transition-shadow duration-300">
              <ScrollArea className="flex-1 overflow-hidden">
                <div className="animate-fade-in px-6">
                  {/* Header Info Grid - Custom layout for status section */}
                  <div className="space-y-4">
                    {/* Left Column - Dynamic Fields from "header-info" section */}
                    <div className="space-y-4">
                      {presentation && (
                        <DynamicFormRenderer
                          objects={presentation.objects}
                          tabIndex={-1}
                        />
                      )}
                    </div>

                    {presentation &&
                      presentation.objects.some(
                        (obj) =>
                          obj.gerenciadorAtributos.atributoPropriedade
                            .tabPageIndex === -1
                      ) && <Separator />}

                    {presentation && (
                      <DynamicFormRenderer
                        objects={presentation.objects}
                        tabIndex={activeTab}
                      />
                    )}
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </div>

          <FormFooter
            recordInfo="Registro novo"
            user="ADMINISTRADOR"
            actions={[]}
          />
        </form>
      </FormProvider>
    </>
  );
}
