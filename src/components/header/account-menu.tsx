import { ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function AccountMenu() {
  const navigate = useNavigate();

  function handleLogOut() {
    navigate('/entrar', { replace: true });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          <span>ADMINISTRADOR</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
          <button onClick={handleLogOut} className="w-full cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
