import { useSearchParams } from 'react-router';

import { DataAnalysis } from '@/components/data-analysis/data-analysis';
import type { AnalysisConfig } from '@/components/data-analysis/types';

// Static demo config to showcase the component while APIs are being developed.
// Once the real API is available, remove this and let the component fetch its config.
const DEMO_CONFIG: AnalysisConfig = {
  title: 'Clientes Novos',
  filtersExpanded: true,
  pageSizeOptions: [25, 50, 100, 200],
  filters: [
    {
      key: 'empresa',
      label: 'Empresa',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'analise',
      label: 'Analise',
      type: 'select',
      options: [
        { label: 'Clientes Novos', value: 'clientes-novos' },
        { label: 'Clientes Inativos', value: 'clientes-inativos' },
        { label: 'Clientes Bloqueados', value: 'clientes-bloqueados' },
      ],
      defaultValue: 'clientes-novos',
    },
    {
      key: 'periodo',
      label: 'Periodo',
      type: 'select',
      options: [
        { label: 'Nao considerar', value: 'nao-considerar' },
        { label: 'Ultimo mes', value: 'ultimo-mes' },
        { label: 'Ultimos 3 meses', value: 'ultimos-3-meses' },
        { label: 'Ultimo ano', value: 'ultimo-ano' },
      ],
      defaultValue: 'nao-considerar',
    },
    {
      key: 'data',
      label: 'Data',
      type: 'select',
      options: [
        { label: 'Data Criacao', value: 'data-criacao' },
        { label: 'Data Alteracao', value: 'data-alteracao' },
      ],
      defaultValue: 'data-criacao',
    },
    {
      key: 'apenasAtividade',
      label: '',
      type: 'checkbox',
      placeholder: 'Apenas com Atividade neste Periodo',
    },
    {
      key: 'origem',
      label: 'Origem',
      type: 'select',
      options: [
        { label: 'Titulo a Receber', value: 'titulo-receber' },
        { label: 'Titulo a Pagar', value: 'titulo-pagar' },
        { label: 'Pedidos', value: 'pedidos' },
      ],
    },
    {
      key: 'apenaSemRepresentante',
      label: '',
      type: 'checkbox',
      placeholder: 'Apenas clientes sem representante',
    },
    {
      key: 'cliente',
      label: 'Cliente',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'repres',
      label: 'Repres',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'estado',
      label: 'Estado',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'cidade',
      label: 'Cidade',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'ramoAtividade',
      label: 'Ramo Atividade',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'categoria',
      label: 'Categoria',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'grupo',
      label: 'Grupo',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
    {
      key: 'classificacaoComercial',
      label: 'Classificacao Comercial',
      type: 'search-select',
      placeholder: 'Clique aqui para selecionar...',
    },
  ],
  columns: [
    { key: 'codigo', label: 'Codigo', sortable: true, minWidth: 60, align: 'left' },
    { key: 'nome', label: 'Nome', sortable: true, minWidth: 200 },
    { key: 'email', label: 'Email', sortable: true, minWidth: 160 },
    { key: 'telefone', label: 'Telefone', sortable: true, minWidth: 120 },
    { key: 'tipoPessoa', label: 'Tipo Pessoa', sortable: true, minWidth: 90 },
    { key: 'cidade', label: 'Cidade', sortable: true, minWidth: 130 },
    { key: 'uf', label: 'UF', sortable: true, minWidth: 40, align: 'center' },
    { key: 'repres', label: 'Repres', sortable: true, minWidth: 60 },
    { key: 'nomeFantasia', label: 'Nome Fantasia', sortable: true, minWidth: 200 },
    { key: 'clienteCobranca', label: 'Cliente Cobranca', sortable: true, minWidth: 200 },
    { key: 'endereco', label: 'Endereco', sortable: true, minWidth: 200 },
    { key: 'bairro', label: 'Bairro', sortable: true, minWidth: 130 },
    { key: 'numero', label: 'Numero', sortable: true, minWidth: 70, align: 'right' },
    { key: 'complemento', label: 'Complemento', sortable: true, minWidth: 120 },
  ],
  footerActions: [
    { key: 'detalhes', label: 'Detalhes', icon: 'file-text', variant: 'ghost' },
    { key: 'bloquear', label: 'Bloquear', icon: 'lock', variant: 'ghost' },
    { key: 'suspender', label: 'Suspender', icon: 'pause', variant: 'ghost' },
    { key: 'inativar', label: 'Inativar', icon: 'x-circle', variant: 'ghost' },
    { key: 'ativar', label: 'Ativar', icon: 'check-circle', variant: 'ghost' },
    { key: 'categorizar', label: 'Categorizar', icon: 'tag', variant: 'ghost' },
    { key: 'verSituacao', label: 'Ver Situacao', icon: 'eye', variant: 'ghost' },
  ],
};

export function Analysis() {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get('tipo') ?? 'clientes';

  return (
    <DataAnalysis
      tipo={tipo}
      staticConfig={DEMO_CONFIG}
      onAction={(actionKey, selectedRows) => {
        // eslint-disable-next-line no-console
        console.warn(`[DataAnalysis] Action: ${actionKey}`, selectedRows);
      }}
    />
  );
}
