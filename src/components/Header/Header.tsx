import { NavLink } from 'react-router';

import { ModeToggle } from '../Theme/ModeToggle';

import { AccountMenu } from './AccountMenu';

export function Header() {
  return (
    <div className="flex items-center justify-center border-b px-4">
      <div className="flex flex-1 items-center justify-between py-3">
        <NavLink to="/">2025</NavLink>
        <h1></h1>

        <div className="flex items-center justify-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
