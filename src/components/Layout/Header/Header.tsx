import { BurgerMenu } from './BurgerMenu';
import { NotificationButton } from './NotificationButton';
import { AvatarButton } from './AvatarButton';

interface HeaderProps {
  onMenuClick: () => void;
  userName: string;
}

export const Header = ({ onMenuClick, userName }: HeaderProps) => {
  return (
    <header className="h-16 bg-white dark:bg-[#242526] shadow-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <BurgerMenu onClick={onMenuClick} />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Good morning, {userName}!
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <NotificationButton />
        <AvatarButton userName={userName} />
      </div>
    </header>
  );
};
