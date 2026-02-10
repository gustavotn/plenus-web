import { useId } from 'react';

import { Checkbox as CheckBox } from './ui/checkbox';
import { Field } from './ui/field';
import { Label } from './ui/label';

interface FormCheckboxProps {
  label: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function FormCheckbox({ label, className }: FormCheckboxProps) {
  const id = useId();

  return (
    <Field orientation="horizontal" className={className}>
      <CheckBox id={id} />
      <Label className="form-field-label whitespace-nowrap" htmlFor={id}>
        {label}
      </Label>
    </Field>
  );
}
