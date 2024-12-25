
interface HeaderProps {
  onMenuClick: () => void;
  userName: string;
}

export const Header = ({ onMenuClick, userName }: HeaderProps) => {
  return (
    <header className="h-16 bg-white dark:bg-[#242526] shadow-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Good morning, {userName}!
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
            {userName[0]}
          </div>
        </button>
      </div>
    </header>
  );
};
