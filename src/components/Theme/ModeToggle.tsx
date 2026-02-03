import { Moon, Sun } from 'lucide-react';

import { Toggle } from '../ui/toggle';

import { useTheme } from '@/components/Theme/ThemeProvider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      className="border"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Toggle>
  );
}
