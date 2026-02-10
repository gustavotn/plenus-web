import { NavLink } from 'react-router';

import { ModeToggle } from '../theme/mode-toggle';

import { AccountMenu } from './account-menu';

export function Header() {
  return (
    <header className="flex items-center justify-center border-b px-4">
      <nav className="flex flex-1 items-center justify-between py-3" aria-label="Navegacao principal">
        <NavLink to="/" aria-label="Ir para pagina inicial">
          Plenus Cloud
        </NavLink>
        <div className="flex items-center justify-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </nav>
    </header>
  );
}
