interface InputProps {
  label: string;
  value?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export function Input({
  label,
  value,
  type,
  placeholder,
  readOnly,
  className,
  onChange,
}: InputProps) {
  return (
    <div className={`form-field-container group ${className}`}>
      <label className="form-field-label">{label}:</label>
      <div className="flex flex-1 gap-2">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          className={`form-field-input ${readOnly ? 'form-field-readonly' : ''}`}
        />
      </div>
    </div>
  );
}
