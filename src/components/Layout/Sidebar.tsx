import { FreeLogo } from '../icons/FreeLogo';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-[#1C1E21] text-white transition-all duration-300 flex flex-col`}
    >
      <div className="h-16 flex items-center px-4 border-b border-gray-700">
        <FreeLogo className="w-8 h-8 text-primary-500" />
        {isOpen && <span className="ml-3 font-semibold text-lg">Free</span>}
      </div>

      <nav className="flex-1 py-4">
        <div className="px-3">
          <span className="text-xs font-medium text-gray-400 px-3">MAIN</span>
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 mt-2 rounded-lg
                ${
                  item.active
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                } transition-colors`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </a>
          ))}
        </div>

        <div className="px-3 mt-8">
          <span className="text-xs font-medium text-gray-400 px-3">
            ORGANIZATIONS
          </span>
          {organizationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
};

const menuItems = [
  { name: 'Home', href: '/', icon: '🏠', active: true },
];

const organizationItems = [
  { name: 'Integrations', href: '/integrations', icon: '🔄' },
];
