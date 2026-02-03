import { Checkbox as CheckBox } from './ui/checkbox';
import { Field } from './ui/field';
import { Label } from './ui/label';

interface CheckboxProps {
  label: string;
  value?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export function Checkbox({ label }: CheckboxProps) {
  return (
    <Field orientation="horizontal">
      <CheckBox id="terms-checkbox" name="terms-checkbox" />
      <Label
        className="form-field-label whitespace-nowrap"
        htmlFor="terms-checkbox"
      >
        {label}
      </Label>
    </Field>
  );
}
