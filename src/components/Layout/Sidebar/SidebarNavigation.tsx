interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  active?: boolean;
}

interface SidebarNavigationProps {
  isOpen: boolean;
  menuItems: NavigationItem[];
  organizationItems: NavigationItem[];
}

export const SidebarNavigation = ({
  isOpen,
  menuItems,
  organizationItems,
}: SidebarNavigationProps) => {
  return (
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
                  ? "bg-primary-500 text-white"
                  : "text-gray-300 hover:bg-gray-800"
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
  );
};
