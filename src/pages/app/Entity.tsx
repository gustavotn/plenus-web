import { useSearchParams } from 'react-router';

import { EntityForm } from '@/components/entity-form/form';

export function Entity() {
  const [searchParams] = useSearchParams();

  const entityType = searchParams.get('tipo') ?? '';

  return <EntityForm typeName={entityType} />;
}
