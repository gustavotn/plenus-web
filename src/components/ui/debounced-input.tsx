import { useEffect, useState } from "react";

import { Input } from "./input";

type DebouncedInputProps = {
  onDebouncedChange?: (value: string) => void;
} & React.ComponentProps<"input">

export function DebouncedInput({ onDebouncedChange, defaultValue, ...props }: DebouncedInputProps) {
  const [value, setValue] = useState(defaultValue?.toString() ?? '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onDebouncedChange) {
        onDebouncedChange(value);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      {...props}
    />
  );
}