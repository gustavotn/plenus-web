import { NavLink } from 'react-router';

import { ModeToggle } from '../theme/mode-toggle';

import { AccountMenu } from './account-menu';

import { usePresentationMessage } from '@/contexts/presentation-message-context';
import { getSocketId } from '@/services/socket-session';

export function Header() {
  const { status } = usePresentationMessage();

  const socketId = getSocketId();

  return (
    <div className="flex items-center justify-center border-b px-4">
      <div className="flex flex-1 items-center justify-between py-3">
        <NavLink to="/">2025</NavLink>
        <h1>{status}</h1>
        <h1>{socketId}</h1>

        <div className="flex items-center justify-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
